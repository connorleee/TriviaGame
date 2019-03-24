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


$(document).ready(function() {

    var gameInfo = [
        q1 = {
            question: "What is the highest point of elevation in all the national parks?",
            correct: "Mt. Mckinley - Denali National Park, Alaska",
            incorrect: [
                "Mt. Rainier - Mount Rainier National Park, Washinton",
                "Longs Peak - Rocky Mountain National Park, Colorado",
                "Half Dome - Yosemite National Park, California"
            ],
            correctExtension: " at 20,302 ft!"
        },

        q2 = {
            question: "Which national park has the longest cave system in the world?",
            correct: "Mammoth Cave National Park, Kentucky",
            incorrect: [
                "Carlsbad Caverns, New Mexico",
                "Wind Cave National Park, South Dakota",
                "Jewel Cave National Monument"
            ],
            correctExtension: " at 3454 mapped miles!"
        },

        q3 = {
            question: "What state is the only state in the country to not have a National Park or Monument?",
            correct: "Delaware",
            incorrect: [
                "Rhode Island",
                "Kansas",
                "Luisiana"
            ],
            correctExtension: ""
        },

        q4 = {
            question: "What national park reaches into three states?",
            correct: "Yellowstone",
            incorrect: [
                "Great Smokey Mountains",
                "Grand Canyon",
                "Death Valley"
            ],
            correctExtension: " which reaches into Wyoming, Montana, and Idaho!"
        },

        q5 = {
            question: "Which is the largest national park?",
            correct: "Wrangell-St. Elias National Park, Alaska",
            incorrect: [
                "Yosemite National Park, California",
                "Haleakala National Park, Hawaii",
                "Yellowstone National Park, Wyoming"
            ],
            correctExtension: " with a whopping 13.2 million acres!"
        },
    ];

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var gameFinished = false;
    var remainingTime = 20;
    
    // Start game when game start screen button is clicked. hide start screen, show question screen
    $("#start").click(function(){
        $("#start-screen").hide();
        $("#question-screen").show();
        
        chooseQuestion();

        // question timer function that runs for 20 seconds, then displays the results page for an incorrect response
        var questionTimeout = setTimeout(function () {
            // display the results page as an incorrect response
            $("#question-screen").hide();
            $("#answer-results").show();
        }, 1000 * 20);
    })

    function chooseQuestion(){
        // Choose random q# from the gameInfo array
        var currentQuestion = gameInfo[Math.floor(Math.random()*gameInfo.length)];
        console.log("Current question: " + currentQuestion);

        $("#question").text(currentQuestion.question);
        $("#answer1").text("testing a1");
        $("#answer2").text("testing a2");
        $("#answer3").text("testing a3");
        $("#answer4").text("testing a4");
    }



    function resetGameplay() {
        $("#start-screen").show();
        remainingTime = 20;

    };

    resetGameplay();
})