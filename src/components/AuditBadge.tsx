import { motion } from 'framer-motion';
import { Shield, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface AuditBadgeProps {
  variant?: 'inline' | 'card';
  className?: string;
}

const AuditBadge = ({ variant = 'inline', className = '' }: AuditBadgeProps) => {
  const { t } = useTranslation();

  // Placeholder data - will be updated with real audit info
  const auditData = {
    auditor: 'Pending', // Will be: CertiK, Solidproof, HashEx
    status: 'scheduled', // scheduled, in-progress, completed
    score: null, // Will be: 96/100
    reportUrl: null, // Will be: IPFS link
    date: null, // Will be: 2025-01-15
  };

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 ${className}`}
      >
        <Shield className="w-4 h-4 text-green-500" />
        <span className="text-xs font-semibold text-green-500">
          {auditData.status === 'completed' 
            ? t('audit.verified') 
            : t('audit.scheduled')}
        </span>
      </motion.div>
    );
  }

  return (
    <Card className={`glass-effect p-6 border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 ${className}`}>
      <div className="flex items-start gap-4">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="p-3 rounded-full bg-green-500/10"
        >
          <Shield className="w-8 h-8 text-green-500" />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            {t('audit.title')}
            {auditData.status === 'completed' && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </h3>

          {auditData.status === 'completed' ? (
            <>
              <p className="text-sm text-muted-foreground mb-3">
                {t('audit.completedBy')}: <span className="font-semibold text-foreground">{auditData.auditor}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {t('audit.score')}: <span className="font-semibold text-green-500">{auditData.score}</span>
              </p>
              {auditData.reportUrl && (
                <a
                  href={auditData.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {t('audit.viewReport')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {t('audit.scheduledDesc')}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span>{t('audit.inProgress')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AuditBadge;
