# Direzione attiva — Vetro, contrasto e movimento

Il prototipo attivo è `glass.html`. Le regole concordate sono raccolte in `design-decisions.md`.

## Composizione e palette

Base neutra, fotografia in bianco e nero e arancione saturo usato per CTA e piccoli punti di interazione. Il riferimento 60–30–10 orienta la gerarchia: circa 60% superfici chiare, 30% nero/grigi/fotografie, 10% accento come limite indicativo, senza forzare un conteggio di pixel.

| Token | Valore |
| --- | --- |
| Fondo | `#F5F5F2` |
| Testo / sezione gallery | `#191919` |
| Superficie secondaria | `#E7E7E3` |
| Accento | `#FF5A1F` |
| Vetro neutro | `rgba(249,249,248,.61)` |
| Vetro CTA | `rgba(255,90,31,.94)` |
| Blur / saturazione | `22px / 110%` |
| Raggio completo / morbido | `999px / 25px` |
| Famiglia | Nimbus Sans (alias Forma), locale |
| Titoli / navbar / CTA | Peso 700 |
| Corpo principale | 20 px desktop / 18 px mobile |

I titoli partono direttamente dal messaggio. Nessun occhiello, soprattitolo o piccola etichetta introduttiva.

## Navbar

Il gruppo navbar + CTA si restringe intorno al centro dello schermo in circa 640 ms. Le voci sfumano prima che lo spazio si riduca; il logo resta nella sua pillola e la CTA arancione rimane a fianco, senza freccia. Lo scroll verso l’alto riapre la navigazione. Una piccola soglia evita continui cambi di stato per oscillazioni minime.

Le voci nascoste sono escluse dalla navigazione a tastiera. Il focus sul gruppo riapre la barra; su mobile il menu scompare nello stato collassato e torna scorrendo verso l’alto. Con movimento ridotto il cambio di stato avviene senza animazione. Il vetro ha un fallback opaco.

## Gallery dei servizi

Quattro poster fotografici allineati, con altezza uniforme e senza rotazioni, tipografia ampia, dettagli apribili e comandi arancioni. Sono disponibili trascinamento con mouse, swipe nativo, pulsanti e frecce della tastiera quando la gallery ha il focus. La pagina non intercetta lo scroll verticale per trasformarlo in orizzontale.

I servizi sono segnaposto autorizzati dal designer: riabilitazione sportiva, dolore e movimento, recupero dopo un intervento, valutazioni funzionali. Testi e offerta vanno definiti con il professionista prima della pubblicazione. Le immagini sono generate e non rappresentano pazienti o Filippo.

## Espediente da ripetere nei moduli

Tre studi separati in `strade-creative.html`: Fotogrammi, Fuori campo e La piega. Nessuno è stato applicato come linguaggio ripetuto nei moduli. La gallery a poster è una proposta specifica per i servizi e può essere adattata dopo la scelta del filo conduttore.

## Media

Hero fotografica a tutta larghezza con versione in scala di grigi tramite CSS. Non è presente un video. Il materiale definitivo potrà essere sostituito con foto o riprese autentiche; per un eventuale video serviranno poster, pausa e rispetto del movimento ridotto.

## Corpo interattivo nei contatti

Un corpo stilizzato in SVG consente di selezionare più macroaree. La selezione è sincronizzata con i pulsanti testuali, utilizzabili anche da tastiera, e viene mantenuta passando tra fronte e retro. Scegliere dall’elenco una zona visibile solo dall’altro lato cambia automaticamente vista. Si può deselezionare una zona o azzerare tutte le scelte.

Il contatto è ora nella pagina separata `parliamone.html`. La domanda facoltativa “Come posso aiutarti?” invita a descrivere motivo della richiesta e attività desiderate. “Rivedi la richiesta” mostra zone e testo inserito; è possibile tornare a modificarli e procedere anche senza indicare zone. Il prototipo non invia nulla, non salva dati nel browser e non propone diagnosi.

Le aree sono generiche e non distinguono destra e sinistra. Anatomia e terminologia sono una proposta di interfaccia da validare con Filippo. Nessun collegamento automatico tra zona e servizio clinico.
