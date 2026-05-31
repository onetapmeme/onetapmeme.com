import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  ref?: string
  packPrice?: string
  locale?: string
  deliveryType?: string
}

type Lang = 'fr' | 'en'
const pickLang = (l?: string): Lang => (l && l.toLowerCase().startsWith('fr') ? 'fr' : 'en')

const COPY: Record<Lang, {
  preview: (ref: string) => string
  subject: (ref: string) => string
  greeting: (n: string) => string
  paidIntro: (price: string, ref: string) => React.ReactNode
  shipTitle: string
  shipList: string[]
  shipCta: string
  pickupTitle: string
  pickupBody: (ref: string) => React.ReactNode
  pickupCta: string
  footer: string
  fallbackName: string
}> = {
  fr: {
    preview: (ref) => `Paiement reçu pour ${ref}`,
    subject: (ref) => `Dossier ${ref} — paiement confirmé`,
    greeting: (n) => `Bonjour ${n},`,
    paidIntro: (price, ref) => (
      <>Votre paiement{price ? ` de ${price}` : ''} a bien été reçu pour le dossier <strong>{ref}</strong>.</>
    ),
    shipTitle: 'Préparez votre envoi en respectant ces consignes :',
    shipList: [
      'Sleeve + toploader + sac antistatique',
      'Enveloppe matelassée ou colis carton renforcé',
      "Envoi recommandé R2 / R3, Chronopost ou UPS selon valeur",
      'Mentionnez votre numéro de dossier sur l\'étiquette',
    ],
    shipCta: "Voir l'adresse de l'atelier",
    pickupTitle: 'Remise en main propre — Strasbourg',
    pickupBody: (ref) => (
      <>Vous avez choisi la remise en main propre à Strasbourg. Notre équipe vous contactera dans
      les 24 h pour convenir d'un rendez-vous au laboratoire. Merci de garder votre référence{' '}
      <strong>{ref}</strong> à portée de main.</>
    ),
    pickupCta: 'Réserver un créneau',
    footer: 'Dès réception de la carte, le diagnostic chirurgical commence.',
    fallbackName: 'collectionneur',
  },
  en: {
    preview: (ref) => `Payment received for ${ref}`,
    subject: (ref) => `Dossier ${ref} — payment confirmed`,
    greeting: (n) => `Hello ${n},`,
    paidIntro: (price, ref) => (
      <>We have received your payment{price ? ` of ${price}` : ''} for dossier <strong>{ref}</strong>.</>
    ),
    shipTitle: 'Please prepare your shipment with the following:',
    shipList: [
      'Sleeve + toploader + antistatic bag',
      'Padded envelope or reinforced cardboard parcel',
      'Registered R2 / R3, Chronopost or UPS depending on value',
      'Write your dossier reference on the label',
    ],
    shipCta: 'See workshop address',
    pickupTitle: 'Hand delivery — Strasbourg',
    pickupBody: (ref) => (
      <>You picked hand delivery in Strasbourg. Our team will reach out within 24 h to book a slot
      at the workshop. Keep your reference <strong>{ref}</strong> handy.</>
    ),
    pickupCta: 'Book a slot',
    footer: 'Surgery starts as soon as the card reaches the workshop.',
    fallbackName: 'collector',
  },
}

const DossierPaid = ({
  name = '', ref = 'CS-XXXX', packPrice = '', locale = 'fr', deliveryType = '',
}: Props) => {
  const c = COPY[pickLang(locale)]
  const isHandDelivery = deliveryType === 'hand_delivery_strasbourg'
  return (
    <Html lang={pickLang(locale)} dir="ltr">
      <Head />
      <Preview>{c.preview(ref)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}><Heading style={h1}>CardSurgery</Heading></Section>
          <Section style={body}>
            <Heading style={h2}>{isHandDelivery ? c.pickupTitle : c.shipTitle}</Heading>
            <Text style={text}>{c.greeting(name || c.fallbackName)}</Text>
            <Text style={text}>{c.paidIntro(packPrice, ref)}</Text>
            {isHandDelivery ? (
              <>
                <Text style={text}>{c.pickupBody(ref)}</Text>
                <Button href={`https://cardsurgery.com/booking?ref=${ref}`} style={btn}>{c.pickupCta}</Button>
              </>
            ) : (
              <>
                <Section style={listBox}>
                  {c.shipList.map((line, i) => (
                    <Text key={i} style={li}>• {line}</Text>
                  ))}
                </Section>
                <Button href={`https://cardsurgery.com/payment?ref=${ref}`} style={btn}>{c.shipCta}</Button>
              </>
            )}
            <Hr style={hr} />
            <Text style={footer}>{c.footer}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: DossierPaid,
  subject: (d: Record<string, any>) => COPY[pickLang(d.locale)].subject(d.ref ?? ''),
  displayName: 'Dossier paid',
  previewData: { name: 'Jane', ref: 'CS-2026-679B', packPrice: '19 €', locale: 'fr' },
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
