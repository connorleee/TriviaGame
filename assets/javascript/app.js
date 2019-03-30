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
    $("#play-again").click(function () {
        console.log("resetting gameplay from play-again click")
        resetGameplay();
    });

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
            image: "assets/images/Mckinley.jpg"
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
            image: "assets/images/Mammoth.jpg"
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
            image: "assets/images/Delaware.jpg"
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
            image: "assets/images/Yellowstone.jpg"
        },

        q5 = {
            question: "Which is the largest national park?",
            responses: [
                { text: "Wrangell-St. Elias National Park, Alaska", correct: true },
                { text: "Yosemite National Park, California", correct: false },
                { text: "Haleakala National Park, Hawaii", correct: false },
                { text: "Yellowstone National Park, Wyoming", correct: false }
            ],
            correctExtension: " with a whopping 13.2 million acres!",
            image: "assets/images/Wrangell.jpg"
        },
    ];

    var correctAnswers;
    var incorrectAnswers;
    var unanswered;
    var resultTime = 3;
    var shuffledGameInfo;

    function resetGameplay() {
        $("#start-screen").show();
        $("#answer-results").hide();
        $("#question-screen").hide();
        $("#final-results").hide();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;

        // shuffle the question objects array to determine which question to ask first
        shuffledGameInfo = shuffleArray(gameInfo);
        console.log(shuffledGameInfo);
        console.log("______________");
    };

    // Start game when game start screen button is clicked. hide start screen, show question screen
    $("#start").click(function () {
        // calls last question in shuffled array
        loadQuestion()
    })

    function shuffleArray(a) {
        var j, x, i;
        var b = a.slice();
        for (i = b.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = b[i];
            b[i] = b[j];
            b[j] = x;
        }
        return b;
    }

    // finds the correct answer per question and returns the text associated so we can display it on the results screen
    function filterCorrectAnswer(responsesArray) {
        for (var i = 0; i < responsesArray.length; i++) {
            if (responsesArray[i].correct) {
                return responsesArray[i].text;
            }
        }
    }

    function loadQuestion() {
        // if statement to end game when there are no more objects in the array
        if (shuffledGameInfo.length !== 0) {
            // remove the current question from the array so it can't be chosen again
            q = shuffledGameInfo.pop();

            $("#answer-results").hide();
            $("#start-screen").hide();
            $("#question-screen").show();

            // shuffle the order of responses
            var shuffledResponses = shuffleArray(q.responses);

            // randomly assign answers to the buttons
            $("#question").text(q.question);
            $("#answer1").text(shuffledResponses[0].text);
            $("#answer2").text(shuffledResponses[1].text);
            $("#answer3").text(shuffledResponses[2].text);
            $("#answer4").text(shuffledResponses[3].text);

            // assign corresponding correct:boolean to the shuffled responses
            $("#answer1").attr("value", shuffledResponses[0].correct);
            $("#answer2").attr("value", shuffledResponses[1].correct);
            $("#answer3").attr("value", shuffledResponses[2].correct);
            $("#answer4").attr("value", shuffledResponses[3].correct);

            var remainingTime = 10;
            $("#time-remaining").text(remainingTime);
            var timer = setInterval(function () {
                remainingTime--
                $("#time-remaining").text(remainingTime);
                if (remainingTime === 0) {
                    clearInterval(timer)
                    timeOutResult()
                }
            }, 1000);

            // clear the click functions so they dont double up
            $("#answer1").off();
            $("#answer2").off();
            $("#answer3").off();
            $("#answer4").off();

            // provide logic if a button is clicked... correct or incorrect
            $("#answer1").click(function () {
                clearInterval(timer)
                if ($(this).attr("value") === "true") {
                    correctAnswerResult(q);
                } else {
                    incorrectAnswerResult(q);
                }
            })
            $("#answer2").click(function () {
                clearInterval(timer)
                if ($(this).attr("value") === "true") {
                    correctAnswerResult(q);
                } else {
                    incorrectAnswerResult(q);
                }
            })
            $("#answer3").click(function () {
                clearInterval(timer)
                if ($(this).attr("value") === "true") {
                    correctAnswerResult(q);
                } else {
                    incorrectAnswerResult(q);
                }
            })
            $("#answer4").click(function () {
                clearInterval(timer)
                if ($(this).attr("value") === "true") {
                    correctAnswerResult(q);
                } else {
                    incorrectAnswerResult(q);
                }
            })
        } else {
            clearInterval(timer);
            finalResults();
        }
    }

    function correctAnswerResult(question) {
        // finds the correct answer
        var correctAnswerText = filterCorrectAnswer(question.responses);

        // display the results page as an incorrect response
        $("#question-screen").hide();
        $("#answer-results").show();
        $("#verdict").text("Correct!");

        $("#correct-answer").text(correctAnswerText);
        $("#correct-image").attr("src", question.image)

        correctAnswers++;

        setTimeout(loadQuestion, 1000 * resultTime);
    }

    function incorrectAnswerResult(question) {
        var correctAnswerText = filterCorrectAnswer(question.responses);

        // display the results page as an incorrect response
        $("#question-screen").hide();
        $("#answer-results").show();
        $("#verdict").text("Incorrect!");

        $("#correct-answer").text("The correct answer is: " + correctAnswerText);
        $("#correct-image").attr("src", question.image)

        incorrectAnswers++;

        setTimeout(loadQuestion, 1000 * resultTime);
    }

    // shows the result of the user's guess or if they timed out. 
    function timeOutResult(question) {
        var correctAnswerText = filterCorrectAnswer(question.responses);

        // display the results page as an incorrect response
        $("#question-screen").hide();
        $("#answer-results").show();
        $("#verdict").text("Out of time!");
        
        $("#correct-answer").text("The correct answer is: " + correctAnswerText);
        $("#correct-image").attr("src", question.image)

        unanswered++;

        setTimeout(loadQuestion, 1000 * resultTime);
    }

    function finalResults() {
        $("#answer-results").hide();
        $("#start-screen").hide();
        $("#question-screen").hide();
        $("#final-results").show();

        $("#number-correct").text(correctAnswers);
        $("#number-incorrect").text(incorrectAnswers);
        $("#number-unanswered").text(unanswered);


    }

    resetGameplay();
})