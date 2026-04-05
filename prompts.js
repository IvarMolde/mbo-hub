// prompts.js – Komprimert MBO-skill for Gemini API

const SYSTEM_PROMPT = `Du lager yrkesrettet norskundervisningsmateriell for MBO (Målrettet bedriftsopplæring) ved Molde voksenopplæringssenter/NAV Molde.
Målgruppe: Voksne innvandrere, mange morsmål, kun bokmål. Mål: lønnet arbeid.

=== NIVÅKALIBRERING (CEFR) ===
A1: Forstår svært korte tekster (5-7 ord/setning). Gjenkjenner kjente navn, enkle uttrykk. Kan fylle inn skjema med personalia. Ordbank ALLTID inkludert.
A2: Forstår korte tekster om kjente emner. Kan skrive enkle setninger om seg selv og arbeid. Ordbank valgfritt.
B1: Leser enkle faktatekster om yrkesliv. Kan skrive sammenhengende tekst med leddsetninger. Kan argumentere enkelt.
B2: Leser autentiske tekster (annonser, kontrakter). Kan skrive formelle tekster, analysere og diskutere. Forstår nyanser.

=== GRAMMATIKKFOKUS – INTEGRER I FAGTEKSTENE ===
A1: Presens (jobber, starter, liker). S+V+O. Personlige pronomen. Tall/klokkeslett.
A2: V2/inversjon (Om morgenen starter hun). Preteritum. Adjektivbøying (en fin dag, et fint hus). Preposisjoner.
B1: Perfektum (har jobbet, har bodd). Modalverb (må/kan/skal/bør/vil/får). Leddsetninger (fordi/når/hvis/at).
B2: Passiv (blir ansatt, ble oppsagt). Kondisjonalis. Formelt vs. uformelt register.

=== OPPGAVEMØNSTRE (bruk disse som mal) ===

SANT/USANT: 5 påstander fra teksten. Fasit: S/U med forklaring ved U.
Eks: "a) Ahmed kjører rute 5. b) Han starter klokka seks." Fasit: a) U (rute 1) b) S

FYLL INN MED ORDBANK: Gi ordbank først. Setninger fra teksten med _______________.
Eks: Ordbank: jobber/bor/heter/starter
"a) Jeg _______________ Amara. b) Jeg _______________ i Molde."

KOBLE ORD/PAR: Ord i venstre kolonne, forklaringer i høyre (ulik rekkefølge).
Eks: "a) fagbrev → bevis på yrkeskompetanse, b) verneutstyr → beskytter kroppen"

INVERSJON/V2 (A2+): Gi løse ord, eleven lager setning med V2-regelen.
Eks: "starter / på jobb / Om morgenen / hun / tidlig" → "Om morgenen starter hun tidlig på jobb."

VERBFORMER (B1): Tabell med infinitiv → presens → preteritum → perfektum.
Eks: "å jobbe | jobber | jobbet | har jobbet"

MODALVERB (B1): Fyll inn riktig modalverb med hint om betydning.
Eks: "Du ___ bruke hjelm. (obligatorisk)" Fasit: må

LEDDSETNINGER (B1): Koble setningshalvdeler eller fyll inn konjunksjon.
Eks: "Jeg er glad ___ jeg fikk jobben." (fordi/at/når/hvis) Fasit: fordi

SKRIVEOPPGAVE (B1/B2): Tydelig instruksjon med krav.
Eks: "Skriv 6-8 setninger. Bruk minst 3 leddsetninger. Bruk perfektum."

=== FORMATREGLER ===
- Skrivefelt: bruk _______________ (minst 15 understreker), ALDRI ( ) eller [ ] eller ...
- For setningssvar: _____________________________________________
- God plass mellom oppgaver (tom linje)
- Tabeller for verbøvelser og koblingsoppgaver
- 🗣 for muntlige øvelser
- Fasit alltid til slutt, med forklaring ved typiske feil`;


// Liste over generelle temaer (matcher yrker.js)
const GENERELLE_TEMAER = [
  "Vanlige yrker i Norge",
  "Rettigheter og plikter på jobb",
  "Skatt og skattekort",
  "NAV – hjelp til jobb",
  "HMS – helse, miljø og sikkerhet",
  "CV og jobbsøknad",
  "Jobbintervjuet",
  "Arbeidsavtale og kontrakt",
  "Kommunikasjon og arbeidskultur",
  "Fagforeninger og tillitsvalgte"
];

