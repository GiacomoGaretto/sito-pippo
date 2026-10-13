# Filippo — Design system 0.2

Prima bozza, 12 ottobre 2026. Aprire [la guida visiva](index.html) oppure il [prototipo completo](../glass.html). La guida contiene esempi interattivi, misure e indicazioni d’uso. Funziona senza dipendenze e con risorse locali.

## Stato delle decisioni

| Stato | Elementi |
| --- | --- |
| Direzione approvata | Navbar a pillole in vetro satinato, CTA arancione separata senza freccia, collasso al centro durante lo scroll; sans serif bold, testo principale ampio; neutri e arancione energico; nessun occhiello prima dei titoli. |
| Base corrente accettata | Gallery fotografica allineata e area corpo interattivo. L’illustrazione del corpo è ancora grezza. |
| Proposta di normalizzazione | Scala spaziature e tipografica, griglia, nomi dei token, focus a doppio anello, dimensione minima dei controlli. |
| Da definire | Font e marchio definitivi, foto reali, servizi confermati, illustrazione finale, invio del contatto e relativi stati, motivo creativo comune ai moduli. |

I token alimentano **questa guida**. Non sono ancora applicati come nuovo foglio globale al sito: una migrazione va fatta sui singoli componenti, verificando che restino fedeli alle scelte approvate. Il prototipo mantiene le sue misure esistenti. Non tutte le proposte di questa bozza sono decisioni approvate.

## Fondamenta

### Colori

| Token CSS | Valore | Uso |
| --- | --- | --- |
| `--ds-color-paper` | `#F5F5F2` | Fondo principale |
| `--ds-color-ink` | `#191919` | Testo principale, sezioni scure |
| `--ds-color-accent` | `#FF5A1F` | CTA, selezione, piccoli segni grafici |
| `--ds-color-accent-hover` | `#FF713E` | Hover dell’azione primaria |
| `--ds-color-on-accent` | `#191919` | Testo sull’arancione |
| `--ds-color-on-dark` | `#F5F5F2` | Testo su fondo scuro |
| `--ds-color-surface` | `#E7E7E3` | Pannelli secondari |
| `--ds-color-line` | `#D1D1CC` | Separatori decorativi |
| `--ds-color-muted` | `#61615D` | Testo di supporto su fondo chiaro |

60–30–10 è un rapporto compositivo indicativo tra chiaro, scuro e accento; non va misurato rigidamente su ogni modulo. La tavola colori dà più spazio al campione arancione per renderlo leggibile e non rappresenta quelle percentuali.

Per il testo normale usare combinazioni con contrasto almeno 4,5:1. La guida calcola i rapporti delle tinte piatte. Bianco su arancione e arancione su Paper non raggiungono questa soglia; evitare entrambe le combinazioni per il corpo testo. Il bordo Line è decorativo, non basta da solo a identificare un campo. Usare Muted per i bordi dei campi, Ink per lo stato selezionato, testo e spunta per distinguere la selezione senza dipendere dal colore. Immagini e trasparenze richiedono verifiche sulla composizione reale.

### Tipografia

Font locale Nimbus Sans, alias CSS `Forma`, pesi 400 e 700. Il nome Forma non indica un font acquistato o una scelta definitiva di brand. [Licenza dei font](../assets/FONT-LICENSE.txt).

| Ruolo | Valore proposto | Regola |
| --- | --- | --- |
| Display | `clamp(48px, 7.4vw, 112px)` | Bold, interlinea 1,02, tracking circa −0,04 em |
| Sezione | `clamp(38px, 4.2vw, 64px)` | Bold, interlinea 1,02 |
| Titolo di blocco | 25 px | Bold, interlinea 1,2 |
| Corpo | 20 px desktop / 18 px entro 700 px | Regular, interlinea 1,6 |
| Controlli | 16 px | Bold, interlinea 1,3 |
| Note | 14 px | Regular, interlinea 1,5; solo contenuti secondari |

Nessun occhiello o testo piccolo anticipa un titolo. Titoli corti, paragrafi di circa 45–65 caratteri per riga quando possibile. Il ruolo semantico h1/h2/h3 è indipendente dalla dimensione visiva. La gerarchia deve funzionare anche con testo ingrandito.

Il prototipo ha ancora variazioni da valutare: hero mobile 38–48 px, titoli espressivi della gallery fino a 86 px, testi di card 15–17 px e alcuni controlli mobile di 14 px. Questa bozza propone una base più coerente, senza dichiarare già completata la migrazione.

### Spazio, griglia e forme

