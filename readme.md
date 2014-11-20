Self Aligning Gallery

Zum Nutzen der Galerie binden sie die beiden Dateien gallery.js und gallery.css in ihr HTML-Dokument ein.
Die Galerie wird dann ueber Javascript gestartet.
Beim Aufruf der Galerie muessen die Elemente sowie ein Config-Array uebergeben werden. Optional kann auch ein Array mit den Groeßen der ersten Elemente uebergeben werden.

Elementgroeßen:
Das kleinste Element entspricht der angegebenen Groeße, also width x height,
beim naechst groeßeren Element wird die Breite verdoppelt, also width*2 x height
fuer das naechste wird dann das vorherige Elemen in der Hoehe verdoppelt, also width*2 x height*2
dann wird wieder die Breite verdoppelt, also width*4 x height*2
usw.
Man kann auch Groeßen ueberspringen, indem man ein leeres Array angibt. 
 
Beispiel:
var elemente = [['Elementgroeße0', 'Elementgroeße0'], ['Elementgroeße1'], 'Elementgroeße2'];
var config = [parentBlock, width, height, border, maxBreite, responsiveBoolean];
var fixed = [2];
gallery(elemente, config, fixed);

