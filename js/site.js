function generateSpiralBoardWithCorners(size, objects) {
    // Create an empty 2D array
    const board = Array.from({ length: size }, () => Array(size).fill(null));

    let objIndex = 0; // Start from the first object in the array
    let top = 0, bottom = size - 1;
    let left = 0, right = size - 1;

    // Loop to fill the spiral pattern
    while (top <= bottom && left <= right) {
        // Fill the top row (left to right)
        for (let i = left; i <= right; i++) {
            if (top === 0 && (i === left || i === right)) {
                board[top][i] = "X"; // Top row corners
            } else {
                board[top][i] = objects[objIndex++] || null;
            }
        }
        top++; // Move the top boundary down

        // Fill the right column (top to bottom)
        for (let i = top; i <= bottom; i++) {
            if (i === bottom && right === size - 1) {
                board[i][right] = "X"; // Bottom-right corner
            } else {
                board[i][right] = objects[objIndex++] || null;
            }
        }
        right--; // Move the right boundary left

        // Fill the bottom row (right to left)
        for (let i = right; i >= left; i--) {
            if (bottom === size - 1 && (i === left || i === right)) {
                board[bottom][i] = "X"; // Bottom row corners
            } else {
                board[bottom][i] = objects[objIndex++] || null;
            }
        }
        bottom--; // Move the bottom boundary up

        // Fill the left column (bottom to top)
        for (let i = bottom; i >= top; i--) {
            if (i === top && left === 0) {
                board[i][left] = "X"; // Top-left corner
            } else {
                board[i][left] = objects[objIndex++] || null;
            }
        }
        left++; // Move the left boundary right
    }

    return board;
}

// Example usage
const objects = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, name: `Tile ${i + 1}` }));

// Generate an 8x8 spiral board
const spiralBoard = generateSpiralBoardWithCorners(8, objects);

// Print the board to the console
spiralBoard.forEach(row => console.log(row));
