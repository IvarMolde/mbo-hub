// public/prompts.js
// System-prompt og oppgavemaler for MBO Yrkesnorsk HUB

const SYSTEM_PROMPT = `Du er en ekspert på norskopplæring for voksne innvandrere i Norge. Du lager undervisningsmateriell for kurset MBO (Målrettet bedriftsopplæring) ved Molde voksenopplæringssenter, i samarbeid med NAV Molde.

MÅLGRUPPE: Voksne innvandrere som har fullført introduksjonsprogrammet. Mange ulike morsmål – ingen morsmålsstøtte mulig. Alt materiell skal være på bokmål.

DU SKAL ALLTID:
- Skrive klart, korrekt og pedagogisk gjennomtenkt norsk bokmål
- Tilpasse alt innhold nøyaktig til det oppgitte CEFR-nivået
- Bruke autentiske og realistiske situasjoner fra norsk arbeidsliv
- Inkludere fagspesifikk terminologi som er relevant for det aktuelle yrket
- Lage oppgaver med høy pedagogisk kvalitet og variasjon
- Gi fasit til alle oppgaver med lukkede svar

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

STRUKTUR (følg denne nøyaktig):

## FAGTEKST 1: Hva gjør en ${yrke}?
Skriv en fagtekst som beskriver arbeidsoppgavene til en ${yrke}. Teksten skal handle om typiske arbeidsoppgaver, arbeidstider, og hva man gjør på en vanlig arbeidsdag.
Lengde: ${nivaa === 'A1' ? '60–80 ord' : nivaa === 'A2' ? '100–130 ord' : nivaa === 'B1' ? '150–200 ord' : '200–280 ord'}

## FAGTEKST 2: Arbeidsplassen og kollegaer
Skriv en fagtekst om arbeidsmiljøet til en ${yrke}. Teksten skal handle om hvem man jobber med, hvordan kommunikasjon foregår, HMS-rutiner, og samarbeid på arbeidsplassen.
Lengde: ${nivaa === 'A1' ? '60–80 ord' : nivaa === 'A2' ? '100–130 ord' : nivaa === 'B1' ? '150–200 ord' : '200–280 ord'}

## FAGTEKST 3: Veien til jobb som ${yrke}
Skriv en fagtekst om hva som kreves for å jobbe som ${yrke}. Teksten skal handle om utdanning/kurs, viktige egenskaper, hvordan man søker jobb, og muligheter i arbeidsmarkedet.
Lengde: ${nivaa === 'A1' ? '60–80 ord' : nivaa === 'A2' ? '100–130 ord' : nivaa === 'B1' ? '150–200 ord' : '200–280 ord'}

## VIKTIGE ORD OG UTTRYKK
Lag en ordliste med 12–18 fagspesifikke ord og uttrykk for ${yrke}. Hvert ord skal ha:
- Ordet på norsk
- Enkel forklaring på norsk (tilpasset ${nivaa}-nivå)
- Et eksempel på bruk i en setning

## OPPGAVER TIL FAGTEKST 1
Lag 5 varierte oppgaver (a–e) til fagtekst 1. Bruk ulike oppgavetyper:
${lagOppgavetyperForNivaa(nivaa)}

## OPPGAVER TIL FAGTEKST 2
Lag 5 varierte oppgaver (a–e) til fagtekst 2. Bruk andre oppgavetyper enn i oppgavesett 1:
${lagOppgavetyperForNivaa(nivaa)}

## OPPGAVER TIL FAGTEKST 3
Lag 5 varierte oppgaver (a–e) til fagtekst 3. Bruk andre oppgavetyper enn i oppgavesett 1 og 2:
${lagOppgavetyperForNivaa(nivaa)}

## MUNTLIG ØVELSE
🗣 Lag en muntlig øvelse (rollespill eller parmøvelse) som kobler sammen temaene fra alle tre fagtekster. Beskriv situasjonen, rollene og hva elevene skal snakke om.

## FASIT
Gi fasit til alle oppgaver med lukkede svar. For åpne oppgaver, gi et eksempelsvar.

VIKTIG: Svar BARE med selve innholdet. Ikke inkluder kommentarer, forklaringer eller meta-tekst om materialet.`;
}


