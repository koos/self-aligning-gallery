#Self Aligning Gallery

Self Aligning Gallery ist ein JS-Script zum anordnen von verschieden großen Boxen, so das an der Seite keine Lücken entstehen.

##Nutzung:

####Vorausetzungen
Zur Nutzung der Self Aligning Gallery wird jQuery benötigt.  
Unterstüzte Version: 1.11.1

####Einbindung der Dateien:
CSS und JS Dateien der Galerie liegen im Beispiel im Unterordner sag
```html
<link rel="stylesheet" href="sag/gallery.css" type="text/css">
<script src="sag/gallery.js"></script>
```

####Aufruf der Galerie:
```javascript
var elemente = [['Elementgroeße0', 'Elementgroeße0'], ['Elementgroeße1'], 'Elementgroeße2'];
var config = [parentBlock, width, height, border, maxBreite, responsiveBoolean];
var fixed = [2];
gallery(elemente, config, fixed);
```


###Elementgrößen:
Das kleinste Element entspricht der angegebenen Größe, also width x height,
beim nächst groeßeren Element wird die Breite verdoppelt, also width*2 x height
für das nächste wird dann das vorherige Element in der Höhe verdoppelt, also width*2 x height*2
dann wird wieder die Breite verdoppelt, also width*4 x height*2
usw.
Größen können überspringen, indem man ein leeres Array angibt. 

####CSS:
Die Größen für jede Elementgröße müssen wie folgt im CSS angegeben werden:
```css
.size0{
	width: 10px;
	height: 10px;
}

.size1{
	width: 20px;
	height: 10px;
}
.size2{
	width: 20px;
	height: 20px
}
.
.
.
.size5{
	width: 80px;
	height: 40px;
}
```
