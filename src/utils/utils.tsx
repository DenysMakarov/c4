import {NUM_COLS, NUM_IN_ROW_WIN, NUM_ROWS} from "./constants";

const emptyBoard = () => Array(NUM_COLS).fill(null).map(() => Array(NUM_ROWS).fill(null));

const deepClone = (arr: number[][]) => JSON.parse(JSON.stringify(arr));
const checkForWinner = (board: number[][]) => {
    const checkVerticalWinner = (board: number[][]) => {
        for (let x = 0; x < board.length; x++) {
            let maxNumInRow = 1;
            let lastToken = board[x][0];
            for (let y = 1; y < board[x].length; y++) {
                const currentToken = board[x][y];
                if (currentToken === lastToken && currentToken !== null) {
                    maxNumInRow++;
                    if (maxNumInRow === NUM_IN_ROW_WIN) {
                        return currentToken;
                    }
                } else {
                    maxNumInRow = 1;
                }
                lastToken = currentToken;
            }
        }

        return null;
    };

    const checkHorizontalWinner = (board: number[][]) => {
        for (let y = 0; y < board[0].length; y++) {
            let maxNumInRow = 1;
            let lastToken = board[0][y];
            for (let x = 1; x < board.length; x++) {
                const currentToken = board[x][y];
                if (currentToken === lastToken && currentToken !== null) {
                    maxNumInRow++;
                    if (maxNumInRow === NUM_IN_ROW_WIN) {
                        return currentToken;
                    }
                } else {
                    maxNumInRow = 1;
                }
                lastToken = currentToken;
            }
        }

        return null;
    };

    const checkDiagonalWinner = (board: number[][]) => {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                const currentToken = board[x][y];

                if (
                    currentToken !== null &&
                    ((x < board.length - 3 &&
                            y < board[x].length - 3 &&
                            currentToken === board[x + 1][y + 1] &&
                            currentToken === board[x + 2][y + 2] &&
                            currentToken === board[x + 3][y + 3]) ||
                        (x >= 3 &&
                            currentToken === board[x - 1][y + 1] &&
                            currentToken === board[x - 2][y + 2] &&
                            currentToken === board[x - 3][y + 3]))
                ) {
                    return currentToken;
                }
            }
        }

        return null;
    };

    let hasEmptySpace = false;
    board.forEach((row) => (hasEmptySpace = hasEmptySpace || row.findIndex((cell) => cell === null) >= 0));
    if (!hasEmptySpace) {
        return "draw";
    }
    return checkVerticalWinner(board) || checkHorizontalWinner(board) || checkDiagonalWinner(board);
}

export {
    emptyBoard,
    deepClone,
    checkForWinner
}
