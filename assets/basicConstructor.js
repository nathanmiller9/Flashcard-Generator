 // dependency for npm packages
 var inquirer = require("inquirer");
 var fs = require("fs");
 var cardCount = 0;
 var flashCardArray = [];

 // constructor function used to create BasicCard Flashcard object
 function BasicCard(front, back) {
     this.front = front;
     this.back = back;
 };

 // creates the printInfo method and applies it to all programmer objects
 BasicCard.prototype.printInfo = function() {
     console.log("Question: " + this.front + "\nAnswer: " + this.back);
 };

 var askCount = function() {
     inquirer.prompt([{
         name: "count",
         message: "How many flashcards would you like to make?"
     }]).then(function(numberOfCards) {
         // variable to count how many times our questions have been asked
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
             name: "front",
             message: "Please input the question you would like to put on your flashcard."
         }, {
             name: "back",
             message: "Please insert the answer for your question."
         }]).then(function(answers) {
             // initializes the variable newCard to be a BasicCard object which will take
             // in all of the user's answers to the questions above
             var newCard = new BasicCard(
                 answers.front,
                 answers.back);

             flashCardArray.push(newCard);

             var basicCardStringFront = JSON.stringify(newCard["front"]) + ",";
             var basicCardStringBack = JSON.stringify(newCard["back"]) + ",";

             fs.appendFile("basicCardFrontLog.txt", basicCardStringFront, function(err) {
                 if (err) {
                     console.log(err);
                 } else {}
             });
             fs.appendFile("basicCardBackLog.txt", basicCardStringBack, function(err) {
                 if (err) {
                     console.log(err);
                 } else {}
             });

             cardCount--;
             // run the askquestion function again so as to either end the loop or ask the questions again
             askQuestion();
         });

     } else {
         console.log(flashCardArray);
         console.log("All questions asked");
     }
 };

 // call askCount to run the code
 askCount();



