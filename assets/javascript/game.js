$(document).ready(function () {


    function Question(question,answerA,answerB,answerC,answerD,correct) {
        this.question = question,
        this.answerA = answerA,
        this.answerB = answerB,
        this.answerC = answerC,
        this.answerD = answerD,
        this.correct = correct

        
    };

    var questionsData = [
        ["What is the pro Football team in San Francisco CA? ", "Giants", "49ers", "Raiders", "Warriors","answerB"],
        ["What is the pro Baseball team in San Francisco CA? ", "Giants", "49ers", "Raiders", "Warriors","answerA"],
        ["What is the pro Football team in Phildelphia PA? ", "Eagles", "Patriots", "Redskins", "Giants", "answerA"]
    ]

    var infoBlocks = [];
    var timeRemaining = 3;
    var nextQuestionCounter = 3;
    var correct = 0;
    var incorrect = 0;
    var gameOver = false;
    var currentQuestion = 0;
    var timer = null;
    var intermission = null;

    function gameNew() {
        var correct = 0;
        var incorrect = 0;
        var infoBlock = [];
        var gameOver = false;
        var currentQuestion = 0;
        loadQuestion()
    }

    function loadQuestion(questions) {
        questionsData.forEach(element => {
            var info = element;
            var question = new Question(...info);
            infoBlocks.push(question) 
        
            
        });
        displayQuestion(infoBlocks)
    }


    function clockStart() {
        displayTime();
        if(timeRemaining !==0){
            timeRemaining -=1; 
        }
        else{
            displayAnswer(currentQuestion);
            currentQuestion++;
        }
    }


    function displayTime() {
        $("#countdown").html(timeRemaining)
    }

    function displayQuestion(infoBlocks) {
        nextQuestionCounter = 3
        clockStart()
        timer = setInterval(clockStart, 1000)
        var infoBlock = infoBlocks[currentQuestion]
        $("#questionArea").html(infoBlock.question)
        
        //send question to a function that handles answer button creation
        answerChoices(infoBlock)
    
    }

    function answerChoices(questionData) {

        $("#answersArea").append("<button type='button' class='answerChoice wtf' id='answerA' >" + questionData.answerA + "</button>")
        $("#answersArea").append("<button type='button' class='answerChoice wtf' id='answerB' >" + questionData.answerB + "</button>")
        $("#answersArea").append("<button type='button' class='answerChoice wtf' id='answerC' >" + questionData.answerC + "</button>")
        $("#answersArea").append("<button type='button' class='answerChoice wtf' id='answerD' >" + questionData.answerD + "</button>")
        
    }

    function checkAnswer(answer) {
        // console.log(answer)

        var check = infoBlocks[currentQuestion];
        var guess = answer.target.id
        var truth = check.correct

        if (truth === guess){
            var result = "Correct!"
            displayGuess(result,guess,check,truth);
        }
        else {
            var result = "Better Luck Next Time"
            displayGuess(result,guess,check,truth)
        }
        
    }

    function displayGuess(result, answer, check, truth) {
        $("#countdown").hide()
        currentQuestion++
        if (truth === answer) {
        $("#infoArea").text(result).append(" "+check[answer])
            clearInterval(timer)
            
        }
        else {
            var truth = check.correct
            $("#infoArea").text(result).append("The Correct Answer Was: " + check[truth])
            clearInterval(timer)
        }
    }

    function displayAnswer(currentQuestion) {
        clearInterval(timer)
        console.log(currentQuestion)
        $("#countdown").hide()
        // loadNextQuestion()
        var infoBlock = infoBlocks[currentQuestion]
        console.log(infoBlock.correct)
        var rightAnswer = infoBlock.correct
        $("#infoArea").html("The Correct Answer Was: " + infoBlock[rightAnswer])

    }

    function loadNextQuestion() {
        nextQuestionTimer()
        intermission = setInterval(nextQuestionTimer, 1000)
    } 

    function nextQuestionTimer() {
        if (nextQuestionCounter !== 0) {
            nextQuestionCounter -= 1;
        }
        else {
            clearInterval(intermission);
            displayQuestion(infoBlocks);
        }
    }

    function showTime() {
        
    }

    $("#startButton").click(gameNew);
    $("body").on( "click" , ".answerChoice", checkAnswer);


})