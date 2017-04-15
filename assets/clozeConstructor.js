 // dependency for npm packages
 var inquirer = require("inquirer");
 var fs = require("fs");
 var cardCount = 0;
 var flashCardArray = [];

 // constructor function used to create ClozeCard object
 function ClozeCard(text, cloze) {
     this.text = text;
     this.cloze = cloze;
     this.partial = text.replace(cloze, "...");
 };

 // creates the printInfo method and applies it to all ClozeCard objects
 ClozeCard.prototype.printInfo = function() {
     console.log("Full Text: " + this.text + "\nAnswer: " + this.cloze + "\nPartial Text: " + this.partial);
 };

 var askCount = function() {
     inquirer.prompt([{
         name: "count",
         message: "How many flashcards would you like to make?"
     }]).then(function(numberOfCards) {
         // variable used to count how many times our questions have been asked
         var count = numberOfCards.count;
         cardCount += count;
         askQuestion();
     });
 }

 var askQuestion = function() {
     // if statement to ensure that our questions are only asked five times
     if (cardCount > 0) {
         // runs inquirer and asks the user a series of questions whose replies are
         // stored within the variable answers inside of the .then statement
         inquirer.prompt([{
             name: "text",
             message: "Please input the full text of your flashcard."
         }, {
             name: "cloze",
             message: "Please type the text (the answer) that you would like to remove from the full text in order to test yourself."
         }]).then(function(answers) {
             // initializes the variable newguy to be a programmer object which will take
             // in all of the user's answers to the questions above

             var newCard = new ClozeCard(
                 answers.text,
                 answers.cloze,
                 answers.partial);

             flashCardArray.push(newCard);

             var clozeCardStringText = JSON.stringify(newCard["text"]) + ",";
             var clozeCardStringCloze = JSON.stringify(newCard["cloze"]) + ",";
             var clozeCardStringPartial = JSON.stringify(newCard["partial"]) + ",";

             fs.appendFile("clozeCardTextLog.txt", clozeCardStringText, function(err) {
                 if (err) {
                     console.log(err);
                 } else {}
             });
             fs.appendFile("clozeCardClozeLog.txt", clozeCardStringCloze, function(err) {
                 if (err) {
                     console.log(err);
                 } else {}
             });
             fs.appendFile("clozeCardPartialLog.txt", clozeCardStringPartial, function(err) {
                 if (err) {
                     console.log(err);
                 } else {}
             });
             cardCount--;
             askQuestion();
         });
         // else statement which prints "all questions asked" to the console
     } else {
         console.log(flashCardArray);
         console.log("All questions asked");
     }
 };

 // call askCount to run code
 askCount();
