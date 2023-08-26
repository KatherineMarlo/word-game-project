//***********GLOBAL STYLES****************//
//guesed letters//
const guessedLettersElement = document.querySelector(".guessed-letters");
//Guess button//
const guessLetterButton = document.querySelector(".guess");
//Letter Input//
const letterInput = document.querySelector(".letter");
//Word in progress element//
const wordInProgress = document.querySelector(".word-in-progress");
//Remaining guesses//
const remainingGuessesElement = document.querySelector(".remaining");
//Span in remaining guesses//
const remainingGuessesSpan = document.querySelector(".remaining span");
//Paragraph for guessed letter//
const message = document.querySelector(".message");
//Restart button//
const playAgainButton = document.querySelector(".play-again");
//********starting word for testing*********//
const word = "magnolia";
//********* Empty Array for guessed letters  ***************/
const guessedLetters = [];

//Update Word in Progress function//
const placeholder= function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);
//*** Button validates that the guess is a letter BEFORE passing it to the make guess funtion******/
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    console.log(guess);
    const greatGuess = validateInput(guess);
     if (greatGuess) {
        makeGuess(guess);
     }
    letterInput.value= "";
}); 
////**** Input function ******///
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText= "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter only 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter A-Z.";
    } else {
        return input;
    }
};

////******changes guesses to uppercaseJAVA IS CASE SENSITIVE. Once uppercase function checks if guess (letter) is alreeady in the array. If letter is not in the array function pushes (adds) it to the guessedLetters array ******/
const makeGuess = function (guess){
    guess = guess.toUpperCase(guess);
    if (guessedLetters.includes(guess)) {
        message.innerText = "That letter has already been entered. Please try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        displayGuess();
        answerWord(guessedLetters);
    }
};

///***Update Display for player guesses******//
const displayGuess = function () {
    guessedLettersElement.innerHTML= "";

    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.textContent= letter;
        guessedLettersElement.append(listItem);
    }
};

///////////*********** Update Word in Progress  ************//////

const answerWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const correctWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            correctWord.push(letter.toUpperCase());
        } else {
            correctWord.push("●");
        }
        
    }
    //console.log(correctWord);
    wordInProgress.innerText = correctWord.join("");
    winningWord();
};

///////********* DID YOU WIN???/ **************////
const winningWord = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};