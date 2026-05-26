import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; ref?: string; carrier?: string; tracking?: string }

const DossierShipped = ({ name = '', ref = 'CS-XXXX', carrier = '', tracking = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Votre carte restaurée est en route ✈️</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
        <Section style={body}>
          <Heading style={h2}>Votre carte est en route ✈️</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Votre carte restaurée (dossier <strong>{ref}</strong>) a été expédiée en colis blindé
            et assuré.
          </Text>
          {(carrier || tracking) && (
            <Section style={box}>
              {carrier ? <Text style={li}>Transporteur : <strong>{carrier}</strong></Text> : null}
              {tracking ? <Text style={li}>N° de suivi : <strong style={{ fontFamily: 'monospace' }}>{tracking}</strong></Text> : null}
            </Section>
          )}
          <Hr style={hr} />
          <Text style={footer}>Merci de votre confiance.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierShipped,
  subject: (d: Record<string, any>) => `Dossier ${d.ref ?? ''} — votre carte est en route`,
  displayName: 'Dossier shipped',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', carrier: 'Chronopost', tracking: 'XX123456789FR' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto' }
const header = { background: 'linear-gradient(135deg, #5a3a25, #c98a5c)', padding: '22px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#fff', fontSize: '22px', margin: 0 }
const body = { padding: '28px 24px', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px', backgroundColor: '#ffffff' }
const h2 = { color: '#5a3a25', fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const box = { backgroundColor: '#f5efe7', padding: '12px 16px', borderRadius: '8px', margin: '12px 0' }
const li = { fontSize: '14px', lineHeight: '1.6', margin: '4px 0' }
const hr = { borderColor: '#e7d9c8', margin: '20px 0 10px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: 0 }
