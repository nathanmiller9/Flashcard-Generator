var inquirer = require("inquirer");
var fs = require("fs");

fs.readFile("basicCardFrontLog.txt", "utf8", function(error, data) {
    var dataArr = data.split(",");
    var flashCardFront = [];
    for (var i = 0; i < dataArr.length; i++) {
        flashCardFront.push(dataArr[i]);
    }
    fs.readFile("basicCardBackLog.txt", "utf8", function(error, data) {
        var dataArr2 = data.split(",");
        var flashCardBack = [];
        for (var i = 0; i < dataArr2.length; i++) {
            flashCardBack.push(dataArr2[i]);
        }
        var score = 0;
        var count = 0;
        var numberOfFlashCards = flashCardFront.length - 1;
        var quiz = function() {
            if (count < numberOfFlashCards) {
                var correct = flashCardBack[count].toLowerCase();
                inquirer.prompt([{
                    type: "input",
                    name: "front",
                    message: flashCardFront[count]
                }]).then(function(answers) {
                    var response = '"' + answers.front.toLowerCase() + '"';
                    if (response === correct) {
                        console.log("You are correct!");
                        score++;
                    } else {
                        console.log("Sorry, incorrect.");
                    }
                    count++;
                    quiz();
                });
            } else {
                console.log("I hope you enjoyed your quiz!  You got " + score + " out of " + numberOfFlashCards + " correct.");
            }
        }

        quiz();
    });
});
















