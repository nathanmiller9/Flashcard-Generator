# Flashcard-Generator

## Live Link
- https://github.com/nathanmiller9/Flashcard-Generator

## The user can create their Flashcards on the command line by running the basicConstructor.js and clozeConstructor.js files and responding to the prompts. Once the flashcards have been created, they can be used for study by running basicExecutable.js and/or clozeExecutable.js.

## Requirements
#### Description

- To create the backend for a basic flashcard application using Basic and Cloze-Deleted flashcards. 
- Basic flashcards will have a front and a back with the question on the front and the answer on the back. 
- Cloze-Deleted flashcards will present partial text, the Cloze-Deleted text (or the answer removed from the full text), and the full text when the user requests it. 
- The application will not have a front end, so the only need is to determine an efficient way to store the Cloze-Deleted cards.

## Technologies Used
1. node.js
2. npm packages: inquirer and fs
    - inquirer prompts
    - fs append and read files to create and read from log files
3. constructors
4. recursive loops
5. prototypes
6. javascript

## Code Explanation
This was a fun and very involved challenge.  The first challenge was to figure out how to set up the architecture of the Flashcard Generator.  The way it works is to have a constructor file for each type of flashcard (Basic and Cloze-Deleted).  Inquirer prompt is used to allow the user to create flashcards for each type based on the two arguments that they enter in the respective constructor prompts. The user input is then logged (appended) in text files (two files for Basic flashcards and three files for Cloze-Deleted) using the fs npm package.  Once the flashcards have been created, there are two executable files that can be run (basic and cloze).  Using for loops, fs.readFile is used to pull the information from the log files that were already created to run the quiz. 
