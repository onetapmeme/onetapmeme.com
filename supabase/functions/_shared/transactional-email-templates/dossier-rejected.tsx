import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; ref?: string; adminNotes?: string }

const DossierRejected = ({ name = '', ref = 'CS-XXXX', adminNotes = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Diagnostic du dossier {ref}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
        <Section style={body}>
          <Heading style={h2}>Diagnostic — intervention non recommandée</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Après analyse de vos photos, notre équipe a estimé qu'une intervention n'apporterait
            pas de bénéfice mesurable sur cette carte. <strong>Aucun frais ne vous sera facturé.</strong>
          </Text>
          {adminNotes ? <Text style={notes}><strong>Note de l'expert :</strong> {adminNotes}</Text> : null}
          <Hr style={hr} />
          <Text style={footer}>Dossier {ref} — n'hésitez pas à nous contacter pour toute question.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierRejected,
  subject: (d: Record<string, any>) => `Dossier ${d.ref ?? ''} — diagnostic`,
  displayName: 'Dossier rejected',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', adminNotes: 'Carte hors périmètre d\'intervention.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto' }
const header = { background: 'linear-gradient(135deg, #5a3a25, #c98a5c)', padding: '22px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#fff', fontSize: '22px', margin: 0 }
const body = { padding: '28px 24px', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px', backgroundColor: '#ffffff' }
const h2 = { color: '#a3402e', fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const notes = { fontSize: '14px', backgroundColor: '#f5efe7', padding: '12px', borderRadius: '8px', lineHeight: '1.5' }
const hr = { borderColor: '#e7d9c8', margin: '20px 0 10px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: 0 }
