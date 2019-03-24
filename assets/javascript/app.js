// 4 HTML pages are needed: 
    // Index with button to start game
    // Gameplay which is where questions are asked and user can select answer
    // Results page which displays results of user's guess (correct or incorrect)
    // Final results page which displays game stats (# correct, # incorrect) and says thanks for playing

// there will be a timer that will timeout the gameplay if depleted
// you will have 10 seconds per question
// There will be an object that is an array with questions and a correct answer property and incorrect answer properties
// A question will randomly be selected from the object and the correct guess will be randomly assigned to button 1-4. incorrect guesses will be randomly assigned to the other buttons
// This question will be removed from the object
// user will click button they think contains the correct answer
// on click:
    // if correct, load results page that says correct! repeats the answer and displays a picture. guessesCorrect++
    // If incorrect, load results page that says incorrect! displays correct answer and displays a picture. guessesIncorrect--
    // After 5 seconds on either screen, reload the first page with another random question from the questions array
// after 5 questions are done, display final results screen
    // show total guessesCorrect, guessesIncorrect
    // Write: thanks for playing!

