import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const BRAND = '#c98a5c'
const DARK = '#5a3a25'

interface Props { name?: string; ref?: string; cardName?: string }

const DossierInSurgery = ({ name = '', ref = 'CS-XXXX', cardName = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Chirurgie en cours sur votre dossier {ref}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
        <Section style={body}>
          <Heading style={h2}>Chirurgie en cours</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Vos cartes{cardName ? <> (<strong>{cardName}</strong>)</> : null} sont actuellement entre les
            mains de nos experts sous hotte à flux laminaire. Vous serez notifié dès la fin de l'opération.
          </Text>
          <Text style={footer}>Référence : {ref}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierInSurgery,
  subject: (d: Record<string, any>) => `Chirurgie en cours (${d.ref ?? ''}) — CardSurgery`,
  displayName: 'Dossier in surgery',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', cardName: 'Noctali 100' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0' }
const header = { background: `linear-gradient(135deg, ${DARK}, ${BRAND})`, padding: '24px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#ffffff', fontSize: '24px', margin: '0' }
const body = { padding: '28px 24px', backgroundColor: '#ffffff', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px' }
const h2 = { color: DARK, fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: '18px 0 0' }
