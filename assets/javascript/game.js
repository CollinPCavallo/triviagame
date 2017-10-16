$(document).ready(function () {

    var startGame;
    var gamePage;
    var gamePageAnswers;
    var timer = 31;
    var questionArray = ["What is My Spirit Animal?", "What Year Was I Born?", "What is my Alcoholic Bevarage of Choice?", "What is the only thing I enjoy doing outside?", "What is my favorite TV show of all time?", "How many Siblings do I have?", "Will this trivia game get me an A+?"];
    var answerArray = [
        ["Dog", "Pickle Rick", "Poop Emoji", "Ron Swanson"],
        ["T.S. 1989", "1776", "1955(In a DeLorean)", "1994"],
        ["Kraken", "Chocolate Milk", "Fireball", "Cosmopolitan"],
        ["Picking on the neighbor kid", "Skipping in a field of Bluebonnets", "Riding A Motorcycle",  "Kicking a can down the street to 'Gary Jules's Mad World'"],
        ["Game Of Thrones", "Downton Abbey", "True Blood", "My Little Pony Friendship Is Magic"],
        ["3 Cousins", "A twin", "A Weird Sister", "A Weird Brother"],
        ["Yes!", "Yes!", "Yes!", "Yes!"]
    ];
    var imgArray = ['<img src="assets/images/picklerick.gif">', "<img src='assets/images/picture1.jpg'>", "<img src='assets/images/couple.png'>", "<img src='assets/images/picture5.jpg'>", "<img src='assets/images/gameofthrones.jpg'>", "<img src='assets/images/picture4.jpg'>", "<img src='assets/images/picture6.jpg'>"]
    var correctAnswers = ["Pickle Rick", "1994", "Kraken", "Riding A Motorcycle", "Game Of Thrones", "A Weird Sister", "Yes!"];
    var questionsAnswered = 0;
    var answerSelected;
    var countDown;
    var answersRight = 0;
    var answersWrong = 0;
    var answersNone = 0;
    var imgDisplay;
    //created a function that loads a start button dynamically on the DOM.
    function loadGame() {
        startGame = "<button style'text-align: center' id='start-button'>Start</button>"
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
        $("#imageDisplay").html(" ")
        setAnswerClick();
    };
    function setAnswerClick() {
                $(".answerButton").on("click", function() {
        
        answerSelected = $(this).text();
        console.log(answerSelected);
        
        if (answerSelected === correctAnswers[questionsAnswered]) {
            clearInterval(countDown);
            correct();
        } else {
            clearInterval();
            wrong();
        }
    });
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
        if (questionsAnswered < 6) {
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
        clearInterval(countDown);
        gamePage = "<p class='warning'>Correct!!!  The answer was: " + correctAnswers[questionsAnswered] + "</p>";
        $("#warning").html(gamePage);
        imgDisplay = imgArray[questionsAnswered];
        $("#imageDisplay").html(imgDisplay);
            $("#dispQuestion").html(" ");
            $("#dispAnswers").html(" ");
            $("#countdown").html(" ");
        setTimeout(timerInbetween, 5000);
    };
    //creates screen if answer selected is wrong
    function wrong() {
        answersWrong++;
        clearInterval(countDown);
        gamePage ="<p class='warning'>Bruh...  The correct answer was: " + correctAnswers[questionsAnswered] + "</p>";
        $("#warning").html(gamePage);
            $("#dispQuestion").html(" ");
            $("#dispAnswers").html(" ");
             $("#countdown").html(" ");
        setTimeout(timerInbetween, 5000);

    };
    //shows two different gameover screens depending on how many answers you got right or wrong, if answers right is over 5 then show winning screen, if its less than 5 then show losing screen.
    function gameOver() {
        if (answersRight >= 4) {
            gamePage = "<p>GG Best Friend!!!</p>" + "<p class = 'correct' >Correct: " + answersRight + "</p>" + "<p class = 'wrong' >Wrong: " + answersWrong + "</p>" +
                "<p class='timeout' >Unanswered: " + answersNone + "</p>" + "<img src='assets/images/bff.png'>";
            $("#mainContent").html(gamePage);
        } else {
            gamePage = "<p>Come On Man!!! Get to know me :D </p>" + "<p class = 'correct' >Correct: " + answersRight + "</p>" + "<p class = 'wrong' >Wrong: " + answersWrong + "</p>" +
                "<p class='timeout' >Unanswered: " + answersNone + "</p>" + "<img src='assets/images/picture3.jpg'>";
            $("#mainContent").html(gamePage);

        }



    }






});