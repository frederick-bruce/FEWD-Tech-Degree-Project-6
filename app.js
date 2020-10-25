// Declare Variables (Global)

const phraseUL = document.querySelector("#phrase").firstElementChild;
const keyBoard = document.querySelector("#qwerty");
const resetBtn = document.querySelector(".btn__reset");
const subTitle = document.querySelector(".subTitle");
const scoreboard = document.querySelector("#scoreboard");
const hearts = document.querySelectorAll(".tries");
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
function getRandomPhraseAsArray ( arr ) {
  let randomPhrase =arr[ Math.floor(Math.random() * arr.length ) ];
  let phraseArray = randomPhrase.split("");
  return phraseArray;
} 

// Loops through an array of characters and appends them to the #phrase ul as list items
function addPhraseToDisplay( arr ) {
  for ( let i = 0; i < arr.length; i++) {
    const listItem = document.createElement("li");
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
      overlay.className = "win";
      overlay.style.display = "flex";
      subTitle.textContent = "Congratulations! You Win!";
      scoreboard.style.display = "none";
      resetBtn.textContent = "Try Again";
    }, 750);
  } else if ( missed >= 5 ) {
    setTimeout( () => {
      overlay.className = "lose";
      overlay.style.display = "flex";
      subTitle.textContent = "You have lost! Please try again.";
      scoreboard.style.display = "none";
      resetBtn.textContent = "Please Try Again";
    }, 500);
  }
}

// resets hearts

function resetHearts() {
  missed = 0;
  for ( let i = 0; i < hearts.length; i++ ) {
    hearts[i].style.opacity = "1";
    scoreboard.style.display = "";
  }
} 




// resets keyboard
function resetKeyboard() {
  const chosen = document.querySelectorAll(".chosen");
  for ( let i = 0; i < chosen.length; i++ ) {
    chosen[i].className = "";
    chosen[i].disabled = false;
    chosen[i].style.backgroundColor = "";
  }
}

// resets random phrase
function resetPhrase() {
    phraseUL.innerHTML = '';
    // adds the letters of the phrase to the display
    addPhraseToDisplay( getRandomPhraseAsArray( phrases ) )
}

// resets the game
function resetGame() {
    resetKeyboard();
    resetHearts();
    resetPhrase();
    overlay.style.display = 'none';
    overlay.className = 'start'
}




// Listen for the start / reset game button to be pressed
resetBtn.addEventListener( "click", (e) => {
  e.preventDefault();
  setTimeout(  () => {
    resetGame();
  }, 250)
});


// Listen for the on screen keyboard buttons to be clicked
keyBoard.addEventListener( 'click', (e) => {
    const letterBtn = event.target;
    if ( letterBtn.tagName === 'BUTTON' && letterBtn.className !== 'chosen' ) {
        letterBtn.className += ' chosen';
        letterBtn.disabled = true;
    }

    // matches letter to keyboard button pressed
    const letterFound = checkLetter(letterBtn);

    // keeps track of tries remaining
    if ( !letterFound && letterBtn.tagName === 'BUTTON' ) {
        missed++;
        hearts[missed - 1].style.opacity = '0.25';
        letterBtn.style.backgroundColor = '#D98F45';
    }
    
    checkWin();
});