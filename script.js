var minutes = document.querySelector('#minutes');
var seconds = document.querySelector('#seconds');
var quizRounds = 0;
var quizStart = true;

//fix 10 and lower to 00
// buttons to event listeners to functions which use textContent
//quizstart needs a negative statement to return if met

var btn = document.querySelector('#btn');

document.getElementById("startBtn").addEventListener("click", function startBtnGo() {
    document.getElementById("startBtn").remove();    
    if (quizStart = true) {
        var quizStart = false;
        let minutes = 1; 
        let seconds = 59;
        const myInterval = setInterval(function() {
        document.getElementById("countDown").textContent = minutes + " : " + seconds;  
                seconds--;
                seconds.textContent = seconds;
            if (seconds < 0) {
                minutes--;
                minutes.textContent = minutes;
                seconds = 59;
            }
            if (minutes == -1) {
                clearInterval(myInterval);
                return;  
            }
        }, 1000);
    }
});    
       
/* 
    if (quizRounds == 0) {
    document.getElementById("startBtn").addEventListener("click", function () {
        document.getElementById("quizTitles").textContent = "First Question?";
        quizRounds + 1;
    if (quizRounds = 1)
    document.getElementById("btnAnswer").addEventListener("click", function () {
        document.getElementById("quizTitles").textContent = "Second Question?";
        document.getElementById("btnOne").remove();
        quizRounds + 1;
    if (quizRounds = 3)
    document.getElementById("btnAnswer").addEventListener("click", function() {
        document.getElementById("quizTitles").textContent = "Third Question?";
        document.getElementById("btnTwo").remove();
        quizRounds + 1;
    });});});
}
*/    