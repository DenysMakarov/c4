import {checkForWinner, deepClone, emptyBoard} from "./utils";
import {NUM_COLS, NUM_IN_ROW_WIN, NUM_ROWS} from "./constants";

describe('Game Logic Functions', () => {

    // Test for emptyBoard function
    describe('emptyBoard', () => {
        it('creates an empty board with correct dimensions', () => {
            const board = emptyBoard();
            expect(board.length).toBe(NUM_COLS);
            board.forEach(column => {
                expect(column.length).toBe(NUM_ROWS);
                column.forEach(cell => {
                    expect(cell).toBeNull();
                });
            });
        });
    });

    // Test for deepClone function
    describe('deepClone', () => {
        it('creates a deep clone of a 2D array', () => {
            const original = [[1, 2], [3, 4]];
            const clone = deepClone(original);
            expect(clone).toEqual(original);
            expect(clone).not.toBe(original);
        });

        it('ensures changes to clone do not affect original', () => {
            const original = [[1, 2], [3, 4]];
            const clone = deepClone(original);
            clone[0][0] = 9;
            expect(original[0][0]).not.toEqual(clone[0][0]);
        });
    });

    // Test for checkForWinner function
    describe('checkForWinner', () => {
        const generateBoardWithWinner = (type, player) => {
            const board = emptyBoard();
            for (let i = 0; i < NUM_IN_ROW_WIN; i++) {
                if (type === 'vertical') {
                    board[0][i] = player; // Vertical win in first column
                } else if (type === 'horizontal') {
                    board[i][0] = player; // Horizontal win in first row
                } else if (type === 'diagonal') {
                    board[i][i] = player; // Diagonal win from top left
                }
            }
            return board;
        };

        it('returns null when there is no winner', () => {
            const board = emptyBoard();
            expect(checkForWinner(board)).toBeNull();
        });

        it('detects a vertical win', () => {
            const board = generateBoardWithWinner('vertical', 1);
            expect(checkForWinner(board)).toBe(1);
        });

        it('detects a horizontal win', () => {
            const board = generateBoardWithWinner('horizontal', 2);
            expect(checkForWinner(board)).toBe(2);
        });

        it('detects a diagonal win', () => {
            const board = generateBoardWithWinner('diagonal', 1);
            expect(checkForWinner(board)).toBe(1);
        });

        it('returns "draw" when the board is full and there is no winner', () => {
            const board = emptyBoard().map(row => row.fill(0)); // Filling with a non-winning value
            expect(checkForWinner(board)).toBe("draw");
        });

        it('does not return "draw" when there are empty spaces', () => {
            const board = emptyBoard();
            board[0][0] = 1; // Partially filled board
            expect(checkForWinner(board)).not.toBe("draw");
        });
    });
});
