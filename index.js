var playerOneRed = "R";
var playerTwoYellow = "Y";
var currPlayer = playerOneRed;

var gameOver = false;
var board;

// Helps with the board
var rows = 6;
var columns = 7;
var currColumns;

window.onload = function(){
    setGame();
    WebpageReloader();
}

// Creates the tile pieces for rows and columns of connect 4
function setGame() {
    board = [];
    currColumns = [5,5,5,5,5,5,5];

    for (let r = 0; r < rows; r++) {
        let row =[];
        for (let c = 0; c < columns; c++) {
            //js
            row.push(' ');
            
            //html
            // <div id="0-0" class="tile"></div> // Appends the dev that has the ID board
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

// Makes game pieces show up on the board and applies gravity to them
function setPiece() {
    // stops the game if it's already over
    if (gameOver) {
        return;
    }

    // Get the coordinates of the clicked tile
    let coords = this.id.split("-"); //"0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Apply gravity to find available position
    r = currColumns[c];
    if (r < 0) {
        return;
    }

    // Update the board with player piece's
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    // adds class to play at one or two, which between player one or player two
    if (currPlayer == playerOneRed) {
        tile.classList.add("red-piece");
        currPlayer = playerTwoYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerOneRed;
    }

    // apply gravity
    r -= 1; // updating the row height for the column
    currColumns[c] = r; //updating the array

    // Check if the current move resulted in a win
    checkWinner();

    // Play move sound
    let moveSound = document.getElementById("moveSound");
    moveSound.play();

}

// Cheques for possible conditions so the game can end
function checkWinner() {
    // horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') { // checks if the position is not empty
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }        
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }        
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }        
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }        
    }
}

// Display who has won to the user
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerOneRed) {
        winner.innerText = "Red Wins || Yellow Lost";
    } else {
        winner.innerText = "Yellow Wins || Red Lost";
    }
    gameOver = true;
}

// Button for reloading the page
function WebpageReloader() {
    let resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.classList.add("resetButton"); 
    resetButton.addEventListener("click", function() {
        location.reload(); // reload the page
    });
    document.body.appendChild(resetButton); // Makes the button appear
}

