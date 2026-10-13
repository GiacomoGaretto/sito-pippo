# Indicazioni di design confermate

- Sans serif, titoli e navigazione bold. Corpo testo principale 20 px desktop / 18 px mobile.
- Non usare occhielli, soprattitoli o piccole etichette prima dei titoli. Vale per i futuri moduli del sito.
- Navbar flottante in vetro satinato, con logo a sinistra, voci a destra e CTA separata affiancata. CTA senza freccia.
- Durante lo scroll verso il basso, navbar e CTA si raccolgono al centro: la pillola della navigazione contiene soltanto il logo; CTA ancora visibile a destra. Scorrendo verso l’alto la navigazione si riapre.
- Animazione della navbar e colori approvati dal designer. Palette neutra con arancione saturo come accento; riferimento 60–30–10. Le percentuali sono una guida di composizione, non una misura letterale dei pixel.
- Gallery di servizi trattata come una serie di poster fotografici allineati, con altezza uniforme e senza rotazioni, esplorabili tramite trascinamento, swipe, pulsanti e tastiera.
- Area contatti con corpo stilizzato interattivo: macroaree multiple, viste fronte/retro, alternativa tramite pulsanti testuali, riepilogo. Selezione facoltativa e domanda sull’attività che si vuole recuperare.
- Il prototipo tiene la selezione solo in memoria e non invia richieste; nessun salvataggio persistente dei dati del corpo.
- Servizi e descrizioni della gallery sono segnaposto autorizzati dal designer: non costituiscono un’offerta clinica confermata.
- Gli espedienti ripetuti tra moduli vanno prima proposti e scelti. Fotogrammi, Fuori campo e La piega sono dimostrazioni separate in `strade-creative.html`; non integrarli nel sito finché non viene scelta una strada.

Le prime quattro direzioni in `preview.html` e `index.html` sono archivio di esplorazione. Il prototipo attivo è `glass.html`, con `glass.css`, `glass.js`, `body-map.css` e `body-map.js`.

La bozza 0.2 del design system è in `design-system/index.html`, con specifiche in `design-system/README.md` e token CSS/JSON. Scale, griglia, focus e dimensioni minime dei controlli sono proposte di consolidamento; non modificano automaticamente il sito né costituiscono nuove decisioni approvate. Il corpo interattivo resta una versione grezza da affinare.

## Revisione: navbar, prima visita e contatto separato

- Navbar espansa più stretta, massimo 780 px. Da collassata: logo e CTA hanno larghezza e altezza uguali (160 × 64 px desktop, 125 × 57 px mobile).
- Le voci sfumano in 120 ms; dopo 150 ms inizia il restringimento di 640 ms. Il logo si sposta con la pillola fino al centro del suo contenitore.
- Link in fondo alla hero centrato, senza firma in basso a destra.
- Testo della gallery allineato in alto con il titolo; sei servizi segnaposto per provare lo scorrimento. Plus SVG centrato, hover di colore senza rotazione.
- Prima visita raccontata con quattro tappe navigabili; questa è la prima implementazione da valutare.
- “Parliamone” apre `parliamone.html`, con macroaree del corpo e motivo della richiesta. Il modulo è rimosso dalla home e resta una demo senza invio.
