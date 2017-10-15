$(document).ready(function () {

    var startGame;
    var gamePage;
    var gamePageAnswers;
    var timer = 31;
    var questionArray = ["q1", "q2", "q3"];
    var answerArray = [
        ["a1", "b1", "c1", "d1"],
        ["a2", "b2", "c2", "d2"],
        ["a3", "b3", "c3", "d3"]
    ];
    var correctAnswers = ["a1", "c2", "d3"];
    var questionsAnswered = 0;
    var answerSelected;
    var countDown;
    var answersRight = 0;
    var answersWrong = 0;
    var answersNone = 0;
    //created a function that loads a start button dynamically on the DOM.
    function loadGame() {
        startGame = "<button id='start-button'>Start</button>"
        $("#mainContent").append(startGame);
    };
    //Calls the function to load the start button on the DOM.
    loadGame();


    //creates on click function for the start button to load the gamePage and the timer.
    $("#start-button").on("click", function() {

        $("#start-button").hide();

        createGame();

        createTimer();


    });
    //checks to see if answer that is pressed matches the correct answer for the question shown.

    //Creates the question and answers displayed on the DOM based on which question(index) is being asked.
    function createGame() {

        gamePage =
            "<h2 class='questionDisp'>" +
            questionArray[questionsAnswered] +
            "</h2>";
        gamePageAnswers =
            "<h3 class='answerButton'>" +
            answerArray[questionsAnswered][0] +
            "</h3><h3 class='answerButton'>" +
            answerArray[questionsAnswered][1] +
            "</h3><h3 class='answerButton'>" +
            answerArray[questionsAnswered][2] +
            "</h3><h3 class='answerButton'>" +
            answerArray[questionsAnswered][3] +
            "</h3>";

        $("#dispQuestion").html(gamePage);
        $("#dispAnswers").html(gamePageAnswers)
    };
    //creats the timer and writes it to the DOM, also creates a loss if timer reaches 0
    function createTimer() {
        countDown = setInterval(decrement, 1000);

        function decrement() {
            if (timer > 0) {
                timer--;
            }
            if (timer === 0) {
                clearInterval(countDown);
                timeoutLoss();
            }
            $("#countdown").html("Time Remaining: " + timer);
        }
    };
    //creates screen if time runs out before user answers question.
    function timeoutLoss() {

        answersNone++;
        $("countdown").html(" ")

        //had to look how to do this up, but this will display the right answer depending on what question was asked, same as the way the questions are displayed.
        gamePage ="<p class='warning'>Gotta be quicker than that!  The correct answer was: " +
            correctAnswers[questionsAnswered] +
            "</p>";

        $("#warning").html(gamePage);

        console.log(answersNone);
        //this is the wait time inbetween the changing screens!!!!*
        setTimeout(timerInbetween, 5000);
    };
    //THIS IS IMPORTANT!!!
    //this is the timer inbetween the screens showing correct answer, wrong answer, or timeout!!!!!.*
    function timerInbetween() {
        if (questionsAnswered < 3) {
            questionsAnswered++;
            $("#warning").html(" ");
            $("#dispQuestion").html(" ");
            $("#dispAnswers").html(" ");
            createGame();
            timer = 31;
            createTimer();

        } else {
            gameOver();
        }
    };
    //creates screen if answer selected is right.
    function correct() {
        answersRight++;
        gamePage = "<p class='warning'>Correct!!!  The answer was: " + correctAnswers[questionsAnswered] + "</p>";
        $("#warning").html(gamePage);

    };
    //creates screen if answer selected is wrong
    function wrong() {
        answersWrong++;
        gamePage ="<p class='warning'>Bruh...  The correct answer was: " + correctAnswers[questionsAnswered] + "</p>";
        $("#warning").html(gamePage);

    };
    //shows two different gameover screens depending on how many answers you got right or wrong, if answers right is over 5 then show winning screen, if its less than 5 then show losing screen.
    function gameOver() {
        if (answersRight > 5) {
            gamePage = "<p>GG Best Friend!!!</p>" + "<p class = 'correct' >Correct: " + answersRight + "</p>" + "<p class = 'wrong' >Wrong: " + answersWrong + "</p>" +
                "<p class='timeout' >Unanswered: " + answersNone + "</p>";
            $("#mainContent").html(gamePage);
        } else {
            gamePage = "<p>Come On Man!!! Get to know me :D </p>" + "<p class = 'correct' >Correct: " + answersRight + "</p>" + "<p class = 'wrong' >Wrong: " + answersWrong + "</p>" +
                "<p class='timeout' >Unanswered: " + answersNone + "</p>";
            $("#mainContent").html(gamePage);

        }



    }
        $(".answerButton").on("click", function() {
        
        answerSelected = $(this);
        
        if (answerSelected === correctAnswers[questionsAnswered]) {
            clearInterval(countDown);
            correct();
        } else {
            clearInterval();
            wrong();
        }
    });






});