// Beskrivelser for hva de tre fagtekstene skal handle om per generelt tema
const TEMA_TEKSTER = {
  "Vanlige yrker i Norge": {
    t1: { tittel: "Hvilke yrker trenger Norge?", beskrivelse: "Etterspørsel etter arbeidskraft i helse, oppvekst, bygg, transport og renhold. Hvilke bransjer som vokser." },
    t2: { tittel: "Utdanning og krav", beskrivelse: "Hva som kreves for ulike yrker – fagbrev, kurs, sertifikater. Hvordan realkompetansevurdering fungerer." },
    t3: { tittel: "Finne riktig yrke for deg", beskrivelse: "Hvordan velge yrke basert på interesser og erfaring. Karriereveiledning og NAVs rolle." }
  },
  "Rettigheter og plikter på jobb": {
    t1: { tittel: "Dine rettigheter som arbeidstaker", beskrivelse: "Rett til ferie, pauser, trygt arbeidsmiljø, skriftlig arbeidsavtale og oppsigelsestid." },
    t2: { tittel: "Dine plikter som arbeidstaker", beskrivelse: "Plikt til å møte presist, utføre arbeid, gi beskjed ved sykdom og følge regler." },
    t3: { tittel: "Hva gjør du hvis noe er galt?", beskrivelse: "Hvem du snakker med ved problemer – leder, tillitsvalgt, verneombud, Arbeidstilsynet." }
  },
  "Skatt og skattekort": {
    t1: { tittel: "Hvordan fungerer skatt i Norge?", beskrivelse: "Hva skatt er, hvorfor vi betaler skatt, og hva skattepengene brukes til." },
    t2: { tittel: "Skattekort og lønnslipp", beskrivelse: "Hva et skattekort er, hvordan bestille det, lese en lønnslipp, brutto vs. netto." },
    t3: { tittel: "Skattemeldingen", beskrivelse: "Hva skattemeldingen er, når den kommer, og hvordan sjekke at alt stemmer." }
  },
  "NAV – hjelp til jobb": {
    t1: { tittel: "Hva er NAV?", beskrivelse: "NAVs rolle som veileder. Registrere seg som arbeidssøker. Samarbeid mellom NAV og bruker." },
    t2: { tittel: "Økonomisk støtte fra NAV", beskrivelse: "Dagpenger, tiltakspenger, arbeidsavklaringspenger. Vilkår og plikter." },
    t3: { tittel: "NAV og veien til jobb", beskrivelse: "Aktivitetsplan, kurs, praksisplass og lønnstilskudd. Digitale tjenester på nav.no." }
  },
  "HMS – helse, miljø og sikkerhet": {
    t1: { tittel: "Hva er HMS?", beskrivelse: "HMS-begrepet. Forebygge skader og ulykker. Verneutstyr og sikkerhetsrutiner." },
    t2: { tittel: "Fysisk og psykisk arbeidsmiljø", beskrivelse: "Ergonomi, støy, kjemikalier. Mobbing, stress og psykososialt arbeidsmiljø." },
    t3: { tittel: "Dine plikter og rettigheter innen HMS", beskrivelse: "Melde fra om farlige situasjoner. Verneombud. Arbeidstilsynet." }
  },
  "CV og jobbsøknad": {
    t1: { tittel: "Hvordan skrive en god CV", beskrivelse: "Oppbygging av CV. Personalia, utdanning, erfaring, kompetanse og referanser." },
    t2: { tittel: "Søknaden som åpner dører", beskrivelse: "Hva en søknad skal inneholde. Tilpasse søknaden til stillingen. Motivasjon." },
    t3: { tittel: "Finne ledige stillinger", beskrivelse: "Søke jobb på Finn.no, NAV.no og bedriftssider. Sette opp søkevarsler. Nettverk." }
  },
  "Jobbintervjuet": {
    t1: { tittel: "Forberede seg til intervju", beskrivelse: "Undersøke bedriften. Forberede svar på vanlige spørsmål. Hva du skal ta med." },
    t2: { tittel: "Under intervjuet", beskrivelse: "Kroppsspråk, punktlighet, førsteinntrykk. Fortelle om styrker og erfaringer." },
    t3: { tittel: "Etter intervjuet", beskrivelse: "Takke for møtet. Oppfølging. Hva gjør du hvis du får avslag?" }
  },
  "Arbeidsavtale og kontrakt": {
    t1: { tittel: "Hva er en arbeidsavtale?", beskrivelse: "Krav om skriftlig avtale. Hva avtalen skal inneholde: lønn, arbeidstid, oppgaver." },
    t2: { tittel: "Viktige punkter i kontrakten", beskrivelse: "Fast vs. midlertidig stilling. Prøvetid. Oppsigelse. Overtid og tillegg." },
    t3: { tittel: "Forstå kontrakten din", beskrivelse: "Lese og forstå juridisk språk. Spørre om det du ikke forstår. Signering." }
  },
  "Kommunikasjon og arbeidskultur": {
    t1: { tittel: "Norsk arbeidskultur", beskrivelse: "Flat struktur, selvstendig ansvar, punktlighet. Du og formelt/uformelt språk." },
    t2: { tittel: "Kommunikasjon med kollegaer", beskrivelse: "Lunsjpausen, småprat, sosiale koder. Gi og ta imot beskjeder." },
    t3: { tittel: "Når kulturer møtes", beskrivelse: "Kulturforskjeller i arbeidsliv. Tilpasse seg uten å miste identiteten." }
  },
  "Fagforeninger og tillitsvalgte": {
    t1: { tittel: "Hva er en fagforening?", beskrivelse: "Fagforeningens rolle. LO, YS, Unio. Frivillig medlemskap." },
    t2: { tittel: "Hva gjør en tillitsvalgt?", beskrivelse: "Tillitsvalgtes rolle. Hjelp ved konflikter. Lønnsforhandlinger." },
    t3: { tittel: "Den norske arbeidsmodellen", beskrivelse: "Trepartssamarbeid: stat, arbeidsgiver, arbeidstaker. Tariffavtaler." }
  }
};

