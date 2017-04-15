var inquirer = require("inquirer");
var fs = require("fs");

fs.readFile("clozeCardTextLog.txt", "utf8", function(error, data) {
    var dataArr = data.split(",");
    var flashCardText = [];
    for (var i = 0; i < dataArr.length; i++) {
        flashCardText.push(dataArr[i]);
    }
    fs.readFile("clozeCardClozeLog.txt", "utf8", function(error, data) {
        var dataArr2 = data.split(",");
        var flashCardCloze = [];
        for (var i = 0; i < dataArr2.length; i++) {
            flashCardCloze.push(dataArr2[i]);
        }
        fs.readFile("clozeCardPartialLog.txt", "utf8", function(error, data) {
            var dataArr3 = data.split(",");
            var flashCardPartial = [];
            for (var i = 0; i < dataArr3.length; i++) {
                flashCardPartial.push(dataArr3[i]);
            }
            var score = 0;
            var count = 0;
            var numberOfFlashCards = flashCardText.length - 1;
            var quiz = function() {
                if (count < numberOfFlashCards) {
                    var correct = flashCardCloze[count].toLowerCase();
                    inquirer.prompt([{
                        type: "input",
                        name: "front",
                        message: flashCardPartial[count]
                    }]).then(function(answers) {
                        var response = '"' + answers.front.toLowerCase() + '"';
                        if (response === correct) {
                            console.log("Correct! " + flashCardText[count]);
                            score++;
                        } else {
                            console.log("Sorry, incorrect. " + flashCardText[count]);
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
});
