# Sito di Filippo — prototipo e design system

Materiale di progettazione per il sito di un giovane fisioterapista: insight dell’intervista, esplorazioni visive, prototipo navigabile e design system in bozza.

## Materiale principale

- [Home del prototipo](esplorazioni/glass.html)
- [Pagina Parliamone](esplorazioni/parliamone.html)
- [Design system 0.2](esplorazioni/design-system/index.html) e [specifiche](esplorazioni/design-system/README.md)
- Token [CSS](esplorazioni/design-system/tokens.css) e [JSON](esplorazioni/design-system/tokens.json)
- [Decisioni di design](esplorazioni/design-decisions.md)
- [Insight dell’intervista](docs/insight_intervista_fisioterapista.md)
- [Archivio delle direzioni visive](esplorazioni/index.html)
- [Proposte di espediente creativo](esplorazioni/strade-creative.html)
- [Pacchetto ZIP delle esplorazioni](direzioni-visive-filippo.zip)

## Avvio locale

Non sono necessarie installazioni o una build. Dalla radice del repository:

```sh
python3 -m http.server 8768 --bind 127.0.0.1
```

Nel browser aprire il percorso `/esplorazioni/glass.html` sul server locale; la guida è in `/esplorazioni/design-system/index.html`.

## Stato del progetto

La home include navbar in vetro satinato che collassa durante lo scroll, sei card di servizi segnaposto e una prima visita raccontata in quattro tappe. Il contatto con selezione delle macroaree del corpo è una pagina separata. Il prototipo non invia richieste e non conserva i dati del contatto dopo il ricaricamento.

Foto e servizi sono materiali di concept. Font, contenuti professionali, recapiti e flusso di invio definitivi restano da confermare. Le esplorazioni precedenti sono conservate come archivio.

Font e immagini sono locali; la licenza dei font è in [FONT-LICENSE.txt](esplorazioni/assets/FONT-LICENSE.txt). Anteprime e verifiche del prototipo sono documentate nel [README delle esplorazioni](esplorazioni/README.md).