- Scala proposta: **4, 8, 12, 16, 24, 32, 48, 64, 96 px**.
- 8–12 px tra elementi strettamente collegati; 16–24 px dentro gruppi; 32–48 px tra blocchi; 64–96 px tra sezioni.
- Contenitore massimo 1440 px; margine fluido `clamp(24px, 6.8vw, 104px)`.
- Griglia proposta: 12 colonne desktop, 4 mobile, gap 24 / 16 px. Non impone che ogni modulo occupi tutte le colonne.
- Soglie base: fino a 700 px compatto, fino a 1000 px intermedio. Il corpo interattivo usa ancora 760 px: da armonizzare con una verifica del layout.
- Raggi: poster 5, selezione 12, campo 15, pannello 24, dialog 28, pillola 999 px.
- La navbar con raggio 25 px resta una variante da confrontare (`glass.html?corners=soft`); il riferimento principale è la pillola piena.

Non allungare il testo per riempire le card: mantenere ritmo, allineamento e spaziatura. Nessuna rotazione o sfalsamento nella gallery.

## Componenti e comportamento

### Navbar

La pillola principale contiene il logo a sinistra e le voci a destra; la CTA “Parliamone” è un elemento separato immediatamente a destra. Nessuna freccia nella CTA.

Vetro: fondo `rgba(249,249,248,.61)`, blur 22 px e saturazione 110%, bordo bianco al 75%, ombra morbida. Il fondo passa a Paper pieno se il blur non è supportato. L’arancione della CTA è al 94% nella navbar.

Nel prototipo desktop: larghezza fino a 780 px, altezza 64 px, distanza 10 px; insieme collassato 330 px, composto da due pillole di 160 × 64 px. Su mobile: pillole di 125 × 57 px, distanza 8 px, insieme collassato 258 px. Le misure intermedie sono in `glass.css`.

Scorrendo verso il basso oltre 120 px, dopo 18 px di movimento nella stessa direzione, la barra si raccoglie al centro. Scorrendo verso l’alto si riapre; vicino all’inizio della pagina resta espansa. Le voci nascoste non devono ricevere focus. Il focus nella navbar e il menu aperto devono restare utilizzabili; verificare il comportamento prima di cambiare le soglie.

La guida mostra una simulazione a pulsante; il comportamento reale, compreso il menu mobile, si prova nel sito.

### Azioni e selezioni

- Primaria: fondo Energy, testo Ink, forma a pillola. Hover più chiaro, senza spostare il layout.
- Secondaria: fondo trasparente, bordo Ink, hover Surface.
- Disabilitata: non azionabile, opacità ridotta; spiegare il motivo nel contesto del flusso reale.
- Selezione multipla: `aria-pressed`, segno di spunta e fondo arancione. Si può deselezionare con un secondo clic.
- Focus proposto: anello Ink di 3 px, offset 4 px, separazione Paper di 4 px. Va verificato sui fondi effettivi.
- Target proposto minimo 44 × 44 px, anche quando il simbolo è più piccolo.

Nel sito alcuni pulsanti mobile sono ancora 35–40 px: sono un punto da sistemare nella migrazione, non un requisito già rispettato ovunque.

### Gallery servizi

Sei poster fotografici segnaposto di altezza uniforme, allineati sulla stessa base. Gerarchia: numero, immagine, titolo bold, descrizione, controllo arancione. Nel prototipo desktop 390 × 495 px, gap 26 px; sul mobile larghezza legata al viewport e gap 18 px. Sono misure espressive esistenti, da mantenere o consolidare esplicitamente.

Navigazione tramite swipe, trascinamento, pulsanti e frecce da tastiera. Lo scroll verticale della pagina non viene intercettato. Hover e focus segnalano l’interazione senza inclinare o sollevare la card. Il pulsante “+” ha un nome accessibile specifico per il servizio; nei dialog il focus deve essere contenuto e poi tornare al controllo di apertura.

### Corpo interattivo e contatto

Stato: **prototipo grezzo accettato come base**. Illustrazione e aree di interazione non sono definitive.

Macroaree multiple, viste fronte/retro, selezione sincronizzata con un elenco di pulsanti testuali. Usare un nome leggibile e lo stato selezionato anche per le regioni SVG; consentire Enter e Spazio. Cambiare vista non cancella le selezioni. Le regioni bilaterali sono raggruppate: questa bozza non distingue destra e sinistra.

La selezione è facoltativa; si può continuare senza indicare un’area. Il modulo è nella pagina separata `parliamone.html`, non nella home. Serve al primo contatto per informazioni o preventivo. Domanda opzionale: “Come posso aiutarti?”, con suggerimento di raccontare il motivo e le attività desiderate. Campo con etichetta permanente, testo di supporto e massimo 600 caratteri. Riepilogo modificabile prima dell’eventuale invio.

