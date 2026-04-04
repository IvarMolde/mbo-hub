// prompts.js

const SYSTEM_PROMPT = `Du er en ekspert på norskopplæring for voksne innvandrere i Norge. Du lager undervisningsmateriell for kurset MBO (Målrettet bedriftsopplæring) ved Molde voksenopplæringssenter, i samarbeid med NAV Molde.

MÅLGRUPPE: Voksne innvandrere som har fullført introduksjonsprogrammet. Mange ulike morsmål – ingen morsmålsstøtte mulig. Alt materiell skal være på bokmål.

DU SKAL ALLTID:
- Skrive klart, korrekt og pedagogisk gjennomtenkt norsk bokmål
- Tilpasse alt innhold nøyaktig til det oppgitte CEFR-nivået
- Bruke autentiske og realistiske situasjoner fra norsk arbeidsliv
- Inkludere fagspesifikk terminologi som er relevant for det aktuelle yrket
- Lage oppgaver med høy pedagogisk kvalitet og variasjon
- Gi fasit til alle oppgaver med lukkede svar

VIKTIG FORMATERING FOR UTFYLLING:
- Når oppgaver krever at eleven skriver inn svar, bruk denne formateringen: _______________
- Bruk alltid minst 15 understreker for hvert skrivefelt
- For lengre svar (setninger), bruk hele linjer: _____________________________________________
- Mellom hvert skrivefelt, la det være god plass (tom linje)
- ALDRI bruk symboler som ( ), [ ], { } eller ... for skrivefelt

NIVÅTILPASNING:
- A1: Svært enkle setninger (5–7 ord). Matching, avkrysning, ordbank alltid inkludert. Høyfrekvente hverdagsord.
- A2: Korte setninger og enkle tekster. Fill-in-the-blank, true/false, enkle spørsmål. Enkel grammatikk (presens/preteritum, V2).
- B1: Lengre tekster, mer kompleks grammatikk (perfektum, modalverb, leddsetninger). Skriveoppgaver, argumentasjon.
- B2: Autentiske tekster (stillingsannonser, kontrakter). Analyse, diskusjon, formelt/uformelt register, passiv.

GRAMMATIKKFOKUS PER NIVÅ:
- A1: Subjekt + verb + objekt, presens, personlige pronomen, tall/tid
- A2: V2-regelen, inversjon, presens/preteritum, adjektivbøying, preposisjoner
- B1: Perfektum, modalverb, leddsetninger (fordi, når, hvis), sammensatte ord
- B2: Passiv, kondisjonalis, avansert setningsbygging, formelt vs. uformelt register`;


