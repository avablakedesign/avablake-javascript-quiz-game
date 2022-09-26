//These are the variables that hook into the html. They look for the id tag.
const startBtn = document.getElementById("startBtn");
const quizNextBtn = document.getElementById("quizNextBtn");
const countDown = document.getElementById("countDown");
const quizContainer = document.getElementById("quizContainer");
const questionText = document.getElementById("questionText");
const quizChoices = document.getElementById("quizChoices");
//These are the variables that hook into the html they look for a class name.
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const questionNumber = document.querySelector(".question-num-value");
const totalQuestions = document.querySelector(".totalQuestions");

var rightWrong = document.querySelector(".rightWrong");
var highScoreNum = document.getElementById("highScoreNum");
var highScoreName = document.getElementById("highScoreName");
//These variables use local storage to get information.
var highScoreNameSaved = JSON.parse(localStorage.getItem("highScoreNameSaved"));
var highScore = JSON.parse(localStorage.getItem("highScore"));
var choices = document.querySelector(".choices");
var gameOver = false;
//This sets the timer and sets up the beginning of the game.
let userCurrentAnswerChoice = "";
let quizTimer = null;
let quizState = {
    isStarted: false,
    questionNum: 0,
    time: {
        seconds: 120
    }
}

//This is an array that has objects with properties, it holds the quiz questions and answers. The correct answer is labled isCorrect.
const quizQuestions = [
    {
        questionText: "How do you write a Javascript function?",
        answerChoices : [
            {
                text: "Using square brackets"
            },
            {
                text: "Using tensors"
            },
            {
                text: "Using the function keyword",
                isCorrect: true
            },
            {
                text: "Using backslashes"
            }
        ]
    },
    {
        questionText: "Which of these is NOT a data type in Javascript",
        answerChoices: [
            {
                text: "String"
            },
            {
                text: "Vector",
                isCorrect: true
            },
            {
                text: "Object"
            },
            {
                text: "Symbol"
            }
        ]
    },
    {
        questionText: "Inside which do we put the Javascript?",
        answerChoices: [
            {
                text: "<scripting>"
            },
            {
                text: "<script>",
                isCorrect: true
            },
            {
                text: "<js>"
            },
            {
                text: "<javascript>"
            }
        ]
    },
    {
        questionText: 'How do you write "Hello World" in an alert box?',
        answerChoices: [
            {
                text: 'alert("Hello World");',
                isCorrect: true
            },
            {
                text: 'alertBox("Hello World");'
            },
            {
                text: 'msgBox("Hello World");'
            },
            {
                text : 'msg("Hello World");'
            }
        ]
    },
    {
        questionText: "How do you write an IF Statement in Javascript?",
        answerChoices: [
            {
                text: "if i = 5"
            },
            {
                text: "if i = 5 then"
            },
            {
                text: "if i == 5 then"
            },
            {
                text: "if (i == 5)",
                isCorrect: true
            }
        ]
    }
]

//This formats the time into minutes and seconds and displays it as such.
const timeFormat = (timeSeconds) => {
    const minutes = Math.floor(timeSeconds /60);
    const seconds = timeSeconds % 60;

    const formatDigits = (num) => {
        return `${num > 09 ? num : `0${num}`}`;
    }
    return `${formatDigits(minutes)}:${formatDigits(seconds)}`;
}

//This is the timer its a function that decrements leading to a gameover. It also uses milliseconds to equal one second.
const createTimer = () => {
    const myInterval = setInterval(function() {
        countDown.textContent = timeFormat(quizState.time.seconds);
            quizState.time.seconds--;
        if (quizState.time.seconds <= -1) {
            clearInterval(myInterval);
            quizState.isStarted = false;
            countDown.textContent = "Times Up";
            gameOverState()
            return;
        }
    }, 1000);

    return myInterval;
}

