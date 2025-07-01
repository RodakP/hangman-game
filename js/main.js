const board = document.querySelector(".board");
const alphabet = document.querySelector(".alphabet");

// Part of the words

const words = [
  "Bez pracy nie ma kołaczy",
  "Apetyt rośnie w miarę jedzenia",
  "Co dwie głowy to nie jedna",
  "Lepszy wróbel w garści niż gołąb na dachu",
  "Nie chwal dnia przed zachodem słońca",
  "Mądry Polak po szkodzie",
  "Gdzie kucharek sześć tam nie ma co jeść",
  "Darowanemu koniowi w zęby się nie zagląda",
  "Nie wszystko złoto co się świeci",
  "Co ma wisieć nie utonie",
  "Każdy jest kowalem swojego losu",
  "Jak sobie pościelesz tak się wyśpisz",
  "Gdzie drwa rąbią tam wióry lecą",
  "Jedna jaskółka wiosny nie czyni"
];

let word = words[Math.floor(Math.random() * words.length)];
word = word.toUpperCase();
let wordHidden = "";
let wordLength = word.length;
let misses = 0;

// Sounds
const yes = new Audio("yes.wav");
const no = new Audio("no.wav");

for (i = 0; i < wordLength; i++) {
  if (word.charAt(i) == " ") {
    wordHidden = wordHidden + " ";
  } else {
    wordHidden = wordHidden + "-";
  }
}

function writtenWord() {
  board.innerHTML = wordHidden;
}

// Part of the alphabet

const letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function alphabetGeneration() {
  let content = "";

  for (i = 0; i <= 34; i++) {
    let element = "e" + i;
    content =
      content +
      `<div class="letter" id="${element}" onClick="checkLetter(${i})">${letters[i]}</div>`;
    if ((i + 1) % 7 == 0) {
      content = content + `<div style="clear:both;"></div>`;
    }
  }

  alphabet.innerHTML = content;

  writtenWord();
}

// Check letter on click

String.prototype.replaceWord = function (place, sign) {
  if (place > this.length - 1) {
    return this.toString();
  } else {
    return this.substring(0, place) + sign + this.substring(place + 1);
  }
};

function checkLetter(letter) {
  let hit = false;

  for (i = 0; i < wordLength; i++) {
    if (word.charAt(i) == letters[letter]) {
      wordHidden = wordHidden.replaceWord(i, letters[letter]);
      hit = true;
    }
  }

  if (hit == true) {
    yes.play();
    let element = "e" + letter;
    document.getElementById(element).classList.add("hit");
    writtenWord();
  } else {
    no.play();
    let element = "e" + letter;
    document.getElementById(element).classList.add("miss");
    document.getElementById(element).setAttribute("onClick", ";");

    misses++;
    let image = `img/s${misses}.jpg`;
    document.querySelector(
      ".gallows"
    ).innerHTML = `<img src="${image}" alt="" />`;
  }

  // WIN
  if (word == wordHidden) {
    alphabet.innerHTML = `Tak jest! <br /> Podano prawidłowe hasło: <br /> <span class="hit-word">${word}</span> <br /> <br /> <span class="reset" onClick="location.reload()"> JESZCZE RAZ?</span>`;
  }

  //DEFEAT
  if (misses >= 9) {
    alphabet.innerHTML = `Przegrana! <br /> Prawidłowe hasło to: <br /> <span class="miss-word">${word}</span> <br /> <br /> <span class="reset" onClick="location.reload()"> JESZCZE RAZ?</span>`;
  }
}

window.onload = alphabetGeneration;
