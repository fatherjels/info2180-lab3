// Constants for players
const PLAYER_X = "X";
const PLAYER_O = "O";

// Variables to track the game state
let currentPlayer = PLAYER_X;
let countX = 0;
let countY = 0;
let countXList = [];
let countYList = [];
let gameOver = false;

// Utility function to check if two arrays are equal
const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

// Function to check if the player has won
const checkWinner = (player, playerList) => {
    playerList.sort((a, b) => a - b);
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let win of winCombinations) {
        let matchCount = 0;
        for (let i = 0; i < win.length; i++) {
            if (playerList.includes(win[i])) {
                matchCount++;
            }
            if (matchCount === 3) {
                announceWinner(player);
                return true;
            }
        }
    }
    return false;
};

// Function to announce the winner
const announceWinner = (player) => {
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = `Congratulations! ${player} is the Winner!`;
    statusDiv.classList.add("you-won");
    gameOver = true;
};

// Function to handle the click event on a square
const handleSquareClick = (square, index) => {
    // Check if the game is over or if the square is already filled
    if (gameOver || square.textContent !== "") {
        return; // Do nothing if the game is over or the square is already filled
    }

    if (currentPlayer === PLAYER_X) {
        countXList.push(index);
        square.textContent = PLAYER_X;
        square.classList.add("X");
        countX++;
        if (countX >= 3) {
            if (checkWinner(PLAYER_X, countXList)) {
                return;
            }
        }
        currentPlayer = PLAYER_O;
    } else {
        countYList.push(index);
        square.textContent = PLAYER_O;
        square.classList.add("O");
        countY++;
        if (countY >= 3) {
            if (checkWinner(PLAYER_O, countYList)) {
                return;
            }
        }
        currentPlayer = PLAYER_X;
    }

    // Check for a draw if all squares are filled and there's no winner
    if ((countX + countY) >= 9 && !checkWinner(PLAYER_X, countXList) && !checkWinner(PLAYER_O, countYList)) {
        const statusDiv = document.getElementById("status");
        statusDiv.textContent = "Game ends in a draw!";
        gameOver = true;
    }
};

// Function to handle the hover effect on a square
const handleMouseOver = (square) => {
    if (!gameOver && square.textContent === "") {
        square.classList.add("hover");
    }
};

// Function to remove the hover effect from a square
const handleMouseOut = (square) => {
    square.classList.remove("hover");
};

// Function to reset the game
const resetGame = () => {
    // Select all squares in the board
    const squares = document.getElementById("board").querySelectorAll("div");
    // Loop through each square to reset it
    squares.forEach(square => {
        square.textContent = ""; // Clear the text content of each square
        square.classList.remove("X", "O", "hover"); // Remove any X, O, and hover classes
    });

    // Reset game variables
    countX = 0; // Reset count for player X moves
    countY = 0; // Reset count for player O moves
    countXList = []; // Clear player X's list of moves
    countYList = []; // Clear player O's list of moves
    currentPlayer = PLAYER_X; // Set current player back to X
    gameOver = false; // Set gameOver flag to false

    // Reset the status message
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
    statusDiv.classList.remove("you-won");
};

// Main function to initialize the game
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.getElementById("board").querySelectorAll("div");
    // Add event listeners to each square for click, mouseover, and mouseout events
    squares.forEach((square, index) => {
        square.classList.add("square");
        square.addEventListener("click", () => handleSquareClick(square, index));
        square.addEventListener("mouseover", () => handleMouseOver(square));
        square.addEventListener("mouseout", () => handleMouseOut(square));
    });

    // Add click event listener to the "New Game" button to reset the game
    document.querySelector("button").addEventListener("click", resetGame);
});