//This is the gameover state for the time running out. This also sets the highscore into local storage. The name is also saved on cancel prompt.
var gameOverState = () => {
    if(gameOver === true)
        document.getElementById("highScoreNum").textContent = highScore;
        document.querySelector(".rightWrong").textContent = "🕹️ Game Over 🕹️";
        if (highScoreNameSaved = prompt("Game Over. Enter your player name.")){
            highScoreName.textContent = highScoreNameSaved;
            localStorage.setItem("highScoreNameSaved", JSON.stringify(highScoreNameSaved));
            nextBtn.textContent = "Submited Highscore"
            nextBtn.disabled = true;
            if (highScoreNameSaved == null) {  
                highScoreName = highScoreNameSaved;
            }    
        }       
        if(Array.from(quizChoices.children).forEach((choices, i) => {
            choices.disabled = true;
        }));
}

//This is the next button it also leads to a gameover state if you finish the game. This also sets the highscore into local storage. The name is also saved on cancel prompt.
nextBtn.addEventListener("click", () => {
    if(quizState.questionNum === quizQuestions.length -1) {
        rightWrong.textContent = "🕹️ Game Over 🕹️"
        document.getElementById("highScoreNum").textContent = highScore;
        if (highScoreNameSaved = prompt("Game Over. Entered your player name.")){
            highScoreName.textContent = highScoreNameSaved;
            localStorage.setItem("highScoreNameSaved", JSON.stringify(highScoreNameSaved));
            if (highScoreNameSaved == null) {
                highScoreName = highScoreNameSaved;
            }
        }    
//This stops the timer from going into negatives and changes the buttons to disabled at the end of the game. Also changes the nextBtn button name.
    clearInterval(quizTimer);
        if (quizState.time.seconds <= -1)
            quizState.time.seconds = 0;
            nextBtn.textContent = "Submitted Highscore"
            nextBtn.disabled = true;
            if(Array.from(quizChoices.children).forEach((choices, i) => {
                choices.disabled = true;
            }));
        return;
//This undoes disabled buttons so that the game works properly.       
    } else {
        Array.from(quizChoices.children).forEach((choices, i) => {
            choices.disabled = false;
        })        
    }
//This changes the question numbers so it says of how many. It also resets the right/wrong text to blank on clicking next.    
    quizState.questionNum = quizState.questionNum + 1;
        rightWrong.textContent = "";
    renderQuizQuestions()
    Array.from(quizChoices.children).forEach((question, i) => {
        question.textContent = quizQuestions[quizState.questionNum].answerChoices[i].text;
    })
})

//This renders the questions and questions numbers.
const renderQuizQuestions = () => {
    questionText.textContent = quizQuestions[quizState.questionNum].questionText;
    questionNumber.textContent = quizState.questionNum + 1;
    totalQuestions.textContent = quizQuestions.length;
//This adds points if correct and decrements time if wrong. It also makes the buttons clickable.
    Array.from(quizChoices.children).forEach((choices, i) => {
        choices.textContent = quizQuestions[0].answerChoices[i].text;
        choices.addEventListener("click", (e) => {
            if(quizQuestions[0].answerChoices[i].isCorrect) {
                rightWrong.textContent = "😍 Right!";
                document.getElementById("highScoreNum").textContent = highScore += 50;
                localStorage.setItem("highScore", JSON.stringify(highScore));
                choices.disabled = true;
            
        }   else {
                quizState.time = {...quizState.time, seconds: quizState.time.seconds - 10}
                rightWrong.textContent = "❌ Wrong";
            }
        })
    })
}
//This is the start button that begins the timer, renders the questions and stats and then removes itself to have the game work.
startBtn.addEventListener("click", function startBtnGo () {
    if (!quizState.isStarted) {
        quizState.isStarted = true;
        document.getElementById("highScoreName").textContent = highScoreNameSaved;
        document.getElementById("highScoreNum").textContent = highScore;
        quizContainer.style.display = "block";
        questionText.textContent = quizQuestions[0].questionText;

        renderQuizQuestions();

        clearInterval(quizTimer);
        quizTimer = createTimer();
        startBtn.remove();
    }
});


