We have a shared basic and functional prototype. The prototype is just a simple HTML page. 
What I already have is a Git repository (both locally and on GitHub), connection and publication of the page via Netlify, and the overall plan.
I want to expand the prototype into an application that will emulate a small client zone. I want the application to be written in JavaScript, use my existing infrastructure with Netlify, and have the following parameters.

**URL prototypu (náš projekt):** https://cerulean-treacle-4c86f3.netlify.app/

**Inspirace pro styling a barvy:** https://lnd-poj.netlify.app/ (JerryPoj by Lundegaard – pouze jako vizuální vzor, ne rozšíření)

My feature requirements are:

- Basic login and hiding from the public
- Multi-step form with basic validations
- Use of camera for file upload
- Option to view contract in lightweight KZ
- Styling and colors of Lunde-poj prototype
- cestovní pojištění (https://www.generaliceska.cz/cestovni-pojisteni-online-sjednani) (B2C reference)

---

## Návrh prototypu – sjednávač cestovního pojištění

*Detailní specifikace: `02-doporuceni-sjednavac-cestovniho-pojisteni.md`*

### Struktura aplikace

**Veřejná část:** Landing s popisem cestovního pojištění, tlačítko „Sjednat pojištění“ → přihlášení.

**Klientská zóna (po přihlášení):**
- Multi-step formulář pro sjednání
- Přehled smluv / historie (mock)
- Zobrazení smlouvy v lehkém formátu (KZ)

### Multi-step formulář – 6 kroků

| Krok | Obsah |
|------|-------|
| 1 | **Cesta** – cíl (Evropa/Svět/Slovensko...), datum odjezdu/návratu, účel (turistická/pracovní/sportovní) |
| 2 | **Pojištěnci** – pro každou osobu: jméno, příjmení, datum narození; volitelně rodné číslo |
| 3 | **Kontakt** – e-mail, telefon, adresa (ulice, město, PSČ); volitelně bankovní účet |
| 4 | **Produkt** – balíček (Základ/Standard/Komplet), připojištění (storno, COVID, sport) |
| 5 | **Předsmluvní info** – IPID, pojistné podmínky, souhlas GDPR a obchodní podmínky (checkboxy) |
| 6 | **Shrnutí** – přehled údajů, cena (mock), tlačítko „Sjednat“ |

### Kamera / upload
- Nahrání dokladu (OP, pas) – foto nebo sken; formáty JPG, PNG, PDF; max ~5 MB.

### Smlouva (lightweight KZ)
- HTML shrnutí hlavních bodů + odkaz na plné PDF.

### Legislativa (základ)
- [Zákon 170/2018](https://www.zakonyprolidi.cz/cs/2018-170) o distribuci – IPID a pojistné podmínky před smlouvou, srozumitelná komunikace
- [Zákon 37/2004](https://www.zakonyprolidi.cz/cs/2004-37) o pojistné smlouvě
- GDPR – souhlas se zpracováním OÚ, informace o právech subjektu

---

## Implementace (2025-01-30)

Prototyp implementován:
- Landing (/), Welcome (/welcome), Demo login (/demo-login)
- Klientská zóna s ochranou routes (ProtectedRoute)
- Multi-step formulář (6 kroků) s validací Zod
- Dashboard, zobrazení smlouvy (lightweight KZ)
- CalculatorWidget, FileUpload (kamera/soubor), IPID
- Mantine + Tailwind, zelený design (JerryPoj)