function lagFagtekstPrompt(yrke, nivaa) {
  return `Lag et komplett undervisningsmateriell om yrket "${yrke}" for CEFR-nivå ${nivaa}.

VIKTIG STRUKTUR: Hver fagtekst skal følges DIREKTE av sine oppgaver. Ikke samle alle tekster først – eleven skal lese én tekst og deretter jobbe med oppgavene til den teksten før de går videre.

Følg denne rekkefølgen NØYAKTIG:

---

## VIKTIGE ORD OG UTTRYKK
Lag en ordliste med 12–18 fagspesifikke ord og uttrykk for ${yrke}. For hvert ord:
- Ordet på norsk (i fet skrift)
- Enkel forklaring på norsk (tilpasset ${nivaa}-nivå)
- Et eksempel på bruk i en setning

---

## FAGTEKST 1: Hva gjør en ${yrke}?
Skriv en fagtekst som beskriver arbeidsoppgavene til en ${yrke}. Teksten skal handle om typiske arbeidsoppgaver, arbeidstider, og hva man gjør på en vanlig arbeidsdag.
Lengde: ${nivaa === 'A1' ? '60–80 ord' : nivaa === 'A2' ? '100–130 ord' : nivaa === 'B1' ? '150–200 ord' : '200–280 ord'}

## OPPGAVER TIL FAGTEKST 1
Lag 5 varierte oppgaver (a–e) til fagtekst 1. Oppgavene skal handle om innholdet i fagtekst 1.
${lagOppgavetyperForNivaa(nivaa, 1)}

---

## FAGTEKST 2: Arbeidsplassen og kollegaer
Skriv en fagtekst om arbeidsmiljøet til en ${yrke}. Teksten skal handle om hvem man jobber med, hvordan kommunikasjon foregår, HMS-rutiner, og samarbeid på arbeidsplassen.
Lengde: ${nivaa === 'A1' ? '60–80 ord' : nivaa === 'A2' ? '100–130 ord' : nivaa === 'B1' ? '150–200 ord' : '200–280 ord'}

## OPPGAVER TIL FAGTEKST 2
Lag 5 varierte oppgaver (a–e) til fagtekst 2. Oppgavene skal handle om innholdet i fagtekst 2. Bruk ANDRE oppgavetyper enn i oppgavesett 1.
${lagOppgavetyperForNivaa(nivaa, 2)}

---

## FAGTEKST 3: Veien til jobb som ${yrke}
Skriv en fagtekst om hva som kreves for å jobbe som ${yrke}. Teksten skal handle om utdanning/kurs, viktige egenskaper, hvordan man søker jobb, og muligheter i arbeidsmarkedet.
Lengde: ${nivaa === 'A1' ? '60–80 ord' : nivaa === 'A2' ? '100–130 ord' : nivaa === 'B1' ? '150–200 ord' : '200–280 ord'}

## OPPGAVER TIL FAGTEKST 3
Lag 5 varierte oppgaver (a–e) til fagtekst 3. Oppgavene skal handle om innholdet i fagtekst 3. Bruk ANDRE oppgavetyper enn i oppgavesett 1 og 2.
${lagOppgavetyperForNivaa(nivaa, 3)}

---

## MUNTLIG ØVELSE
🗣 Lag en muntlig øvelse (rollespill eller parmøvelse) som kobler sammen temaene fra alle tre fagtekster. Beskriv situasjonen, rollene og hva elevene skal snakke om.

## FASIT
Gi fasit til alle oppgaver med lukkede svar (fra alle tre oppgavesett). For åpne oppgaver, gi et eksempelsvar.

VIKTIG FORMAT:
- For alle utfyllingsoppgaver, bruk _______________ (minst 15 understreker) som skrivefelt
- For setningssvar, bruk hele linjer: _____________________________________________
- Ikke bruk ( ), [ ] eller ... for skrivefelt
- La det være god plass mellom oppgaver`;
}


function lagOppgavetyperForNivaa(nivaa, sett) {
  const typer = {
    'A1': {
      1: `Bruk disse oppgavetypene: Finn par (ord til definisjon), Sant/Usant med 5 påstander, Fyll inn med ordbank.
Oppgave a) er enklest. Inkluder alltid ordbank. For utfylling: bruk _______________.`,
      2: `Bruk disse oppgavetypene: Marker ordene (finn verb/substantiv i teksten), Flervalg med 3 alternativer, Skriv ordene (med bilde-hint).
For utfylling: bruk _______________.`,
      3: `Bruk disse oppgavetypene: Rekkefølge (sett setninger i riktig rekkefølge), Kategorisering (sorter ord i grupper), Setningsstartere med ordbank.
For utfylling: bruk _______________.`
    },
    'A2': {
      1: `Bruk disse oppgavetypene: Fyll inn med ordbank, Flervalg, Sant/Usant.
Oppgave a) er gjenkjenning, oppgave e) krever enkel produksjon. For utfylling: bruk _______________.`,
      2: `Bruk disse oppgavetypene: Finn feil i setningen, Rekkefølge (sett avsnitt i rekkefølge), Setningsstartere.
For utfylling: bruk _______________.`,
      3: `Bruk disse oppgavetypene: Fyll inn uten ordbank, Skriv korte svar på spørsmål, Koble setningshalvdeler.
For utfylling: bruk _______________.`
    },
    'B1': {
      1: `Bruk disse oppgavetypene: Flervalg, Fyll inn uten ordbank, Sett inn riktig verbform.
Oppgave a)–c) tester forståelse, d)–e) krever produksjon.
For skriveoppgaver: bruk linjer _____________________________________________`,
      2: `Bruk disse oppgavetypene: Jumbled Sentences (sett ord i riktig rekkefølge), Oppsummering, Ordkart (grupper ord).
For skriveoppgaver: bruk linjer _____________________________________________`,
      3: `Bruk disse oppgavetypene: Skriveoppgave (kort tekst), Diskusjonsspørsmål, Omskriving med leddsetninger.
For skriveoppgaver: bruk linjer _____________________________________________`
    },
    'B2': {
      1: `Bruk disse oppgavetypene: Analyse av teksten, Fyll inn avansert (preposisjoner/konjunksjoner), Diskusjonsspørsmål.
Oppgave a)–b) tester forståelse. Oppgave c)–e) krever produksjon.
For skriveoppgaver: bruk linjer _____________________________________________`,
      2: `Bruk disse oppgavetypene: Omskriving (formelt til uformelt eller omvendt), Argumentasjonsoppgave, Sammenligning.
For skriveoppgaver: bruk linjer _____________________________________________`,
      3: `Bruk disse oppgavetypene: Skriveoppgave (søknad/e-post), Refleksjonsoppgave, Tekstanalyse (finn hovedbudskap).
For skriveoppgaver: bruk linjer _____________________________________________`
    }
  };
  return typer[nivaa]?.[sett] || typer['A2']?.[sett] || '';
}