Il prototipo conserva le scelte solo in memoria: niente invio, persistenza o interpretazione diagnostica. Canale di contatto, informazioni richieste e gestione del recapito sono ancora da definire con il professionista. Quando il flusso sarà reale, progettare insieme stati iniziale, compilazione, errore, invio, conferma e tentativo fallito, con messaggi testuali comprensibili e senza perdere i dati inseriti. Non aggiungere colori di stato clinico alla mappa.

### Prima visita a step

La home racconta la prima visita in quattro tappe: ascolto, valutazione, scelte condivise, prime attività. Tab numerati con `aria-selected`, un pannello visibile alla volta, precedente/successivo e navigazione con frecce, Home ed End. Nessun avanzamento automatico o blocco dello scroll. Il movimento ridotto elimina la transizione dei pannelli. Il pulsante dell’ultima tappa apre Parliamone.

### FAQ e dialog

Le FAQ usano espansioni native, con titolo comprensibile e stato percepibile. Dialog con titolo associato, chiusura visibile, Escape, gestione del focus e restituzione al controllo di apertura. Nessuna informazione essenziale deve comparire soltanto al passaggio del mouse.

## Movimento

| Evento | Durata | Curva |
| --- | --- | --- |
| Navbar che si raccoglie | 640 ms, dopo 150 ms per lasciare uscire le voci | `cubic-bezier(.22,.8,.25,1)` |
| Uscita delle voci | 120 ms | ease |
| Ingresso delle voci | 180 ms, dopo 640 ms | ease |
| Feedback dei controlli | 180 ms | ease |

Rispettare `prefers-reduced-motion`: stato finale immediato, niente animazioni e scroll non animato. Evitare animazioni decorative ripetute o scroll obbligato. La gallery resta stabile.

## Immagini e voce

Fotografie di movimento, dettagli funzionali e situazioni reali. Il bianco e nero rende riconoscibile l’arancione; conservare toni e dettagli del corpo. Evitare immagini che rappresentino soltanto sport agonistico. Nel progetto i materiali attuali sono concept generati, non ritratti del professionista o pazienti reali.

Voce diretta, concreta e partecipativa. Mettere in primo piano attività desiderate e decisioni condivise. Esempi: “Decidiamo insieme da dove ripartire”, “Cosa vorresti tornare a fare?”. Evitare promesse di guarigione, tempi garantiti, colpevolizzazione del paziente o inviti generici a ignorare il dolore. Il dolore va compreso nel contesto della persona e del percorso.

I servizi sono segnaposto autorizzati per esplorare il layout; nessuna qualifica, tariffa, sede o prestazione non confermata diventa contenuto definitivo. “Fotogrammi”, “Fuori campo” e “La piega” restano [proposte separate](../strade-creative.html): non c’è ancora un motivo creativo approvato da estendere ai moduli.

## File e utilizzo

- `index.html`, `guide.css`, `guide.js`: guida visuale e campioni interattivi.
- `tokens.json`: sorgente dei valori, versione, stato e soglie responsive. Formato JSON semplice, non dichiarato compatibile con un importer specifico di Figma.
- `tokens.css`: variabili con prefisso `--ds-`, senza reset o regole globali.
- `README.md`: specifiche e confini della bozza.

Includere `tokens.css` prima del foglio dei componenti e dichiarare i font locali nel progetto che lo usa. Per il corpo mobile usare `--ds-font-body-mobile` nella media query a 700 px: le variabili sono valori, non applicano da sole i breakpoint. JSON e CSS devono rimanere sincronizzati; dopo una modifica confrontare tutti i valori. I valori responsive JSON non sono variabili CSS utilizzabili nelle media query.

Per servire localmente, dalla radice del repository:

```sh
python3 -m http.server 8768 --bind 127.0.0.1
```

La guida è nel percorso `esplorazioni/design-system/index.html`. Non richiede una build. È possibile aprirla anche come file locale, nei browser che lo consentono.

## Verifica prima del consolidamento

Verifica della guida eseguita in Chromium a 1440, 1100, 768, 390 e 320 px: nessun overflow orizzontale della pagina o errore JavaScript. Provati collasso e riapertura del campione navbar, selezione da tastiera, azzeramento, FAQ, download JSON e movimento ridotto. Controllati collegamenti locali e corrispondenza dei valori fra token JSON e CSS. Anteprime salvate in `anteprima-desktop.png`, `anteprima-mobile.png` e `palette.png`.

Verificare su desktop e mobile: overflow, dimensioni e contrasto dei testi, testo ingrandito, ordine di lettura, focus, tastiera, riduzione del movimento, target touch e stati del flusso di contatto. Le prove della guida non costituiscono una certificazione di accessibilità del sito. Servono ancora verifica su dispositivi reali, tecnologie assistive e contenuti definitivi.