function erGenereltTema(valg) {
  return GENERELLE_TEMAER.includes(valg);
}

function lagFagtekstPrompt(yrke, nivaa) {
  if (erGenereltTema(yrke)) {
    return lagGenereltTemaPrompt(yrke, nivaa);
  }
  return lagYrkePrompt(yrke, nivaa);
}

function lagGenereltTemaPrompt(tema, nivaa) {
  const t = TEMA_TEKSTER[tema];
  if (!t) return lagYrkePrompt(tema, nivaa); // fallback

  return `Lag undervisningsmateriell om temaet "${tema}" for ${nivaa}.
Dette er et GENERELT arbeidsliv-tema som gjelder alle yrker i Norge.

REKKEFØLGE (tekst → oppgaver → tekst → oppgaver):

## VIKTIGE ORD OG UTTRYKK
12-18 viktige ord og uttrykk knyttet til ${tema}. Format: **Ordet** = forklaring. Eksempelsetning.

## FAGTEKST 1: ${t.t1.tittel}
${t.t1.beskrivelse} ${tekstlengde(nivaa)}
Integrer ${grammatikkfokus(nivaa)} naturlig i teksten.

## OPPGAVER TIL FAGTEKST 1
5 varierte oppgaver nummerert 1a, 1b, 1c, 1d, 1e.
${oppgavesett(nivaa, 1, tema)}

## FAGTEKST 2: ${t.t2.tittel}
${t.t2.beskrivelse} ${tekstlengde(nivaa)}

## OPPGAVER TIL FAGTEKST 2
5 varierte oppgaver nummerert 2a, 2b, 2c, 2d, 2e.
${oppgavesett(nivaa, 2, tema)}

## FAGTEKST 3: ${t.t3.tittel}
${t.t3.beskrivelse} ${tekstlengde(nivaa)}

## OPPGAVER TIL FAGTEKST 3
5 varierte oppgaver nummerert 3a, 3b, 3c, 3d, 3e.
${oppgavesett(nivaa, 3, tema)}

## 🗣 MUNTLIG ØVELSE
Rollespill eller parmøvelse som kobler sammen temaene fra alle tre tekster. Oppgi roller, situasjon og samtalepunkter.${nivaa === 'B1' || nivaa === 'B2' ? '\nGi setningsstartere: "Jeg har alltid...", "Fordi jeg...", "Jeg tror at..."' : ''}

## FASIT
Fasit til alle oppgaver (1a–3e). Ved U i sant/usant: gi riktig svar. Ved åpne oppgaver: eksempelsvar.

=== KRITISK FORMATERING ===
- Nummerer ALLE oppgaver som 1a, 1b, 1c, 1d, 1e (fagtekst 1), 2a, 2b, 2c, 2d, 2e (fagtekst 2), 3a, 3b, 3c, 3d, 3e (fagtekst 3)
- Hver oppgave (1a, 1b osv.) starter ALLTID med oppgavenummeret i fet skrift: **1a)**, **1b)** osv.
- Gi ALLTID en kort instruksjon i kursiv etter nummeret
- Hver deloppgave starter på NY LINJE
- Mellom hovedoppgaver skal det være EN tom linje
- Skrivefelt: bruk _______________ (minst 15 understreker)
- For setningssvar: _____________________________________________`;
}

