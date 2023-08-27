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
const guessedLetters = [];
let remainingGuesses = 8;

///Random word async function//
//calls to the url to get random word. this was a text document, so used .text() at the end of the resonse//
//split method used to split the text content into an array of words//
//math.floor() is used to get the integer part of the number.
//math.random is used to generate random number//
//***I put words.length at the end of the randomWordIndex because I wanted to get a random number between 0 and the length of the array of words.//
//.trim() cuts the whitespace around the beginning and end of a string (spaces, tabs, or newline characters)//
//const word now will be a random word from the array of words//
//placeholder() at the end of the code because you want the black dots to change with the length of the word AFTER the random word has been fetched because the placeholder uses the random word as an argument to create the letters//
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const text = await response.text();
    const wordArray = text.split("\n");
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
  };
//Update Word in Progress function//
//The function placeholder() is creating a placeholder for the word that the player is guessing. The function takes the word as an argument and creates an array of placeholder letters. The placeholder letters are all ● characters. The function then updates the innerText of the wordInProgress element to the placeholder letters.//
//This loop iterates through the word variable and adds the placeholder character ● to the placeholderLetters array for each letter in the word.// 

const placeholder= function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//add placeholder(word) at the bottom of the function because I want to create the placeholder for the word before I do anything else with the function. This ensures that the placeholder is created and displayed correctly, even if the function is called with an invalid argument.//
//For example, if the function is called with an empty string as an argument, the placeholderLetters array will still be created and will have 0 elements. The wordInProgress element will then be updated to show 0 ● characters, which is correct for an empty string.//
//If I did not add placeholder(word) at the bottom of the function, the placeholder would not be created until the for loop is executed. If the for loop is executed with an invalid argument, the placeholderLetters array will not be created and the wordInProgress element will not be updated. This would result in an error.//

getWord();

//*** Button validates that the guess is a letter BEFORE passing it to the make guess funtion******/
//e.preventDefault(), prevents the default action of the button, which is to reload the page.//
//message.innerText is to clear the message displayed to the user//
//console.log- logs the value of the variable guess to the console. This is useful for debugging purposes.//
//The function validateInput checks if the input is a single letter from A-Z. If it is, the function returns the value of the variable guess. Otherwise, the function returns an empty string.//
//checks if the value of the variable greatGuess is not an empty string. If it is not, then the function calls the function makeGuess and passes the value of the variable guess as an argument. The function makeGuess makes a guess of the letter guess and updates the game state accordingly.//
//The seventh line of the function, letterInput.value= "";, clears the value of the input field with the id letterInput. This is so that the user can enter a new guess.//
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
//takes a string as input and validates it to make sure it is a single letter from A-Z./
//if the string that is entered is empty then user gets message, if string entered is more than 1 value, user gets message. if string does not match var accepted letters (A-Z), user gets message//
//return the input ONLY if the string is valid//
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
//makeGuess takes a letter as input and makes a guess of that letter. The function first converts the letter to uppercase, so that it is case-insensitive.//
//The function then checks if the letter has already been guessed. If it has, the function displays a message to the user and does not make a guess. Otherwise, the function adds the letter to the list of guessed letters, updates the display, and calls the function answerWord to check if the word has been guessed correctly.//
const makeGuess = function (guess){
    guess = guess.toUpperCase(guess);
    if (guessedLetters.includes(guess)) {
        message.innerText = "That letter has already been entered. Please try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        displayGuess();
        countGuessesRemaining(guess);
        answerWord(guessedLetters); //The function iterates through the list of guessed letters and checks if each letter is in the correct position in the word. If all of the letters are in the correct position, the function returns true, indicating that the word has been guessed correctly. Otherwise, the function returns false, indicating that the word has not been guessed correctly.//
    }
};

///***Update Display for player guesses******//
///***function updates the HTML of the guessed letter element and emptys the message. Then there is a for...of loop that loops through the guessed letters array and creates a list item for the guessed letters and adds it to the "guessed letters" element */
const displayGuess = function () {
    guessedLettersElement.innerHTML= "";

    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.textContent= letter;
        guessedLettersElement.append(listItem);
    }
};

///////////*********** Update Word in Progress  ************//////
//////**** this is the function for the answer word. This changes the answer to uppercase and splits the word string into an array so that the letter can appear in the guessedLetters array. There is a new emptry array for the correct letters and the game will "push" the correct letters to where the circles are OR it will push the circle if the letter is not correct/ 
// Then the word in progress message is being updated to show the new array "correctWord" as the word in progress message. Calling the winning word function to see if the player has won.*/
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

///////Remaining guesses function//////
////**Remaining guesses function uses the "guess" parameter as a filter to change the winning word to uppercase (java is case sensitive). This way a player can still win whether they click A of a */
const countGuessesRemaining = function (guess) {
  const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
      message.innerText = `Sorry, the word does not include that ${guess}`;
      remainingGuesses -= 1;
    } else {
        message.innerText = `Great job! ${guess} is in the word!`;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Sorry, Game Over. The words was ${word}`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText= `You have 1 guess remaining!`;
    } else {
        remainingGuessesSpan.innerText = `You have ${remainingGuesses} left`;
    }
};

///////********* DID YOU WIN???/ **************////
///*** If "(winning)word-changed to uppercase" is the same as the word in progress, then add the "win" class to the message*/
const winningWord = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

