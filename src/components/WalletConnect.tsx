import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { supabase } from "@/integrations/supabase/client";

// EIP-1193 Ethereum Provider type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}

interface ContractConfig {
  address: string;
  symbol: string;
  decimals: number;
  chainId: string;
  chainName: string;
  blockExplorer: string;
  rpcUrl: string;
  logoUrl: string;
}

const WalletConnect = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState<string | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [contractConfig, setContractConfig] = useState<ContractConfig | null>(null);

  const BASE_CHAIN_ID = '0x2105'; // Base Mainnet (8453 in decimal)

  useEffect(() => {
    const initializeConfig = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-contract-config');
        if (error) throw error;
        setContractConfig(data);
      } catch (error) {
        console.error('Failed to fetch contract config:', error);
        toast.error('Failed to load contract configuration');
      }
    };

    initializeConfig();
    checkConnection();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      toast.info(t('wallet.disconnected'));
    } else {
      setAccount(accounts[0]);
      checkNetwork();
    }
  };

  const handleChainChanged = () => {
    checkNetwork();
    window.location.reload();
  };

  const checkConnection = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await checkNetwork();
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const checkNetwork = async () => {
    if (!window.ethereum) return;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setIsCorrectNetwork(chainId === BASE_CHAIN_ID);
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error(t('wallet.noMetaMask'));
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      await checkNetwork();
      
      if (!isCorrectNetwork) {
        await switchToBase();
      } else {
        toast.success(t('wallet.connected'));
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error(t('wallet.connectionFailed'));
    } finally {
      setIsConnecting(false);
    }
  };

  const switchToBase = async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_CHAIN_ID }],
      });
      setIsCorrectNetwork(true);
      toast.success(t('wallet.switchedToBase'));
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BASE_CHAIN_ID,
                chainName: 'Base',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org'],
              },
            ],
          });
          setIsCorrectNetwork(true);
          toast.success(t('wallet.baseAdded'));
        } catch (addError) {
          console.error('Error adding Base network:', addError);
          toast.error(t('wallet.addBaseFailed'));
        }
      } else {
        console.error('Error switching to Base:', error);
        toast.error(t('wallet.switchFailed'));
      }
    }
  };

  const addTokenToWallet = async () => {
    if (!window.ethereum || !account || !contractConfig) {
      toast.error(t('wallet.connectFirst'));
      return;
    }

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: [
          {
            type: 'ERC20',
            options: {
              address: contractConfig.address,
              symbol: contractConfig.symbol,
              decimals: contractConfig.decimals,
              image: contractConfig.logoUrl,
            },
          }
        ],
      });

      if (wasAdded) {
        toast.success(t('wallet.tokenAdded'));
      }
    } catch (error) {
      console.error('Error adding token:', error);
      toast.error(t('wallet.addTokenFailed'));
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    toast.info(t('wallet.disconnected'));
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!account) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        size="lg"
        className="flex items-center gap-2"
        style={{
          background: 'linear-gradient(135deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
          boxShadow: '0 0 20px hsla(210, 100%, 55%, 0.3)',
        }}
      >
        <Wallet className="w-5 h-5" />
        {isConnecting ? t('wallet.connecting') : t('wallet.connect')}
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      {!isCorrectNetwork && (
        <Button
          onClick={switchToBase}
          variant="destructive"
          size="lg"
          className="flex items-center gap-2"
        >
          {t('wallet.switchToBase')}
        </Button>
      )}
      
      <Button
        onClick={addTokenToWallet}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        {t('wallet.addToken')}
      </Button>

      <div className="flex items-center gap-3 px-4 py-2 bg-card border-2 border-primary/30 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-mono">{formatAddress(account)}</span>
        <Button
          onClick={disconnectWallet}
          variant="ghost"
          size="sm"
        >
          ✕
        </Button>
      </div>

      <Button
        asChild
        variant="outline"
        size="icon"
      >
        <a 
          href={`https://basescan.org/address/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on BaseScan"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};

export default WalletConnect;