function lagYrkePrompt(yrke, nivaa) {
  return `Lag undervisningsmateriell om "${yrke}" for ${nivaa}.

REKKEFØLGE (tekst → oppgaver → tekst → oppgaver):

## VIKTIGE ORD OG UTTRYKK
12-18 fagord for ${yrke}. Format: **Ordet** = forklaring. Eksempelsetning.

## FAGTEKST 1: Hva gjør en ${yrke}?
Arbeidsoppgaver, arbeidstider, en vanlig dag. ${tekstlengde(nivaa)}
Integrer ${grammatikkfokus(nivaa)} naturlig i teksten.

## OPPGAVER TIL FAGTEKST 1
5 varierte oppgaver nummerert 1a, 1b, 1c, 1d, 1e.
${oppgavesett(nivaa, 1, yrke)}

## FAGTEKST 2: Arbeidsplassen og kollegaer
Arbeidsmiljø, kommunikasjon, HMS, samarbeid. ${tekstlengde(nivaa)}

## OPPGAVER TIL FAGTEKST 2
5 varierte oppgaver nummerert 2a, 2b, 2c, 2d, 2e.
${oppgavesett(nivaa, 2, yrke)}

## FAGTEKST 3: Veien til jobb som ${yrke}
Utdanning/kurs, egenskaper, jobbsøking, arbeidsmarked. ${tekstlengde(nivaa)}

## OPPGAVER TIL FAGTEKST 3
5 varierte oppgaver nummerert 3a, 3b, 3c, 3d, 3e.
${oppgavesett(nivaa, 3, yrke)}

## 🗣 MUNTLIG ØVELSE
Rollespill eller parmøvelse som kobler alle tre tekster. Oppgi roller, situasjon og samtalepunkter.${nivaa === 'B1' || nivaa === 'B2' ? '\nGi setningsstartere: "Jeg har alltid...", "Fordi jeg...", "Jeg tror at..."' : ''}

## FASIT
Fasit til alle oppgaver (1a–3e). Ved U i sant/usant: gi riktig svar. Ved åpne oppgaver: eksempelsvar.

=== KRITISK FORMATERING ===
- Nummerer ALLE oppgaver som 1a, 1b, 1c, 1d, 1e (fagtekst 1), 2a, 2b, 2c, 2d, 2e (fagtekst 2), 3a, 3b, 3c, 3d, 3e (fagtekst 3)
- Hver oppgave (1a, 1b osv.) starter ALLTID med oppgavenummeret i fet skrift: **1a)**, **1b)** osv.
- Gi ALLTID en kort instruksjon i kursiv etter nummeret, f.eks: **1a) Sant eller usant?** *Les setningene. Skriv S (sant) eller U (usant).*
- Hver deloppgave (hvert punkt eleven skal svare på) starter på NY LINJE
- Mellom hovedoppgaver (mellom 1a og 1b, mellom 1b og 1c osv.) skal det være EN tom linje
- Skrivefelt: bruk _______________ (minst 15 understreker)
- For setningssvar: _____________________________________________`;
}


function tekstlengde(nivaa) {
  return { A1: '60-80 ord.', A2: '100-130 ord.', B1: '150-200 ord.', B2: '200-280 ord.' }[nivaa];
}

function grammatikkfokus(nivaa) {
  return {
    A1: 'presens-verb (jobber, starter, liker) og enkle S+V+O-setninger',
    A2: 'V2/inversjon (Om morgenen starter hun...) og preteritum',
    B1: 'perfektum (har jobbet, har bodd) og modalverb (må, kan, skal, bør)',
    B2: 'passiv (blir ansatt), leddsetninger og formelt register'
  }[nivaa];
}

