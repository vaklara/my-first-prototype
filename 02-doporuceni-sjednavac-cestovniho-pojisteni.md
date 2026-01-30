  # Doporučení: Sjednávač cestovního pojištění – co má prototyp obsahovat

*Vytvořeno na základě legislativy ČR (zákon o distribuci pojištění, zákon o pojistné smlouvě, GDPR) a běžných požadavků B2C cestovního pojištění.*

---

## 1. Legislativní rámec – klíčové zákony

| Zákon | Číslo | Relevance |
|-------|-------|-----------|
| Zákon o distribuci pojištění a zajištění | [170/2018 Sb.](https://www.zakonyprolidi.cz/cs/2018-170) | Povinné informace před smlouvou, jednání v zájmu zákazníka |
| Zákon o pojistné smlouvě | [37/2004 Sb.](https://www.zakonyprolidi.cz/cs/2004-37) | Právní rámec pojistné smlouvy |
| Zákon o pojišťovnictví | [277/2009 Sb.](https://www.zakonyprolidi.cz/cs/2009-277) | Provozování pojišťovací činnosti |
| GDPR | Nařízení EU 2016/679 | Zpracování osobních údajů |
| Zákon o pobytu cizinců | 326/1999 Sb. | Minimální krytí (30 000 EUR do 90 dnů, 60 000 EUR nad 90 dnů) – referenčně |

Zdroj: [Ministerstvo zdravotnictví – Cestovní zdravotní pojištění](https://mzd.gov.cz/cestovni-zdravotni-pojisteni/), [ČNB – předpisy distribuce pojištění](https://cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/pojistovny-zajistovny-a-pojistovaci-zprostredkovatele/)

---

## 2. Doporučené struktury prototypu

### 2.1 Veřejná část (před přihlášením)
- **Úvodní/landing stránka** – stručný popis produktu (cestovní pojištění)
- **Tlačítko „Sjednat pojištění“** → přesměrování na přihlášení

### 2.2 Přihlášení a klientská zóna
- **Přihlášení** (viz požadavek „Basic login and hiding from public“)
- Po přihlášení přístup ke klientské zóně s:
  - Multi-step formulářem pro sjednání
  - Přehledem smluv / historie (např. mock seznam)
  - Možností zobrazení smlouvy v lehkém formátu („lightweight KZ“)

---

## 3. Multi-step formulář – doporučené kroky a údaje

### Krok 1: Údaje o cestě
| Pole | Povinné | Validace | Poznámka |
|------|---------|----------|----------|
| Cíl cesty | ✓ | Výběr z předvoleb | Evropa, Svět bez USA/Kanady, Svět, Slovensko, konkrétní země |
| Datum odjezdu | ✓ | ≥ dnes | |
| Datum návratu | ✓ | ≥ datum odjezdu, max. typicky 365 dní | |
| Účel cesty | ✓ | Výběr | Turistická / Pracovní / Sportovní |

### Krok 2: Pojištěné osoby
| Pole | Povinné | Validace | Poznámka |
|------|---------|----------|----------|
| Počet osob | ✓ | 1–N | |
| Pro každou osobu: Jméno, Příjmení | ✓ | | |
| Datum narození | ✓ | Výpočet věku v den odjezdu | Rozlišení dospělý/dítě/senior (např. 70+) |
| Rodné číslo | Volitelné/ Podle produktu | Kontrola formátu | Pro identifikaci |

### Krok 3: Kontaktní a identifikační údaje (dle zákona 170/2018, GDPR)
| Pole | Povinné | Validace | Poznámka |
|------|---------|----------|----------|
| E-mail | ✓ | Formát e-mailu | |
| Telefon | ✓ | Formát CZ telefonu | |
| Adresa trvalého pobytu | ✓ | Ulice, číslo, město, PSČ | |
| Bankovní účet (pro vrácení přeplatku) | Volitelné | IBAN / číslo účtu | |

### Krok 4: Volba rozsahu pojištění
| Položka | Popis |
|---------|-------|
| Typ balíčku | Základ / Standard / Komplet (předdefinované varianty) |
| Připojištění | Storno zájezdu, COVID Plus, sportovní aktivity (checkboxy) |

### Krok 5: Předsmluvní informace (legislativa)
- **IPID** (Informační dokument o pojistném produktu) – zobrazení/stažení před odesláním
- **Pojistné podmínky** – odkaz ke stažení PDF
- **Souhlas se zpracováním osobních údajů (GDPR)** – checkbox
- **Souhlas s obchodními podmínkami** – checkbox

### Krok 6: Shrnutí a odeslání
- Shrnutí zadaných údajů
- Výpočet ceny (mock)
- Tlačítko „Sjednat pojištění“ / „Odeslat“

---

## 4. Soubory a dokumenty (camera / file upload)

| Funkce | Popis |
|--------|-------|
| **Nahrání dokladu** | Možnost vyfotit / nahrát sken (občanský průkaz, pas) – např. pro ověření identity |
| **Formáty** | JPG, PNG, PDF |
| **Validace** | Maximální velikost (např. 5 MB), kontrola typu souboru |

*Pozn.: V B2C cestovním pojištění online se často obchází bez nahrávání dokladů; funkce kamery je vhodná jako rozšíření (např. pro přiložení dokladu k pojistné události).*

---

## 5. Zobrazení smlouvy (lightweight KZ)

- **Možnost 1:** PDF viewer v prohlížeči (embed / iframe)
- **Možnost 2:** HTML verze smlouvy s přehlednou strukturou (srozumitelný text, oddíly)
- **Možnost 3:** Proti PDF „lightweight“ verze – zkrácené, přehledné shrnutí hlavních bodů (pojistník, pojištěnec, cesta, limity, vyloučení)

Doporučení: kombinace – zobrazení strukturovaného shrnutí v HTML + odkaz na plné PDF.

---

## 6. Povinné informace dle zákona o distribuci (170/2018)

- Jasné uvedení, v jaké pozici a jménem koho distributor jedná
- Srozumitelná komunikace („jasným, výstižným a srozumitelným způsobem“)
- Označení obchodních sdělení jako „obchodní sdělení“
- Před uzavřením smlouvy poskytnout **IPID** a **pojistné podmínky**

---

## 7. GDPR – minimální požadavky

- Informace o správci osobních údajů
- Účel zpracování
- Právní základ (plnění smlouvy, právní povinnost)
- Doba uchování
- Práva subjektu údajů (přístup, oprava, výmaz, omezení, přenositelnost, námitka)
- Možnost podat stížnost u ÚOOÚ
- Povinný souhlas pro marketing (pokud bude)

---

## 8. Checklist pro prototyp

| Oblast | Položka |
|--------|---------|
| **Autentizace** | Přihlášení, ochrana obsahu před nepřihlášenými |
| **Formulář** | Multi-step, validace v každém kroku |
| **Cesta** | Cíl, datum odjezdu/návratu, účel |
| **Pojištěnci** | Jméno, příjmení, datum narození (minimálně) |
| **Kontakt** | E-mail, telefon, adresa |
| **Produkt** | Výběr balíčku, připojištění |
| **Dokumenty** | IPID, pojistné podmínky před odesláním |
| **GDPR** | Souhlas se zpracováním OÚ |
| **Upload** | Kamera / nahrání souboru |
| **Smlouva** | Zobrazení v lehkém formátu (KZ) |
| **Design** | Styling inspirovaný JerryPoj (Lunde-poj) |

---

## 9. Odkazy

- [Zákon o distribuci pojištění 170/2018](https://www.zakonyprolidi.cz/cs/2018-170)
- [Zákon o pojistné smlouvě 37/2004](https://www.zakonyprolidi.cz/cs/2004-37)
- [MZČR – Cestovní zdravotní pojištění](https://mzd.gov.cz/cestovni-zdravotni-pojisteni/)
- [Generali – cestovní pojištění online (B2C reference)](https://www.generaliceska.cz/cestovni-pojisteni-online-sjednani)
- [JerryPoj – inspirace pro styling](https://lnd-poj.netlify.app/)
