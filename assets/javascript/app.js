// 4 HTML containers are needed: 
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
// if correct, load results code that says correct! repeats the answer and displays a picture. guessesCorrect++
// If incorrect, load results code that says incorrect! displays correct answer and displays a picture. guessesIncorrect--
// After 5 seconds on either screen, reload the game code with another random question from the questions array
// after 5 questions are done, display final results screen
// show total guessesCorrect, guessesIncorrect
// Write: thanks for playing!


$(document).ready(function () {

    var gameInfo = [
        q1 = {
            question: "What is the highest point of elevation in all the national parks?",
            responses: [
                { text: "Mt. Mckinley - Denali National Park, Alaska", correct: true },
                { text: "Mt. Rainier - Mount Rainier National Park, Washinton", correct: false },
                { text: "Longs Peak - Rocky Mountain National Park, Colorado", correct: false },
                { text: "Half Dome - Yosemite National Park, California", correct: false }
            ],
            correctExtension: " at 20,302 ft!",
            image: "../images/Mckinley.jpg"
        },

        q2 = {
            question: "Which national park has the longest cave system in the world?",
            responses: [
                { text: "Mammoth Cave National Park, Kentucky", correct: true },
                { text: "Carlsbad Caverns, New Mexico", correct: false },
                { text: "Wind Cave National Park, South Dakota", correct: false },
                { text: "Jewel Cave National Monument", correct: false }
            ],
            correctExtension: " at 3454 mapped miles!",
            image: "../images/Mammoth.jpg"
        },

        q3 = {
            question: "What state is the only state in the country to not have a National Park or Monument?",
            responses: [
                { text: "Delaware", correct: true },
                { text: "Rhode Island", correct: false },
                { text: "Kansas", correct: false },
                { text: "Luisiana", correct: false }
            ],
            correctExtension: "",
            image: "../images/Delaware.jpg"
        },

        q4 = {
            question: "What national park reaches into three states?",
            responses: [
                { text: "Yellowstone", correct: true },
                { text: "Great Smokey Mountains", correct: false },
                { text: "Grand Canyon", correct: false },
                { text: "Death Valley", correct: false }
            ],
            correctExtension: " which reaches into Wyoming, Montana, and Idaho!",
            image: "../images/Yellowstone.jpg"
        },

        q5 = {
            question: "Which is the largest national park?",
            responses: [
                { text: "Wrangell-St. Elias National Park, Alaska", correct: false },
                { text: "Yosemite National Park, California", correct: false },
                { text: "Haleakala National Park, Hawaii", correct: false },
                { text: "Yellowstone National Park, Wyoming", correct: false }
            ],
            correctExtension: " with a whopping 13.2 million acres!",
            image: "../images/Wrangell.jpg"
        },
    ];

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var gameFinished = false;
    var remainingTime = 10;
    var resultTime = 3;

    // ensures timer doesn't start ticking down faster
    var timeRunning = false;
    // variables to store the interval and timer
    var intervalId;
    var timerId;

    function questionTimer(){
        // question timer function that runs for 20 seconds
        timerId = setTimeout(timeOutResult, 1000 * 10);
    }


    function resetGameplay() {
        $("#start-screen").show();
        $("#answer-results").hide();
        $("#question-screen").hide();
        $("#final-results").hide();

        remainingTime = 10;
        // shuffle the question objects array to determine which question to ask first
        shuffleArray(gameInfo);
        console.log(shuffleArray(gameInfo));
    };

    // Start game when game start screen button is clicked. hide start screen, show question screen
    $("#start").click(function () {
        // create a function that is called on game start. this runs a for loop through the gameInfo array
        // each loop will run the core game logic
        for (let i = 0; i < gameInfo.length; i++) {
            loadQuestion(gameInfo[i]);
        }

        finalResults();
    })

    // TODO: create correct answer result function
    function correctAnswerResult() {
        // display the results page as an incorrect response
        $("#question-screen").hide();
        $("#answer-results").show();
        $("#verdict").text("Correct!");
        // TODO: $("#correct-answer").text(this.correct)
        // TODO: $("#correct-image").attr("src","this.image")

        correctAnswers++

        setTimeout(loadQuestion, 1000 * resultTime);
    }

    // TODO: create incorrect answer result function
    function incorrectAnswerResult() {
        // display the results page as an incorrect response
        $("#question-screen").hide();
        $("#answer-results").show();
        $("#verdict").text("Incorrect!");
        // TODO: $("#correct-answer").text(this.correct)
        // TODO: $("#correct-image").attr("src","this.image")

        incorrectAnswer++

        setTimeout(loadQuestion, 1000 * resultTime);
    }

    // shows the result of the user's guess or if they timed out. 
    function timeOutResult() {
        // display the results page as an incorrect response
        $("#question-screen").hide();
        $("#answer-results").show();
        $("#verdict").text("Out of time!");
        // TODO: $("#correct-answer").text(this.correct)
        // TODO: $("#correct-image").attr("src","this.image")

        unanswered++

        setTimeout(loadQuestion, 1000 * resultTime);
    }

    function countDown() {
        remainingTime--
        $("#time-remaining").text(remainingTime);
    }

    function shuffleArray(a) {
        console.log("shuffle: " + a);
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    function loadQuestion(q) {
        console.log("question: "+ q);
        console.log({q});
        $("#answer-results").hide();
        $("#start-screen").hide();
        $("#question-screen").show();
        remainingTime = 10;
        $("#time-remaining").text(remainingTime);

        // shuffle the order of responses
        console.log("about to shuffle responses: " + q.responses);
        var shuffledResponses = shuffleArray(q.responses);
        console.log("shuffled responses: " + shuffledResponses);

        $("#question").text(q.question);
        $("#answer1").text(q.responses[0].text);
        $("#answer2").text(q.responses[1].text);
        $("#answer3").text(q.responses[2].text);
        $("#answer4").text(q.responses[3].text);

        questionTimer();

        // Counts down
        if (!timeRunning) {
            intervalId = setInterval(countDown, 1000);
            timeRunning = true;
        }

        // TODO: randomly assign answers to the buttons
        // TODO: provide logic if a button is clicked... correct or incorrect
    }

    function finalResults() {
        $("#answer-results").hide();
        $("#start-screen").hide();
        $("#question-screen").hide();
        $("#final-results").show();

        $("#number-correct").text(correctAnswers);
        $("#number-incorrect").text(incorrectAnswers);
        $("#number-unanswered").text(unanswered);

        $("#play-again").click(function () {
            resetGameplay();
        });
    }

    resetGameplay();
})