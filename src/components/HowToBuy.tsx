import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Download,
  ArrowRightLeft,
  ShoppingCart,
  CheckCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    id: 1,
    title: "Get a Wallet",
    description: "Download MetaMask or Coinbase Wallet to store your crypto",
    icon: Wallet,
    color: "from-orange-500 to-amber-500",
    details: [
      "Go to metamask.io or coinbase.com/wallet",
      "Download the browser extension or mobile app",
      "Create a new wallet and save your seed phrase securely",
      "Never share your seed phrase with anyone!",
    ],
    links: [
      { name: "MetaMask", url: "https://metamask.io/download/" },
      { name: "Coinbase Wallet", url: "https://www.coinbase.com/wallet" },
    ],
  },
  {
    id: 2,
    title: "Add Base Network",
    description: "Configure your wallet to use the Base blockchain",
    icon: Download,
    color: "from-blue-500 to-cyan-500",
    details: [
      "Open your wallet settings",
      "Go to Networks → Add Network",
      "Search for 'Base' or add manually:",
      "Network: Base | RPC: https://mainnet.base.org | Chain ID: 8453",
    ],
    links: [
      { name: "Base Bridge", url: "https://bridge.base.org" },
    ],
  },
  {
    id: 3,
    title: "Bridge ETH to Base",
    description: "Transfer ETH from Ethereum mainnet to Base",
    icon: ArrowRightLeft,
    color: "from-purple-500 to-pink-500",
    details: [
      "Go to bridge.base.org",
      "Connect your wallet",
      "Enter the amount of ETH to bridge",
      "Confirm the transaction (takes ~10 minutes)",
    ],
    links: [
      { name: "Official Base Bridge", url: "https://bridge.base.org" },
      { name: "Superbridge", url: "https://superbridge.app/base" },
    ],
  },
  {
    id: 4,
    title: "Buy $1TAP",
    description: "Swap your ETH for $1TAP on Uniswap",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    details: [
      "Go to Uniswap and connect your wallet",
      "Select Base network",
      "Paste the $1TAP contract address",
      "Set slippage to 3-5% and swap!",
    ],
    contractAddress: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
    links: [
      {
        name: "Buy on Uniswap",
        url: "https://app.uniswap.org/#/swap?outputCurrency=0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8&chain=base",
      },
    ],
  },
];

const HowToBuy = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { toast } = useToast();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    toast({
      title: "Copied!",
      description: "Contract address copied to clipboard",
    });
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const currentStep = steps.find((s) => s.id === activeStep)!;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            BEGINNER FRIENDLY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How to Buy $1TAP
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to get your $1TAP tokens in just 5 minutes
          </p>
        </motion.div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all ${
                    activeStep === step.id
                      ? `bg-gradient-to-r ${step.color} shadow-lg`
                      : activeStep > step.id
                      ? "bg-green-500"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {activeStep > step.id ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <step.icon className="w-6 h-6 text-white" />
                  )}
                  <span className="absolute -bottom-6 text-xs font-medium whitespace-nowrap">
                    Step {step.id}
                  </span>
                </motion.button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-1 mx-1 rounded ${
                      activeStep > step.id ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className={`glass-effect rounded-2xl p-8 border-2 border-primary/30 relative overflow-hidden`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentStep.color} opacity-5`}
              />

              <div className="relative z-10">
                {/* Step header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-r ${currentStep.color}`}
                  >
                    <currentStep.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {currentStep.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentStep.description}
                    </p>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-3 mb-6">
                  {currentStep.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-foreground/80">{detail}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Contract address (for step 4) */}
                {currentStep.contractAddress && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-background/50 border border-primary/30"
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      Contract Address (verify before swapping!)
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs md:text-sm font-mono text-primary break-all">
                        {currentStep.contractAddress}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyAddress(currentStep.contractAddress!)}
                        className="shrink-0"
                      >
                        {copiedAddress ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {currentStep.links.map((link) => (
                    <Button
                      key={link.name}
                      asChild
                      className={`bg-gradient-to-r ${currentStep.color} hover:opacity-90`}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  ))}

                  {activeStep < 4 && (
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(activeStep + 1)}
                    >
                      Next Step →
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Need help? Join our community!
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://discord.gg/1tap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord Support
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://t.me/1tap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram Group
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToBuy;
