# Quattro direzioni visive per Filippo

La direzione attiva ha ora una [prima bozza di design system](design-system/index.html), con [specifiche](design-system/README.md) e token [CSS](design-system/tokens.css) / [JSON](design-system/tokens.json). La guida distingue le decisioni approvate dalle regole proposte e dai componenti ancora grezzi.

Apri `index.html` in un browser per confrontare quattro proposte. La pagina funziona senza installazione, servizi o connessioni esterne: font, immagini e illustrazioni sono locali.

Ogni proposta contiene una home navigabile, una versione mobile, palette, esempi di componenti e un’esportazione JSON dei token iniziali. La scelta viene salvata soltanto nel browser; non aggiorna automaticamente il progetto né costituisce una decisione definitiva.

| Direzione | Cosa mette in evidenza | Rischio da bilanciare |
| --- | --- | --- |
| Editoriale naturale | Ascolto, cura e presenza personale | Eccessiva calma rispetto all’identità sportiva |
| Sportiva energica | Movimento e ritorno all’attività | Percezione di un servizio soltanto per atleti |
| Clinica contemporanea | Metodo, chiarezza e valutazione | Percezione troppo impersonale |
| Calda relazionale | Accoglienza e decisioni condivise | Tono troppo leggero rispetto alla competenza |

Le proposte condividono il messaggio e la struttura dei contenuti per confrontare soprattutto il linguaggio visivo. Cambiano tipografia, griglia, composizione, palette, forme e illustrazioni. Non sono semplici variazioni di colore.

Le illustrazioni SVG sono originali e astratte. Non rappresentano dati clinici, risultati o persone reali. Le fotografie di Filippo saranno un elemento importante della versione successiva. I testi di offerta e le FAQ richiedono la sua validazione; nessun recapito o servizio non confermato viene pubblicato. I pulsanti di contatto aprono una spiegazione della demo.

## Dalla scelta al design system

1. Scegliere una direzione principale e motivare la scelta attraverso il pubblico e il posizionamento.
2. Annotare eventuali elementi da riprendere dalle altre proposte, senza perdere la coerenza della direzione principale.
3. Integrare foto, denominazione professionale e contenuti verificati.
4. Consolidare i token: colori semantici, scala tipografica, spaziature, layout responsive, bordi e movimento.
5. Definire stati e componenti: pulsanti, link, navigazione, card, FAQ, campi, errori, conferma di invio e contatto.
6. Verificare contrasto, tastiera, movimento ridotto e usabilità del percorso fino al contatto.

Font locali: Nimbus Sans, Nimbus Sans Narrow e P052, distribuiti dal pacchetto URW Base35. Condizioni in `assets/FONT-LICENSE.txt`. I nomi Forma, Impacto e Libro sono alias CSS per questa esplorazione.

## Nuova direzione: fotografia e vetro satinato

Apri `glass.html` per la proposta con navbar a pillola, CTA separata e hero fotografica. `glass.html?corners=soft` mostra gli angoli a 25 px. Indicazioni e token in `direzione-glass.md`; la foto generata è soltanto un riferimento di concept.

## Revisione: arancione, navbar animata e gallery

Il prototipo attivo `glass.html` usa ora `glass.css` e `glass.js`. Include navbar che collassa verso il centro durante lo scroll, gallery di servizi segnaposto e palette neutra con arancione. Le tre proposte di espediente creativo sono in `strade-creative.html`, separate dal sito. Preferenze confermate in `design-decisions.md`.

## Gallery ordinata e selezione del corpo

Le card della gallery sono ora allineate. In `glass.html`, il pulsante “Parliamone” porta alla nuova area contatti con corpo interattivo, sviluppata in `body-map.css` e `body-map.js`. Selezione multipla, viste fronte/retro, elenco alternativo accessibile e riepilogo della richiesta sono funzionanti. Il prototipo non invia o salva dati.

## Ultima revisione

`glass.html` contiene la navbar compatta, sei card e la prima visita a step. Il contatto è nella pagina separata `parliamone.html`. Il design system è aggiornato alla bozza 0.2.

Verifica dell’ultima revisione: navbar e proporzioni a 1440, 768, 390 e 320 px su home e contatto; sequenza fade/collasso; sei schede servizi; plus stabile; navigazione della prima visita con pulsanti e tastiera; menu mobile; selezione e riepilogo del contatto; movimento ridotto. Nessun overflow della pagina o errore JavaScript nei controlli eseguiti in Chromium.
