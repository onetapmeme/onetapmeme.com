import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

// Fixed recipient: lab/admin inbox. Recipient override is ignored.
const ADMIN_INBOX = 'contact@cardsurgery.com'

interface Props {
  ref?: string
  customerName?: string
  customerEmail?: string
  packLabel?: string
  cardName?: string
  tcg?: string
  declaredValue?: string
  cares?: string[]
  defects?: string
  photosCount?: number
}

const AdminNewDossier = ({
  ref = 'CS-XXXX', customerName = '', customerEmail = '', packLabel = '',
  cardName = '', tcg = '', declaredValue = '', cares = [], defects = '', photosCount = 0,
}: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Nouveau dossier {ref} — {packLabel}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Nouveau dossier reçu</Heading>
          <Text style={tagline}>Notification atelier CardSurgery</Text>
        </Section>
        <Section style={body}>
          <Section style={refBox}>
            <Text style={refLabel}>Référence</Text>
            <Text style={refValue}>{ref}</Text>
          </Section>
          <table style={table}>
            <tbody>
              <Row k="Client" v={`${customerName} <${customerEmail}>`} />
              <Row k="Forfait" v={packLabel} />
              <Row k="Carte" v={cardName || '—'} />
              <Row k="TCG" v={tcg || '—'} />
              <Row k="Valeur déclarée" v={declaredValue || '—'} />
              <Row k="Soins demandés" v={cares.length ? cares.join(', ') : '—'} />
              <Row k="Photos jointes" v={String(photosCount)} />
            </tbody>
          </table>
          {defects ? (
            <Section style={notesBox}>
              <Text style={notesLabel}>Défauts décrits par le client</Text>
              <Text style={notesText}>{defects}</Text>
            </Section>
          ) : null}
          <Button href={`https://cardsurgery.com/admin/dossiers`} style={btn}>Ouvrir dans l'admin</Button>
          <Hr style={hr} />
          <Text style={footer}>Action requise : analyser sous 24 h ouvrées et valider/refuser.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const Row = ({ k, v }: { k: string; v: string }) => (
  <tr>
    <td style={tdK}>{k}</td>
    <td style={tdV}>{v}</td>
  </tr>
)

export const template = {
  component: AdminNewDossier,
  subject: (d: Record<string, any>) => `[Nouveau dossier] ${d.ref ?? ''} — ${d.packLabel ?? ''}`,
  displayName: 'Admin — nouveau dossier',
  to: ADMIN_INBOX,
  previewData: {
    ref: 'CS-2026-679B', customerName: 'Jane Doe', customerEmail: 'jane@example.com',
    packLabel: 'Surface Clean & Polish', cardName: 'Noctali 100', tcg: 'pokemon',
    declaredValue: '200 €', cares: ['clean'], defects: 'Légères rayures recto.', photosCount: 3,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { background: 'linear-gradient(135deg, #5a3a25, #c98a5c)', padding: '22px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#fff', fontSize: '22px', margin: 0 }
const tagline = { color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }
const body = { padding: '24px', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px', backgroundColor: '#ffffff' }
const refBox = { backgroundColor: '#f5efe7', padding: '12px', borderRadius: '8px', textAlign: 'center' as const, margin: '0 0 18px' }
const refLabel = { fontSize: '11px', color: '#7b6957', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: 0 }
const refValue = { fontSize: '20px', fontFamily: 'monospace', fontWeight: 'bold', color: '#5a3a25', margin: '4px 0 0' }
const table = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px' }
const tdK = { padding: '8px 10px', borderBottom: '1px solid #f0e8dc', color: '#7b6957', width: '40%', verticalAlign: 'top' as const }
const tdV = { padding: '8px 10px', borderBottom: '1px solid #f0e8dc', color: '#2a1d14', fontWeight: 500 }
const notesBox = { marginTop: '16px', backgroundColor: '#fdf6ed', padding: '12px', borderRadius: '8px', border: '1px solid #f0e1c8' }
const notesLabel = { fontSize: '11px', color: '#7b6957', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '0 0 4px' }
const notesText = { fontSize: '14px', lineHeight: '1.5', margin: 0 }
const btn = { backgroundColor: '#c98a5c', color: '#fff', padding: '12px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginTop: '18px' }
const hr = { borderColor: '#e7d9c8', margin: '20px 0 10px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: 0 }
