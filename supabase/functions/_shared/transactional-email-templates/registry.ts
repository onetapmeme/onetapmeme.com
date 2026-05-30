/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as dossierRequested } from './dossier-requested.tsx'
import { template as dossierReceived } from './dossier-received.tsx'
import { template as dossierApproved } from './dossier-approved.tsx'
import { template as dossierPaymentRequired } from './dossier-payment-required.tsx'
import { template as dossierRejected } from './dossier-rejected.tsx'
import { template as dossierPaid } from './dossier-paid.tsx'
import { template as dossierInSurgery } from './dossier-in-surgery.tsx'
import { template as dossierQualityControl } from './dossier-quality-control.tsx'
import { template as dossierShipped } from './dossier-shipped.tsx'
import { template as adminNewDossier } from './admin-new-dossier.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'dossier-requested': dossierRequested,
  'dossier-received': dossierReceived,
  'dossier-approved': dossierApproved,
  'dossier-payment-required': dossierPaymentRequired,
  'dossier-rejected': dossierRejected,
  'dossier-paid': dossierPaid,
  'dossier-in-surgery': dossierInSurgery,
  'dossier-quality-control': dossierQualityControl,
  'dossier-shipped': dossierShipped,
  'admin-new-dossier': adminNewDossier,
}
