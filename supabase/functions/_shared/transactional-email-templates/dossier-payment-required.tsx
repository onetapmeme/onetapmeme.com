import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const BRAND = '#c98a5c'
const DARK = '#5a3a25'

interface Props { name?: string; ref?: string; packLabel?: string; packPrice?: string; cardName?: string }

const DossierPaymentRequired = ({ name = '', ref = 'CS-XXXX', packLabel = '', packPrice = '', cardName = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Diagnostic validé — paiement requis pour {ref}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
        <Section style={body}>
          <Heading style={h2}>Votre diagnostic est disponible</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Votre diagnostic est disponible. Connectez-vous à votre espace pour valider l'opération
            et procéder au paiement sécurisé du forfait <strong>{packLabel}</strong>{packPrice ? ` (${packPrice})` : ''}
            {cardName ? <> pour la carte <strong>{cardName}</strong></> : null}.
          </Text>
          <Button href={`https://cardsurgery.com/payment?ref=${ref}`} style={btn}>Procéder au paiement</Button>
          <Hr style={hr} />
          <Text style={footer}>Référence : {ref}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierPaymentRequired,
  subject: (d: Record<string, any>) => `Diagnostic validé — paiement requis (${d.ref ?? ''})`,
  displayName: 'Dossier payment required',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', packLabel: 'Full Surgery', packPrice: '95 €', cardName: 'Noctali 100' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0' }
const header = { background: `linear-gradient(135deg, ${DARK}, ${BRAND})`, padding: '24px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#ffffff', fontSize: '24px', margin: '0' }
const body = { padding: '28px 24px', backgroundColor: '#ffffff', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px' }
const h2 = { color: DARK, fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const btn = { backgroundColor: BRAND, color: '#ffffff', padding: '12px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', margin: '10px 0' }
const hr = { borderColor: '#e7d9c8', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: '0' }
