import { BOARD_CARDS } from './models/models.js';
import { cardMapper } from './utililies.js'


//server
function generateSpiralBoardWithCorners(size, objects) {
    // Create an empty 2D array
    const board = Array.from({ length: size }, () => Array(size).fill(null));

    let objIndex = 0; // Start from the first object in the array
    let objInd = 0
    let top = 0, bottom = size - 1;
    let left = 0, right = size - 1;

    let corners = [ 0, 9, 18, 27] 

    // Loop to fill the spiral pattern
    while (top <= bottom && left <= right) {
        // Fill the top row (left to right)
        for (let i = left; i <= right; i++) {
            if (corners.includes(objInd)) {
                board[top][i] = "X"; // Top row corners
            } else {
                board[top][i] = objects[objIndex++] || null;
                
            }
            objInd++
        }
        top++; // Move the top boundary down

        // Fill the right column (top to bottom)
        for (let i = top; i <= bottom; i++) {
            if (corners.includes(objInd)) {
                board[i][right] = "X"; // Bottom-right corner
            } else {
                board[i][right] = objects[objIndex++] || null;
            }
            objInd++
        }
        right--; // Move the right boundary left

        // Fill the bottom row (right to left)
        for (let i = right; i >= left; i--) {
            if (corners.includes(objInd)) {
                board[bottom][i] = "X"; // Bottom row corners
            } else {
                board[bottom][i] = objects[objIndex++] || null;
            }
            objInd++
        }
        bottom--; // Move the bottom boundary up

        // Fill the left column (bottom to top)
        for (let i = bottom; i >= top; i--) {
            if (corners.includes(objInd)) {
                board[i][left] = "X"; // Top-left corner
            } else {
                board[i][left] = objects[objIndex++] || null;
            }
            objInd++
        }

        left++; // Move the left boundary right
    }

    return board;
}

const spiralBoard = generateSpiralBoardWithCorners(10, BOARD_CARDS);


let game_details = {
    current_player: 'blue',
    gameBoard: spiralBoard,
    players: [],
    won: false
}




// Function to generate UI board
function generateUIBoard(board) {
    const gameBoardElement = document.getElementById("game-board");

    // Clear the board before generating
    gameBoardElement.innerHTML = "";

    // Generate the grid UI
    board.forEach(row => {
        row.forEach(cell => {
            const tileElement = document.createElement("div");
            tileElement.classList.add("tile");

            if (cell === "X") {
                tileElement.classList.add("X");

                // Add an image for the "X" tile
                const imgElement = document.createElement("img");
                imgElement.src = "assets/cards/cardBack.png"; // Update with the path to your image
                imgElement.alt = "X";
                tileElement.appendChild(imgElement);

            } else if (cell) {
                tileElement.classList.add("obj");

                // Add an image for the object tile
                const imgElement = document.createElement("img");
                let filename = cardMapper(cell);

                imgElement.src = `assets/cards/${filename}.png`; // Dynamic path based on the suit/card
                imgElement.alt = `${cell.suit} / ${cell.card}`;
                
                tileElement.setAttribute('cardId', cell.id); 

                tileElement.appendChild(imgElement);


                // Add a click event
                tileElement.onclick = () => clickTile(cell);
            }

            gameBoardElement.appendChild(tileElement);
        });
    });
}

generateUIBoard(spiralBoard);



//ui click handlers
let clickTile = (element) => {

    console.log(element)

    if(element.player == null ) {

        element.player = game_details.current_player
        
        if(game_details.current_player == 'blue'){
            $(`.obj[cardid=${element.id}]`).append(`
                <img src="assets/players/blue-player.png" class="player-piece">    
            `)
            game_details.current_player = 'green'
        } else {
            $(`.obj[cardid=${element.id}]`).append(`
                <img src="assets/players/green-player.png" class="player-piece">    
            `)

             game_details.current_player = 'blue'
        }
       
        console.log(game_details.gameBoard)
    }
}