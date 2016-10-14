var wordList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
// var wordList = ['Farfetch\'d']
var word = [];
var guessed = [];
var charPressed = [];
var turnsLeft = 8;
var won = false;
var lost = false;

generateWord();

function generateWord() {
  word = wordList[Math.floor(Math.random() * wordList.length )].toUpperCase().split("");
  printWord();
}

function initialise() {
  removeElements('word','div');
  generateWord();
  document.getElementById('turnsleft').getElementsByTagName('span')[0].innerHTML = 'XXXXXXXX';
  guessed = [];
  removeElements('lettersguessed','div');
  charPressed = [];
  turnsLeft = 8;
  document.getElementsByTagName('p')[0].style.display = 'none';
  removeElements('win','div');
  won = false;
  lost = false;
}

function removeElements(parentId, child) {
  var elements = document.getElementById(parentId).getElementsByTagName(child);
  while (elements.length > 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }
  }
}

function printWord() {
  for (var i = 0; i < word.length; i++) {
    var letter = document.createElement("div");
    letter.innerHTML = "_";
    document.getElementById('word').appendChild(letter);
  }
}

var body = document.querySelector('body');

// On key press, perform this function
body.onkeydown = function (e) {
  if ( !e.metaKey ) {
    e.preventDefault();
  }
  var music = document.getElementsByTagName("audio")[0];
  if (e.keyCode > 48 && e.keyCode<=57) {
      music.volume = (e.keyCode - 48) / 10;
      music.play();
  }
  else if (e.keyCode === 48 ) {
      music.pause();
      music.currentTime = 0;
  }
  setTimeout(function() {
    var char = String.fromCharCode(e.keyCode);
    if (e.keyCode === 32) {
      initialise();
    }
    else {
      if (e.keyCode === 222) {
        char = "\'";
      }
      console.log(e.keyCode);
      if (!won && turnsLeft > 0 && checkCharIsAlphabet(char) && charNotPressed(char)) {
        if (!checkCharInWord(char, false)) {
          reduceTurnsLeft(char);
        }
        if (!lost) {
          checkWin();
        }
      }
    }
  }, 200);
};

// check if input character is in the word and update the 'guessed' array
function checkCharInWord(char, red) {
  var charInWord = false;
  for (var i = 0; i < word.length; i++) {
    if (char === word[i]) {
      guessed[i] = 1;
      document.getElementById('word').getElementsByTagName('div')[i].innerHTML = word[i];
      if (red) {
        document.getElementById('word').getElementsByTagName('div')[i].style.color = 'red';
      }
      charInWord = true;
    }
  }
  return charInWord;
}

function reduceTurnsLeft(char) {
  turnsLeft--;
  var noOfX = "";
  for (var i = 0; i < turnsLeft; i++) {
    noOfX += "X";
  }
  document.getElementById('turnsleft').getElementsByTagName('span')[0].innerHTML = noOfX;
  if (turnsLeft === 0) {
    lose();
  }
  var letter = document.createElement("div");
  letter.innerHTML = char;
  document.getElementById('lettersguessed').appendChild(letter);
}

// check if the guessed array is complete and returns true when it is, false when it is not
function checkWin() {
  for (var i = 0; i < word.length; i++) {
    if (guessed[i] === undefined) {
      return false;
    }
  }
  win();
  return won = true;
}

//do this when the player wins
function win() {
  var output = document.createElement("div");
  output.innerHTML = "You won!!!";
  document.getElementById('win').appendChild(output);
  document.getElementsByTagName('p')[0].style.display = 'block';
  console.log("hooray you won!");
}

function lose() {
  var output = document.createElement("div");
  output.innerHTML = "You lost...";
  document.getElementById('win').appendChild(output);
  document.getElementsByTagName('p')[0].style.display = 'block';
  console.log("hooray you lost!");

  lost = true;

  for(var i = 65; i <= 90; i++) {
    if (charNotPressed(String.fromCharCode(i))) {
      checkCharInWord(String.fromCharCode(i), true);
    }
  }
  if (charNotPressed("\'")) {
      checkCharInWord("\'", true);
  }
}

// increment keystroke count when an alphabet is pressed
function checkCharIsAlphabet(char) {
  if (char.match(/[A-Z]/g) !== null || char === '\'') {
    return true;
  }
  return false;
}

// check if the key is pressed before and return true is it was not
function charNotPressed(char) {
  for (var i = 0; i <= charPressed.length; i++){
    if (charPressed[i] === char) {
      return false;
    }
  }
  charPressed.push(char);
  return true;
}
