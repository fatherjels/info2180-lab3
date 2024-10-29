// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select all the square elements in the game board
    const squares = document.querySelectorAll('.square');

    // Add the appropriate class to each square using setAttribute
    squares.forEach(square => {
        square.setAttribute('class', 'square'); // Sets the class attribute directly
    });
});
