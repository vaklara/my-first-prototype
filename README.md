# Sjednávač cestovního pojištění – Prototyp

Klientská zóna pro sjednání cestovního pojištění (B2C).

## Stack

- Next.js 15, React 19, TypeScript
- Mantine 7, Tailwind CSS 4
- react-hook-form + Zod, Framer Motion

## Spuštění

```bash
cd prototype
npm install
npm run dev
```

Otevřete http://localhost:3000

## Demo přihlášení

- **E-mail:** demo@example.com
- **Heslo:** demo123

## Struktura aplikace

| Cesta | Popis |
|-------|-------|
| `/` | Úvodní stránka |
| `/welcome` | Landing – informace o produktu |
| `/demo-login` | Přihlášení (mock) |
| `/dashboard` | Klientská zóna – přehled smluv |
| `/onboarding` | Multi-step formulář pro sjednání |
| `/dashboard/contract/[id]` | Zobrazení smlouvy (lightweight KZ) |

## Deployment (Netlify)

V Netlify nastavte **Base directory** na `prototype`.
