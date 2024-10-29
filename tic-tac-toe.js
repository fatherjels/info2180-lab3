// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll('#board div'); // Select the squares inside the board
    const newGameButton = document.querySelector('.btn'); // Select the New Game button by class
    let currentPlayer = 'X'; // Keep track of the current player
    const gameState = Array(9).fill(null); // Initialize an empty game state array

    // Add click event listeners to squares
    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            // Check if the square is already occupied
            if (square.classList.contains('X') || square.classList.contains('O')) {
                return; // Do nothing if the square is already filled
            }

            // Update the square with the current player's symbol
            square.textContent = currentPlayer; // Set the inner content to 'X' or 'O'
            square.classList.add(currentPlayer); // Add the class for styling
            gameState[index] = currentPlayer; // Update the game state

            // Switch players
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });
    });

    // Add functionality to the New Game button
    newGameButton.addEventListener('click', () => {
        // Reset game state
        gameState.fill(null); // Reset game state array
        currentPlayer = 'X'; // Reset current player

        squares.forEach(square => {
            square.textContent = ''; // Clear the square content
            square.classList.remove('X', 'O'); // Remove the X and O classes
        });

        // Reset the status message
        const status = document.getElementById('status');
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
    });
});
