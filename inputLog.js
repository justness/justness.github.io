var logElements = [];
var logLength = 5;

function updateLog(){
    var userInput = document.getElementById('user-type');
    var currentInput = userInput.value;
    for (var i = logLength - 1; i > 0; i--){
        logElements[i] = logElements[i-1];
    }
    logElements[0] = currentInput;
    userInput.placeholder = "";

    var finalLog = "";
    var numElements = logLength;
    if (logLength > logElements.length) numElements = logElements.length;
    for (var i = numElements - 1; i >= 0; i--){
        if (typeof logElements[i] === 'undefined') continue;
        if (parseResponse(logElements[i])) finalLog = finalLog + "<blue-text style=\"color: #5c80bc\">" + "> " + logElements[i] + "</blue-text>" + "<br />" + parseResponse(logElements[i]) + "<br />";
        else{
            logElements = [];
            finalLog = "";
            userInput.placeholder = "e.g. ness gd";
        }
    }
    var log = document.getElementById("log");
    log.innerHTML = finalLog; 
    userInput.value = "";
    return false; 
}

function parseResponse(input){
    var treatedInput = input.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

    if (treatedInput === "hello" || treatedInput === "hi") return "Greetings.";
    if (treatedInput === "ness gd") 
        return "-->" + "<a href=\"https://justness.itch.io/\" target=\"_blank\" style=\"right:auto; max-width: none;\">" + "Notable Projects" + "</a>" + "<br />" +
            "-->" + "<a href=\"https://docs.google.com/document/d/1Tc76pGzjDuqWGJdIdSkAiP5EtRe_7xKhEeJzHV8dOek/edit?usp=sharing\" target=\"_blank\" style=\"right:auto; max-width: none;\">" + "Sample Project Documentation" + "</a>"
    if (treatedInput === "clear" || treatedInput === "cls") return;
    else return "?";
}