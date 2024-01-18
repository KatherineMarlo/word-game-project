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
let word = "magnolia";
//********* Empty Array for guessed letters  ***************/
let guessedLetters = [];
let remainingGuesses = 8;


const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const text = await response.text();
    const wordArray = text.split("\n");
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
};

getWord();


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const greatGuess = validateInput(guess);
    if (greatGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter only 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter A-Z.";
    } else {
        return input;
    }
};


const makeGuess = function (guess) {
    guess = guess.toUpperCase(guess);
    if (guessedLetters.includes(guess)) {
        message.innerText = "That letter has already been entered. Please try again";
    } else {
        guessedLetters.push(guess);
        displayGuess();
        countGuessesRemaining(guess);
        answerWord(guessedLetters); //The function iterates through the list of guessed letters and checks if each letter is in the correct position in the word. If all of the letters are in the correct position, the function returns true, indicating that the word has been guessed correctly. Otherwise, the function returns false, indicating that the word has not been guessed correctly.//
    }
};

///***Update Display for player guesses******//

const displayGuess = function () {
    guessedLettersElement.innerHTML = "";

    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.textContent = letter;
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
    wordInProgress.innerText = correctWord.join("");
    winningWord();
};

///////Remaining guesses function//////

const countGuessesRemaining = function (guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        message.innerText = `Sorry, the word does not include that ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Great job! ${guess} is in the word!`;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Sorry, game over. The word was ${word}`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `You have 1 guess remaining!`;
    } else {
        remainingGuessesSpan.innerText = `You have ${remainingGuesses} left`;
    }
};

///////********* DID YOU WIN???/ **************////

const winningWord = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct! Congrats!</p>`;
        startOver();
    }
};

//////Play again function///////
const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

playAgainButton.addEventListener("click", function () {

    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord();
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});