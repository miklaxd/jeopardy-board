// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

const players = ['Player 1', 'Player 2'];
let currentPlayerIndex = 0;
let scores = [0, 0];

function startRound() {
    const notification = document.getElementById('notification');
    notification.textContent = `${players[currentPlayerIndex]}'s turn to choose.`;

    disableButtons();

    generateBoard();
}

function disableButtons() {
    document.getElementById('guess-button').disabled = true;
    document.getElementById('pass-button').disabled = true;
    document.getElementById('round2-button').disabled = true;
}

function generateBoard() {
    // This is a placeholder for generating the game board
    // You might create HTML elements representing the question cards and attach click event handlers
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear previous content

    // Example: Creating a simple 3x3 board with question cards
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.textContent = `Category ${i + 1}, Question ${j + 1}`;
            card.addEventListener('click', () => onCardClick(i, j));
            gameContainer.appendChild(card);
        }
    }
}

function onCardClick(categoryIndex, questionIndex) {
    console.log(`Selected question: Category ${categoryIndex + 1}, Question ${questionIndex + 1}`);
    enableSubmitAndPassButtons(); // Enable "Submit Answer" and "Pass Question" buttons
}

function enableSubmitAndPassButtons() {
    document.getElementById('submit-button').disabled = false;
    document.getElementById('pass-button').disabled = false;
}

function disableButtonsExcept(buttonIdsToEnable) {
    const allButtonIds = ['guess-button', 'pass-button', 'round2-button', 'submit-button'];
    
    allButtonIds.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.disabled = !buttonIdsToEnable.includes(buttonId);
    });
}


function selectQuestion(categoryIndex, questionIndex) {
    // Assuming you have a data structure to store the game state and questions
    const question = getQuestion(categoryIndex, questionIndex);

    // Replace the score on the card with the question
    const card = document.getElementById(`card-${categoryIndex}-${questionIndex}`);
    card.textContent = question;

    document.getElementById('submit-button').disabled = false;
    document.getElementById('pass-button').disabled = false;
    disableButtonsExcept(['card', 'submit-button', 'pass-button']);
}

function disableButtonsExcept(buttonIdsToEnable) {
    const allButtonIds = ['guess-button', 'pass-button', 'round2-button', 'submit-button'];
    
    allButtonIds.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.disabled = !buttonIdsToEnable.includes(buttonId);
    });
}

function getQuestion(categoryIndex, questionIndex) {
    const question = placeholderQuestions[categoryIndex][questionIndex];
    // Replace the score on the card with the question
    const card = document.getElementById(`card-${categoryIndex}-${questionIndex}`);
    card.textContent = question;

    // Enable the "Submit Answer" button
    document.getElementById('submit-button').disabled = false;

    // Enable the "Pass Question" button
    document.getElementById('pass-button').disabled = false;

    // Disable other buttons or implement logic as needed
    disableButtonsExcept(['card', 'submit-button', 'pass-button']);
    return `Question for Category ${categoryIndex + 1}, Question ${questionIndex + 1}`;
}

function passQuestion() {
    // Assuming you have a data structure to store the game state and questions
    const currentCategoryIndex = getCurrentCategoryIndex();
    const currentQuestionIndex = getCurrentQuestionIndex();

    // Remove the question from the board
    const card = document.getElementById(`card-${currentCategoryIndex}-${currentQuestionIndex}`);
    card.textContent = '';

    // Enable buttons for the next player's turn
    enableButtonsForNextPlayer();

    // Update notification area
    const notification = document.getElementById('notification');
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    notification.textContent = `${players[currentPlayerIndex]}'s turn to choose.`;
}

function getCurrentCategoryIndex() {
    // Replace this with your actual logic to get the current category index
    // For example, you might have a variable storing the current category index
    return 0; // Replace with your logic
}

function getCurrentQuestionIndex() {
    // Replace this with your actual logic to get the current question index
    // For example, you might have a variable storing the current question index
    return 0; // Replace with your logic
}

function enableButtonsForNextPlayer() {
    document.getElementById('guess-button').disabled = true;
    document.getElementById('pass-button').disabled = true;
    document.getElementById('round2-button').disabled = true;
}


function answerQuestionCorrect() {
    const currentCategoryIndex = getCurrentCategoryIndex();
    const currentQuestionIndex = getCurrentQuestionIndex();

    // Assuming you have a data structure to store the game state and questions
    const question = getQuestion(currentCategoryIndex, currentQuestionIndex);
    const pointValue = calculatePointValue(currentCategoryIndex, currentQuestionIndex);

    // Award points to the current player
    scores[currentPlayerIndex] += pointValue;

    // Blank out the card on the board
    const card = document.getElementById(`card-${currentCategoryIndex}-${currentQuestionIndex}`);
    card.textContent = '';

    updateScoreDisplay();

    checkRoundEnd();
}

function calculatePointValue(categoryIndex, questionIndex) {
    // Replace this with your logic to calculate the point value based on the category and question
    // For example, you might have a 2D array representing point values for each question
    return (categoryIndex + 1) * 1000; // Replace with your logic
}

function updateScoreDisplay() {
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');

    player1ScoreDisplay.textContent = `Score: ${scores[0]}`;
    player2ScoreDisplay.textContent = `Score: ${scores[1]}`;
}

function checkRoundEnd() {
    // Replace this with your logic to check if the round should end
    // For example, check if one player's score reaches a certain threshold or if the board is cleared
    if (scores[currentPlayerIndex] >= 15000) {
        alert('Round 1 ends! Move on to Round 2.');
        enableRound2Button();
    } else {
        // Continue the game, perhaps by enabling the "Round 2" button
        enableRound2Button();
    }
}

