import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; ref?: string; packLabel?: string; packPrice?: string }

const DossierApproved = ({ name = '', ref = 'CS-XXXX', packLabel = '', packPrice = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Diagnostic validé pour {ref} — paiement disponible</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
        <Section style={body}>
          <Heading style={h2}>Diagnostic validé — paiement disponible</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Votre diagnostic est validé. Le forfait <strong>{packLabel}</strong>
            {packPrice ? ` (${packPrice})` : ''} est confirmé. Vous pouvez maintenant procéder
            au paiement, qui débloquera les instructions d'expédition sécurisées.
          </Text>
          <Section style={refBox}>
            <Text style={refLabel}>Dossier</Text>
            <Text style={refValue}>{ref}</Text>
          </Section>
          <Button href={`https://cardsurgery.com/payment?ref=${ref}`} style={btn}>Procéder au paiement</Button>
          <Hr style={hr} />
          <Text style={footer}>Le paiement est sécurisé via Stripe. Aucun envoi avant règlement.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierApproved,
  subject: (d: Record<string, any>) => `Dossier ${d.ref ?? ''} validé — Paiement disponible`,
  displayName: 'Dossier approved',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', packLabel: 'Surface Clean & Polish', packPrice: '19 €' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto' }
const header = { background: 'linear-gradient(135deg, #5a3a25, #c98a5c)', padding: '22px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#fff', fontSize: '22px', margin: 0 }
const body = { padding: '28px 24px', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px', backgroundColor: '#ffffff' }
const h2 = { color: '#5a3a25', fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const refBox = { backgroundColor: '#f5efe7', padding: '12px', borderRadius: '8px', textAlign: 'center' as const, margin: '16px 0' }
const refLabel = { fontSize: '11px', color: '#7b6957', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: 0 }
const refValue = { fontSize: '20px', fontFamily: 'monospace', fontWeight: 'bold', color: '#5a3a25', margin: '4px 0 0' }
const btn = { backgroundColor: '#c98a5c', color: '#fff', padding: '12px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }
const hr = { borderColor: '#e7d9c8', margin: '20px 0 10px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: 0 }