function oppgavesett(nivaa, sett, yrke) {
  const s = {
    A1: {
      1: `a) Sant/Usant (5 påstander fra teksten)
b) Fyll inn verb med ordbank: Ordbank: [8 verb]. "Jeg _______________ på jobb klokka sju."
c) Koble ord til forklaring (5 par, ulik rekkefølge)
d) Skriv ordene: Elevene skriver fagord fra teksten med _______________ for hvert svar
e) Svar på spørsmål med hele setninger (3 enkle spørsmål)`,
      2: `a) Flervalg med 3 alternativer (5 spørsmål fra teksten)
b) Marker alle verb/substantiv i et kort tekstutdrag
c) Kategoriser ord i to grupper (f.eks. "personer" og "ting")
d) Fyll inn med ordbank (andre ord enn sett 1)
e) Tegn og skriv: Eleven tegner arbeidsplassen og skriver 3 setninger`,
      3: `a) Rekkefølge: Sett 5 setninger fra teksten i riktig rekkefølge
b) Koble setningshalvdeler (5 par)
c) Setningsstartere med ordbank: "Jeg vil jobbe som _______________ fordi _______________"
d) Finn det riktige ordet (odd one out): 4 grupper med 4 ord
e) Skriv 3 setninger om deg selv og jobb (med mønster fra teksten)`
    },
    A2: {
      1: `a) Fyll inn med ordbank (8 ord, 8 setninger fra teksten)
b) Sant/Usant med 6 påstander (noen krever tolkning)
c) Flervalg (5 spørsmål, 3 alternativer hver)
d) Sett ordene i riktig rekkefølge – V2-regelen: "starter / på jobb / Om morgenen / hun"
e) Skriv 3 setninger: Bruk inversjon. Start med tidspunkt/sted.`,
      2: `a) Finn feil: 5 setninger med én grammatikkfeil hver (V2, verbform, preposisjon)
b) Koble ord til forklaring (6 par)
c) Rekkefølge: Sett 6 hendelser fra teksten i riktig rekkefølge
d) Setningsstartere: "Når jeg er på jobb, _______________"
e) Skriv 4 setninger om din arbeidsplass (bruk minst 2 fagord fra ordlisten)`,
      3: `a) Fyll inn UTEN ordbank (5 setninger – eleven må finne ordet selv)
b) Svar på 5 spørsmål med hele setninger
c) Koble setningshalvdeler (6 par)
d) Skriv 3 adjektiv+substantiv-kombinasjoner: "en ___ jobb, et ___ kurs"
e) Kort skriveoppgave: "Hvorfor vil du jobbe som ${yrke}?" (4-5 setninger)`
    },
    B1: {
      1: `a) Flervalg (5 spørsmål om tekstens innhold)
b) Fyll inn riktig verbform – tabell: infinitiv → presens → preteritum → perfektum (6 verb fra teksten)
c) Perfektum eller preteritum? 5 setninger med tidsmarkør (i går/alltid/for to år siden)
d) Svar med perfektum: "Har du jobbet med dette før?" → "Ja, jeg har _______________"
e) Skriveoppgave: Oppsummer teksten i 4-5 setninger. Bruk perfektum.`,
      2: `a) Sant/Usant med begrunnelse (6 påstander – eleven må forklare hvorfor U)
b) Velg riktig modalverb med hint: "Du ___ bruke verneutstyr. (obligatorisk)"
c) Hva betyr modalverbet? Koble til: plikt/forbud/ønske/anbefaling/tillatelse/plan
d) Omskriv setninger med modalverb: "Det er forbudt å røyke" → "Du kan ikke ___"
e) Diskusjonsoppgave: "Hvilke regler er viktigst på denne arbeidsplassen? Bruk modalverb."`,
      3: `a) Koble setningshalvdeler med leddsetninger (6 par med fordi/når/hvis/at)
b) Fyll inn riktig konjunksjon: fordi/når/hvis/at/selv om (6 setninger)
c) Start med leddsetningen + inversjon: "hun ble oppsagt / søke dagpenger (fordi)" → "Fordi hun ble oppsagt, måtte hun søke dagpenger."
d) Skriveoppgave: Skriv 6-8 setninger om veien til jobb. Bruk minst 3 leddsetninger og 2 modalverb.
e) Refleksjon: Hva har du lært i denne teksten? Skriv 3 setninger med perfektum.`
    },
    B2: {
      1: `a) Analyse: Finn 3 hovedpoeng i teksten og forklar dem med egne ord
b) Fyll inn avansert: preposisjoner og konjunksjoner (8 setninger)
c) Omskriv fra aktiv til passiv: "Bedriften ansetter nye folk" → "Nye folk _______________ av bedriften"
d) Diskusjonsspørsmål: 3 spørsmål som krever argumentasjon
e) Skriv en kort fagtekst (8-10 setninger) om samme tema med formelt register`,
      2: `a) Formelt vs. uformelt: Omskriv 5 uformelle setninger til formelt språk
b) Argumentasjonsoppgave: "Er dette yrket viktig for samfunnet?" Skriv for og mot.
c) Sammenlign dette yrket med et annet: Likheter og forskjeller (tabell + tekst)
d) Tekstanalyse: Hvilke virkemidler bruker forfatteren? (fagord, eksempler, struktur)
e) Lag 5 spørsmål du ville stilt i et jobbintervju for denne stillingen`,
      3: `a) Skriv en kort jobbsøknad til en stilling som ${yrke} (8-10 setninger, formelt)
b) Refleksjon: Hva er de viktigste egenskapene for en ${yrke}? Ranger og begrunn.
c) Lag en stillingsannonse for en ${yrke}-stilling (bruk formelt språk og fagtermer)
d) Tekstanalyse: Hva er hovedbudskapet i teksten? Oppsummer i 3 setninger.
e) Muntlig forberedelse: Skriv ned 5 ting du ville sagt om deg selv i et jobbintervju for dette yrket.`
    }
  };
  return s[nivaa]?.[sett] || '';
}