function enableRound2Button() {
    document.getElementById('round2-button').disabled = false;
}


function endRound() {
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');

    // Display each player's current score on the page
    player1ScoreDisplay.textContent = `Score: ${scores[0]}`;
    player2ScoreDisplay.textContent = `Score: ${scores[1]}`;

    // Check if the score of one user reaches 15,000 points or if the board has been cleared
    if (scores[0] >= 15000 || scores[1] >= 15000 || isBoardCleared()) {
        // Alert the players to move on to Round 2
        alert('Round 1 ends! Move on to Round 2.');

        document.getElementById('round2-button').disabled = false;
    }
}

function startFinalRound() {
    // Assuming you have a data structure to store the game state and questions
    const finalRoundCategory = getFinalRoundCategory();

    // Display the final round category on the page
    const finalRoundCategoryDisplay = document.getElementById('final-round-category');
    finalRoundCategoryDisplay.textContent = `Final Round Category: ${finalRoundCategory}`;

    const playerWagers = promptPlayerWagers();

    // Store player wagers in a data structure if needed
    // For simplicity, let's assume you have an array to store the wagers
    const playerWagersArray = Array.from(playerWagers);

    const submitWagersButton = document.getElementById('submit-wagers-button');
    submitWagersButton.addEventListener('click', () => onWagersSubmitted(playerWagersArray));
}

function getFinalRoundCategory() {
    // Replace this with your logic to get the final round category
    // For example, you might have an array of possible categories, and you randomly select one
    const categories = ['Category A', 'Category B', 'Category C'];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
}

function promptPlayerWagers() {
    // Replace this with your logic to prompt players for their wagers
    // For simplicity, let's assume you prompt each player for their wager using the prompt function
    const player1Wager = parseInt(prompt(`${players[0]}, enter your wager (up to your maximum point total):`), 10);
    const player2Wager = parseInt(prompt(`${players[1]}, enter your wager (up to your maximum point total):`), 10);

    return [player1Wager, player2Wager];
}

function onWagersSubmitted(playerWagers) {
    // Handle logic when players submit their wagers
    // For simplicity, let's assume you just display an alert with the wagers
    alert(`${players[0]} wagered ${playerWagers[0]} points.\n${players[1]} wagered ${playerWagers[1]} points.`);

    revealFinalQuestion();
}


function revealFinalQuestion() {
    // Assuming you have a data structure to store the game state and questions
    const finalRoundCategory = getFinalRoundCategory();
    const finalQuestion = getFinalQuestion(finalRoundCategory);

    const finalQuestionDisplay = document.getElementById('final-question');
    finalQuestionDisplay.textContent = `Final Question (${finalRoundCategory}): ${finalQuestion}`;

    enableFinalAnswerInputs();

    const submitFinalAnswersButton = document.getElementById('submit-final-answers-button');
    submitFinalAnswersButton.addEventListener('click', () => onFinalAnswersSubmitted());
}

function getFinalQuestion(category) {
    // Replace this with your logic to get the final question based on the category
    // For example, you might have a function that retrieves a question for the specified category
    const finalQuestion = "What is the meaning of life?";
    return finalQuestion;
}

function enableFinalAnswerInputs() {
    const player1AnswerInput = document.getElementById('player1-final-answer');
    const player2AnswerInput = document.getElementById('player2-final-answer');

    player1AnswerInput.disabled = false;
    player2AnswerInput.disabled = false;
}

function onFinalAnswersSubmitted() {
    // Handle logic when players submit their final answers
    // For simplicity, let's assume you just display an alert with the final answers
    const player1Answer = document.getElementById('player1-final-answer').value;
    const player2Answer = document.getElementById('player2-final-answer').value;

    alert(`${players[0]}'s final answer: ${player1Answer}\n${players[1]}'s final answer: ${player2Answer}`);

    determineWinner();
}


function endGame() {
    // Assuming you have a data structure to store the game state and questions
    const player1FinalAnswer = document.getElementById('player1-final-answer').value;
    const player2FinalAnswer = document.getElementById('player2-final-answer').value;

    // Calculate the final scores based on the wagers and correctness of final answers
    const player1Wager = parseInt(prompt(`${players[0]}, enter your wager (up to your maximum point total):`), 10);
    const player2Wager = parseInt(prompt(`${players[1]}, enter your wager (up to your maximum point total):`), 10);

    const player1ScoreAfterWager = calculateFinalScore(scores[0], player1Wager, player1FinalAnswer);
    const player2ScoreAfterWager = calculateFinalScore(scores[1], player2Wager, player2FinalAnswer);

    determineWinner(player1ScoreAfterWager, player2ScoreAfterWager);
}

function calculateFinalScore(initialScore, wager, finalAnswer) {
    // Replace this with your logic to calculate the final score based on the wager and correctness of final answer
    // For simplicity, let's assume the correctness of the final answer affects the score
    const correctnessFactor = finalAnswer.toLowerCase() === "the meaning of life" ? 2 : 1;
    return initialScore + (wager * correctnessFactor);
}

function determineWinner(player1Score, player2Score) {
    let winner;

    if (player1Score > player2Score) {
        winner = players[0];
    } else if (player2Score > player1Score) {
        winner = players[1];
    } else {
        winner = "It's a tie!";
    }

    alert(`Game Over!\n${winner} wins with a final score of ${Math.max(player1Score, player2Score)}.`);
}


startRound();
