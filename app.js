// Declare Variables (Global)

const phraseUL = document.querySelector("phrase");
const keyBoard = document.querySelector("qwerty");
const resetBtn = document.querySelector("btn_reset");
const subTitle = document.querySelector(".subTitle");
const scoreboard = document.querySelector("#scoreboard");
const hearts = document.querySelectorAll("#scoreboard");
const overlay = document.getElementById("overlay");
let missed = 0;

const phrases = [
  "Javascript",
  "Once upon a time",
  "Video Games",
  "The World We Live In",
  "Programming",
  "Dream Job",
  "Programming"
];


// Functions (Global)

// Randomly chooses phrase from phrases array, returns a new array of characters from tge randomly chosen phrase
function getRandomPhraseArray ( arr ) {
  let randomPhrase =arr[ Math.floor(Math.random() * arr.length ) ];
  let phraseArray = randomPhrase.split("");
  return phraseArray;
} 

// Loops through an array of characters and appends them to the #phrase ul as list items
function addPhraseToDisplay( arr ) {
  for ( let i = 0; i < arr.length; i++) {
    const listItem =document.createElement("li");
    listItem.textContent = arr[i];
    phraseUL.append(listItem);
    // if the list has text content it isit is given the class "letter", if not, it is given the class "space"
    if ( listItem.textContent !== " " ) {
      listItem.className = "letter";
    } else {
      listItem.className = "space";
    }
  
  }

}

// Checks to see if phrase letters match with the keyboard btn clicked
function checkLetter(button) {
  const letter = document.querySelectorAll(".letter")
  let match = null;
  for ( let i = 0; i < letter.length; i++ ) {
    if ( button.textContent === letter[i].textContent.toLowerCase() ) {
      letter[i].className += " show";
      match = letter[i].textContent;
    }
  }
  return match;

}

// checks to see if the game has been won
function checkWin() {
  const letter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  if ( letter.length === show.length ) {
    setTimeout( () => {
      overlay.className ="win";
      overlay.style.display = "flex";
      subTitle.textContent = "Congratulations! You Win!";
      scoreboard.style.display = "none";
      resetBtn.textContent = "Try Again";
    }, 750);
  } else if ( missed >= 5 ) {
    setTimeout( () => {
      overlay.className = "lose";
      overlay.style.display = "flex";
      subTitle.textContent = "Sorry, please try again";
      scoreboard.style.display = "none";
      resetBtn.textContent = "Please Try Again";
    }, 500);
  }
}
