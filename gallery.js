var maxBreite = 16; //Anzahl Felder Breite
//var responsive = false;
var width = 65; //Breite der Elemente inkl. css-border
var height = 50; // Hoehe der Elemente inkl. css-border
var border = 2;






var count = 0; //Versuchscounter
var posx = 0; //Position im Array Laufvariable
var posy = 0; //Position im Array Laufvariable
var breite;
var f;
var xi, yi, x, y;
var elements;

/* Breite überprüfen und ggf. anpassen; */
function responsive() {
    breite = maxBreite;
    if (responsiveBoolean) {
        var maxWidth = $(parentBlock).width();
        while ((breite * width) > maxWidth && breite > 2) {
            breite -= 2;
        }
    }
}

/*Neue Zeile in Raster einfuegen*/
function newLine() {
    var newline = [], i;
    for (i = 0; i < breite; i += 1) {
        newline.push(1);
    }
    f.push(newline);
}

function getElement(x, y) {
    return f[y][x];
}

function isFree(x, y) {
    x = x || 1;
    y = y || 1;
    for (yi = posy; yi < posy + y; yi += 1) {
        if (yi < f.length) {
            for (xi = posx; xi < posx + x; xi += 1) {
                if (getElement(xi, yi) !== 1) {
                    return false;
                }
            }
        } else {
            newLine();
        }
    }
    return true;
}

function setElement(x, y, value, sizex, sizey) {
    sizex = sizex || 1;
    sizey = sizey || 1;
    f[y][x] = value;
    for (yi = y; yi < y + sizey; yi += 1) {
        for (xi = x; xi < x + sizex; xi += 1) {
            if (!(xi == x && yi == y)) {
                f[yi][xi] = 0;
            }
        }
    }
}

function elementSize(groesse) {
    var gx = 1, gy = 1, gi;
    for (gi = 1; gi <= groesse; gi += 1) {
        if (gi % 2 == 1) {
            gx *= 2;
        } else {
            gy *= 2;
        }
    }
    return [gx, gy];
}


function setBlock(groesse, random) {
    random = random || false;
    var arrayPos = 0, content, size;
    while (groesse >= 0) {
        if (elements[groesse].length > 0) {
            size = elementSize(groesse);
            if (isFree(size[0], size[1])) {
                if (random) {
                    arrayPos = Math.round(Math.random() * (elements[groesse].length - 1));
                    content = elements[groesse][arrayPos];
                } else {
                    content = elements[groesse][0];
                }
                setElement(posx, posy, $('<div></div>').attr("class", "size" + groesse).html(content), size[0], size[1]);
                elements[groesse].splice(arrayPos, 1);
                return true;
            }
        }
        groesse -= 1;
    }
    return false;
}

/*Suche naechsten freien Block*/
function nextFreeBlock() {
	while (!isFree(1, 1)) {
		posx += 1;
		if (posx > breite - 1) {
			posx = 0;
			posy += 1;
		}
	}
}


/* Feststehende Elemente setzen */
function setFixed() {
    var fi;
    for (fi = 0; fi < fixed.length; fi += 1) {
        nextFreeBlock();  //naechste frei Stelle im Raster finden
        setBlock(fixed[fi]);
    }
}



/*Startzustand setzen*/
function set() {
    posx = 0; //Position im Array Laufvariable
    posy = 0; //Position im Array Laufvariable
    responsive();
	f = [];
	newLine();
    elements = elemente.map(function (arr) {
        return arr.slice();
    });
	setFixed();
}

function remeaningElements() {
    var remeaning = 0, rei;
    for (rei = 0; rei < elements.length; rei += 1) {
        remeaning += elements[rei].length;
    }
    return remeaning;
}





/* naechsten Block zufaellig auswaehlen, wenn die groesse nicht passt naechst kleineren probieren */
function setRandomBlock() {
    var zufall =  Math.round(Math.random() * (elements.length - 1));
	count = count + 1;
	if (setBlock(zufall, true)) {
		count = 0;
    }
	if (count > 5) {
		set();
	}
}

/* Elemente anordnen */
function sort() {
	while (remeaningElements() > 0) {
		nextFreeBlock();
		setRandomBlock(); //zufaelligen Block setzen

    }
}


/* Ausgabe des Array in Konsole console
   Debug Funktion aus der Entwicklung */
function ausgabe() {
    for (x = 0; x < f.length; x += 1) {
        var output = "";
        for (y = 0; y < breite; y += 1) {
            output = output + f[x][y] + " ";
        }
        console.log(output);
    }
}

/*Ausgabe in HTML-Code*/
function ausgeben() {
    var element, tmp, box;
    var galleryBody =  $('<div></div>').attr('class', 'gallery-body')
                                       .css('width', breite * (width + (border * 2)))
                                       .css('height', f.length * (height + (border * 2))) ;
	$(parentBlock).append(galleryBody); //Gallery Body in DOM einfuegen
	for (y = 0; y < f.length; y += 1) {
		for (x = 0; x < breite; x += 1) {
			element = f[y][x];
			if (element !== 0 && element !== 1) {
				tmp = $('<div></div>').attr("class", "box")
									  .css('left', x * width + (x * border * 2) + "px")
									  .css('top', y * height + (y * border * 2) + "px")
									  .html(element); //neues Element erstellen
				box = $('.gallery-body').append(tmp);//Element einfuegen	
				
			}
		}
	
	}
}


/* Galerie neu anordnen */
function shuffle() {
	$('.gallery-body').css('display', 'none').attr('class', 'gallery-body-old');
	set();
	sort();
	ausgeben();
	$('.gallery-body-old').remove();
}




function gallery(gelemente, gconfig, gfixed){
    elemente = gelemente;
    config = gconfig;
    parentBlock = config[0] || 'body';
    width = config[1] || 100;
    heigth = config[2] || 100;
    border = config[3] || 0;
    maxBreite = config[4] || 8;
    responsiveBoolean = config[5] || true;
    
    fixed = gfixed || [];
    set();
	sort();
    $(parentBlock).html('');
	ausgeben();

}


/*EventHandler*/
$(window).resize(function checkWindowSize() {
    maxWidth = $(parentBlock).width();
    if ((breite * width) > maxWidth || ((breite + 2) * width) < maxWidth) {
        shuffle();
    }
});

