/**
 * 
 */
let can;
let slider;
let scale = 10;
let songTextInput;
let songLines = [];
let songWords = [];
let words = false;
let showMatrix = false;

function setup() {
	can = createCanvas(windowWidth, windowHeight);
	background(200);
	processSongText()
	noLoop();
}

function draw() {
	words = document.getElementById("wordsRadio").checked;
	scale = document.getElementById("slider").value;
	
	can = createCanvas((songWords.length + 2) * scale, (songWords.length + 2) * scale)
	background(200);
	
	if (showMatrix) {
		if (words) {
			for (let i = 1; i < songWords.length + 1; i++) {
				for (let j = 1; j < songWords.length + 1; j++) {
					if (songWords[i] === songWords[j]) {
						if (i == j) {
							fill(0, 255, 0);
						} else {
							fill(200, 0, 100);
						}
						rect(i * scale, j * scale, scale - 1, scale - 1);
					}
				}
			}
		} else {
			for (let i = 1; i < songLines.length + 1; i++) {
				for (let j = 1; j < songLines.length + 1; j++) {
					if (songLines[i] === songLines[j]) {
						if (i == j) {
							fill(0, 255, 0);
						} else {
							fill(200, 0, 100);
						}
						rect(i * scale, j * scale, scale - 1, scale - 1);

					}
				}
			}
			console.log("ELSE");
		}
	}

}

function myFunction() {
//	loop();
	showMatrix = true;
	processSongText()
	draw();
}

function saveToIMG(){
	saveCanvas(can, 'SongMatrix', 'jpg');
}

function isEmpty(str) {
	return (!str || 0 === str.length || !str.trim());
}

function processSongText() {
	songTextInput = document.getElementById("songText_TextArea").value;
	if (isEmpty(songTextInput)) {
		console.log("Songtext is missing")
		return null;
	} else {
		console.log("Songtext is there")
		songTextInput = songTextInput.trim();
		songTextInput = songTextInput.replace(/,/g, ' ');
		songTextInput = songTextInput.replace(/\(/g, ' ');
		songTextInput = songTextInput.replace(/\)/g, ' ');
		songLines = songTextInput.split(/\r?\n/g)
		var songWordsSplit = songTextInput.split(/\r\n|\r|\n|\s/g)
		let j = 0;
		for (var i = 0; i < songWordsSplit.length; i++) {
			if (!isEmpty(songWordsSplit[i])) {
				songWords[j] = songWordsSplit[i].trim();

				j++;
			}
		}

		// document.getElementById("output").innerHTML = songLines;
		document.getElementById("output").innerHTML = songWords;
	}

}