function lagPresentasjonPrompt(yrke, nivaa) {
  return `Lag innhold til en PowerPoint-presentasjon om yrket "${yrke}" for lærere som underviser voksne innvandrere på CEFR-nivå ${nivaa}.

Presentasjonen skal brukes som en introduksjon FØR elevene jobber med arbeidsarket. Målet er å aktivere forkunnskaper og forberede elevene på fagtekstene og oppgavene.

LAG INNHOLD TIL NØYAKTIG 10 SLIDES. Bruk NØYAKTIG dette formatet for hver slide:

---SLIDE 1---
TITTEL: ${yrke} – Yrkesnorsk nivå ${nivaa}
INNHOLD: Molde voksenopplæringssenter – MBO
NOTATER: Velkommen til denne økten. I dag skal vi lære om yrket ${yrke}.

---SLIDE 2---
TITTEL: Læringsmål
INNHOLD:
- Mål 1: ...
- Mål 2: ...
- Mål 3: ...
NOTATER: Gå gjennom målene med elevene...

---SLIDE 3---
TITTEL: Hva vet du allerede?
INNHOLD:
- Spørsmål 1: ...
- Spørsmål 2: ...
- Spørsmål 3: ...
NOTATER: La elevene diskutere i par først...

---SLIDE 4---
TITTEL: Viktige ord
INNHOLD:
- Ord 1 = forklaring
- Ord 2 = forklaring
- Ord 3 = forklaring
- Ord 4 = forklaring
- Ord 5 = forklaring
- Ord 6 = forklaring
NOTATER: Gå gjennom ordene...

---SLIDE 5---
TITTEL: Arbeidsoppgaver
INNHOLD: Liste over typiske arbeidsoppgaver
NOTATER: Tips til læreren...

---SLIDE 6---
TITTEL: En vanlig arbeidsdag
INNHOLD: Beskriv en typisk dag med klokkeslett
NOTATER: Tips til læreren...

---SLIDE 7---
TITTEL: Arbeidsmiljø og kollegaer
INNHOLD: Hvem jobber man med, kommunikasjon
NOTATER: Tips til læreren...

---SLIDE 8---
TITTEL: HMS og sikkerhet
INNHOLD: Viktige sikkerhetsrutiner for dette yrket
NOTATER: Tips til læreren...

---SLIDE 9---
TITTEL: Veien til jobb
INNHOLD: Utdanning, kurs, egenskaper
NOTATER: Tips til læreren...

---SLIDE 10---
TITTEL: Diskusjon
INNHOLD:
- Spørsmål 1: ...
- Spørsmål 2: ...
- Spørsmål 3: ...
NOTATER: La elevene diskutere i grupper...

VIKTIG: Bruk NØYAKTIG formatet ---SLIDE N--- / TITTEL: / INNHOLD: / NOTATER: for hver slide. Tilpass språknivået til ${nivaa}.`;
}