function lagOppgavetyperForNivaa(nivaa) {
  const typer = {
    'A1': `Velg fra: Finn par (ord → definisjon), Sant/Usant, Fyll inn (med ordbank), Marker ordene, Skriv ordene (med bilde-hint)
Oppgave a) skal alltid være enklest. Oppgave e) kan være litt vanskeligere.
Inkluder alltid ordbank der eleven trenger å velge ord.`,
    'A2': `Velg fra: Fyll inn (med/uten ordbank), Flervalg, Sant/Usant, Rekkefølge, Setningsstartere, Finn feil i setningen
Oppgave a) skal være gjenkjenning. Oppgave e) kan kreve enkel produksjon.`,
    'B1': `Velg fra: Jumbled Sentences, Skriveoppgave, Oppsummering, Ordkart, Flervalg, Fyll inn (uten ordbank), Sett inn riktig form
Oppgave a)–c) skal teste forståelse. Oppgave d)–e) skal kreve produksjon.`,
    'B2': `Velg fra: Skriveoppgave, Diskusjonsspørsmål, Analyse, Fyll inn (avansert), Omskriving (formelt/uformelt), Argumentasjonsoppgave
Oppgave a)–b) skal teste forståelse og analyse. Oppgave c)–e) skal kreve selvstendig produksjon og refleksjon.`
  };
  return typer[nivaa] || typer['A2'];
}


function lagPresentasjonPrompt(yrke, nivaa) {
  return `Lag innhold til en PowerPoint-presentasjon om yrket "${yrke}" for lærere som underviser voksne innvandrere på CEFR-nivå ${nivaa}.

Presentasjonen skal brukes som en introduksjon FØR elevene jobber med arbeidsarket. Målet er å aktivere forkunnskaper og forberede elevene på fagtekstene og oppgavene.

LAG INNHOLD TIL DISSE SLIDENE:

SLIDE 1 – TITTELSLIDE
Tittel: ${yrke}
Undertittel: Yrkesnorsk – Nivå ${nivaa}

SLIDE 2 – LÆRINGSMÅL
3–4 konkrete læringsmål som starter med «Etter denne økten kan du...»

SLIDE 3 – HVA VET DU ALLEREDE?
3–4 åpne spørsmål som aktiverer forkunnskaper (f.eks. «Kjenner du noen som jobber som ${yrke}?»)

SLIDE 4 – VIKTIGE ORD
6–8 sentrale fagord med enkel forklaring. Tilpasset ${nivaa}-nivå.

SLIDE 5 – ARBEIDSOPPGAVER
Kort oversikt over typiske arbeidsoppgaver for en ${yrke}. Bruk korte setninger / stikkord.

SLIDE 6 – EN VANLIG ARBEIDSDAG
Beskriv en typisk arbeidsdag for en ${yrke}, gjerne med klokkeslett.

SLIDE 7 – ARBEIDSMILJØ OG KOLLEGAER
Hvem jobber en ${yrke} med? Hvordan kommuniserer man?

SLIDE 8 – HMS OG SIKKERHET
Viktige sikkerhetsrutiner for dette yrket. ${nivaa === 'A1' || nivaa === 'A2' ? 'Bruk enkle setninger og bilder.' : 'Inkluder relevante lover/regler.'}

SLIDE 9 – VEIEN TIL JOBB
Hva trenger man for å bli ${yrke}? Utdanning, kurs, egenskaper.

SLIDE 10 – DISKUSJON
3–4 diskusjonsspørsmål som knytter yrket til elevenes egne erfaringer.

For HVER slide, gi:
- Tittel
- Innhold (stikkord/korte setninger for slides, ikke lange avsnitt)
- Talenotater til læreren (2–4 setninger med tips om hvordan gjennomgå sliden)

VIKTIG: Svar BARE med slide-innholdet. Ikke inkluder kommentarer om presentasjonen.`;
}
