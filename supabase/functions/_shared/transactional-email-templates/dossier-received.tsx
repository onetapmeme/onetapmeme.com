import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE = 'CardSurgery'
const BRAND = '#c98a5c'
const DARK = '#5a3a25'

interface Props { name?: string; ref?: string; packLabel?: string; cardName?: string }

const DossierReceived = ({ name = '', ref = 'CS-XXXX', packLabel = '', cardName = '' }: Props) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Votre demande de diagnostic {ref} a bien été reçue</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>{SITE}</Heading>
          <Text style={tagline}>La précision chirurgicale pour vos cartes</Text>
        </Section>
        <Section style={body}>
          <Heading style={h2}>Votre demande a bien été reçue ✓</Heading>
          <Text style={text}>Bonjour {name || 'collectionneur'},</Text>
          <Text style={text}>
            Merci pour votre confiance. Nous avons bien reçu vos photos et les détails de la carte{' '}
            <strong>{cardName || 'à diagnostiquer'}</strong>. Un chirurgien analyse votre dossier
            et vous répondra <strong>sous 24 h ouvrées</strong>.
          </Text>
          <Section style={refBox}>
            <Text style={refLabel}>Numéro de dossier</Text>
            <Text style={refValue}>{ref}</Text>
          </Section>
          <Text style={text}>
            <strong>Aucun paiement n'est requis à ce stade.</strong> Le règlement du forfait{' '}
            <em>{packLabel || ''}</em> ne sera demandé qu'après validation du diagnostic.
          </Text>
          <Button href={`https://cardsurgery.com/tracking?ref=${ref}`} style={btn}>
            Suivre mon dossier
          </Button>
          <Hr style={hr} />
          <Text style={footer}>
            Une question ? Répondez simplement à cet email — notre équipe est à votre écoute.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DossierReceived,
  subject: (d: Record<string, any>) => `Dossier ${d.ref ?? ''} reçu — CardSurgery`,
  displayName: 'Dossier received',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', packLabel: 'Surface Clean & Polish', cardName: 'Noctali 100' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#2a1d14' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '0' }
const header = { background: `linear-gradient(135deg, ${DARK}, ${BRAND})`, padding: '24px', borderRadius: '14px 14px 0 0' }
const h1 = { color: '#ffffff', fontSize: '24px', margin: '0', letterSpacing: '0.5px' }
const tagline = { color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: '4px 0 0' }
const body = { padding: '28px 24px', backgroundColor: '#ffffff', border: '1px solid #e7d9c8', borderTop: 'none', borderRadius: '0 0 14px 14px' }
const h2 = { color: DARK, fontSize: '20px', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.55', margin: '0 0 14px' }
const refBox = { backgroundColor: '#f5efe7', padding: '14px', borderRadius: '8px', margin: '18px 0', textAlign: 'center' as const }
const refLabel = { fontSize: '11px', color: '#7b6957', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '0 0 4px' }
const refValue = { fontSize: '22px', fontFamily: 'monospace', fontWeight: 'bold', color: DARK, margin: '0' }
const btn = { backgroundColor: BRAND, color: '#ffffff', padding: '12px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', margin: '10px 0' }
const hr = { borderColor: '#e7d9c8', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#7b6957', margin: '0' }
