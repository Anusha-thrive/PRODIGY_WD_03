document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const gameModeSelect = document.getElementById('gameMode');

    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let currentGameMode = 'player'; // Default game mode

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cellIndex = parseInt(e.target.getAttribute('data-index'));
        if (boardState[cellIndex] === '' && gameActive) {
            boardState[cellIndex] = currentPlayer;
            e.target.textContent = currentPlayer;
            moves++;

            if (checkWin()) {
                endGame(`Player ${currentPlayer} wins!`);
            } else if (moves === 9) {
                endGame("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;

                if (currentGameMode === 'computer' && currentPlayer === 'O') {
                    setTimeout(computerMove, 1000); // Simulate computer delay
                }
            }
        }
    };

    const checkWin = () => {
        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    };

    const endGame = (result) => {
        message.textContent = result;
        gameActive = false;
        strikeWinner();
        removeCellListeners(); // Remove cell click listeners when game ends
    };

    const strikeWinner = () => {
        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                cells[a].style.textDecoration = 'line-through';
                cells[b].style.textDecoration = 'line-through';
                cells[c].style.textDecoration = 'line-through';
                break;
            }
        }
    };

    const handleReset = () => {
        currentPlayer = 'X';
        gameActive = true;
        moves = 0;
        boardState = ['', '', '', '', '', '', '', '', ''];
        message.textContent = `Player ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.textDecoration = 'none';
        });

        if (currentGameMode === 'computer' && currentPlayer === 'O') {
            setTimeout(computerMove, 1000); // Start game with computer move
        }

        // Add back cell click listeners after reset
        addCellListeners();
    };

    const computerMove = () => {
        // Basic computer move logic for demonstration
        let emptyCells = [];
        boardState.forEach((cell, index) => {
            if (cell === '') {
                emptyCells.push(index);
            }
        });
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const moveIndex = emptyCells[randomIndex];

        boardState[moveIndex] = 'O';
        cells[moveIndex].textContent = 'O';
        moves++;

        if (checkWin()) {
            endGame('Computer wins!');
        } else if (moves === 9) {
            endGame("It's a draw!");
        } else {
            currentPlayer = 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const addCellListeners = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
    };

    const removeCellListeners = () => {
        cells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    };

    gameModeSelect.addEventListener('change', () => {
        currentGameMode = gameModeSelect.value;
        handleReset(); // Reset the game when changing modes
    });

    // Initial setup
    addCellListeners();
});

// Assuming you have a function to initialize the game board called initializeBoard()

// Select the reset button
const resetButton = document.getElementById('reset-button');

// Add click event listener to the reset button
resetButton.addEventListener('click', function() {
    // Call a function to reset the game board
    initializeBoard(); // Replace with your function to reset the board
});

// Example function to reset the board (replace with your actual reset function)
function initializeBoard() {
    // Reset the game board logic here
    // For example, clear all cells or reset game state variables
    // Example:
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
        // Reset any other game state variables as needed
    });
}