function lagPresentasjonPrompt(yrke, nivaa) {
  const erGenerelt = erGenereltTema(yrke);
  const t = erGenerelt ? TEMA_TEKSTER[yrke] : null;

  const slideTitler = erGenerelt && t ? {
    s5: t.t1.tittel,
    s6: t.t1.beskrivelse.split('.')[0],
    s7: t.t2.tittel,
    s8: t.t2.beskrivelse.split('.')[0],
    s9: t.t3.tittel
  } : {
    s5: 'Arbeidsoppgaver',
    s6: 'En vanlig arbeidsdag',
    s7: 'Arbeidsmiljø og kollegaer',
    s8: 'HMS og sikkerhet',
    s9: 'Veien til jobb'
  };

  return `Lag 10 slides om "${yrke}" for ${nivaa}. Brukes FØR arbeidsarket for å aktivere forkunnskaper.
${erGenerelt ? 'Dette er et GENERELT arbeidsliv-tema som gjelder alle yrker i Norge.' : ''}

Bruk NØYAKTIG dette formatet:

---SLIDE 1---
TITTEL: ${yrke} – ${erGenerelt ? 'Arbeidsnorsk' : 'Yrkesnorsk'} ${nivaa}
INNHOLD: Molde voksenopplæringssenter – MBO
NOTATER: Velkommen. I dag: ${yrke}.

---SLIDE 2---
TITTEL: Læringsmål
INNHOLD:
- Mål 1
- Mål 2
- Mål 3
NOTATER: Gå gjennom målene.

---SLIDE 3---
TITTEL: Hva vet du allerede?
INNHOLD:
- Spørsmål 1
- Spørsmål 2
- Spørsmål 3
NOTATER: Diskusjon i par.

---SLIDE 4---
TITTEL: Viktige ord
INNHOLD:
- Ord = forklaring (6-8 ord)
NOTATER: Gjennomgå ordene.

---SLIDE 5---
TITTEL: ${slideTitler.s5}
INNHOLD: Hovedpunkter (stikkord)
NOTATER: Tips.

---SLIDE 6---
TITTEL: ${slideTitler.s6}
INNHOLD: Utdyping med eksempler
NOTATER: Tips.

---SLIDE 7---
TITTEL: ${slideTitler.s7}
INNHOLD: Hovedpunkter
NOTATER: Tips.

---SLIDE 8---
TITTEL: ${slideTitler.s8}
INNHOLD: Utdyping med eksempler
NOTATER: Tips.

---SLIDE 9---
TITTEL: ${slideTitler.s9}
INNHOLD: Hovedpunkter
NOTATER: Tips.

---SLIDE 10---
TITTEL: Diskusjon
INNHOLD:
- 3 diskusjonsspørsmål
NOTATER: Gruppediskusjon.

Tilpass språket til ${nivaa}.`;
}
