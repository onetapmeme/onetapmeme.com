import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; ref?: string; packPrice?: string }

const DossierPaid = ({ name = '', ref = 'CS-XXXX', packPrice = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Paiement reçu pour {ref} — préparez votre envoi</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
        <Section style={body}>
          <Heading style={h2}>Paiement reçu — préparez votre envoi</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Votre paiement{packPrice ? ` de ${packPrice}` : ''} a bien été reçu pour le dossier{' '}
            <strong>{ref}</strong>. Préparez votre envoi en respectant ces consignes :
          </Text>
          <Section style={listBox}>
            <Text style={li}>• Sleeve + toploader + sac antistatique</Text>
            <Text style={li}>• Enveloppe matelassée ou colis carton renforcé</Text>
            <Text style={li}>• Envoi recommandé R2 / R3, Chronopost ou UPS selon valeur</Text>
            <Text style={li}>• Mentionnez votre dossier <strong>{ref}</strong> sur l'étiquette</Text>
          </Section>
          <Button href={`https://cardsurgery.com/payment?ref=${ref}`} style={btn}>Voir l'adresse de l'atelier</Button>
          <Hr style={hr} />
          <Text style={footer}>Dès réception du colis, le diagnostic chirurgical commence.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierPaid,
  subject: (d: Record<string, any>) => `Dossier ${d.ref ?? ''} — paiement confirmé, préparez l'envoi`,
  displayName: 'Dossier paid',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', packPrice: '19 €' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto' }
const header = { background: 'linear-gradient(135deg, #5a3a25, #c98a5c)', padding: '22px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#fff', fontSize: '22px', margin: 0 }
const body = { padding: '28px 24px', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px', backgroundColor: '#ffffff' }
const h2 = { color: '#5a3a25', fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const listBox = { backgroundColor: '#f5efe7', padding: '12px 16px', borderRadius: '8px', margin: '12px 0 18px' }
const li = { fontSize: '14px', lineHeight: '1.6', margin: '4px 0' }
const btn = { backgroundColor: '#c98a5c', color: '#fff', padding: '12px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }
const hr = { borderColor: '#e7d9c8', margin: '20px 0 10px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: 0 }
