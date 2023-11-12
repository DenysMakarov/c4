// Define types for clarity
type Player = 'Player 1' | 'Player 2' | null;
export type Cell = Player;
export type Board = Cell[][];

interface GameState {
    board: Board;
    currentPlayer: Player;
    winner: Player | 'draw';
}

// Constants
const ROWS = 6;
const COLUMNS = 7;

// Create an empty board
const createEmptyBoard = (): Board => Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));

// Initialize state
export const initialState: GameState = {
    board: createEmptyBoard(),
    currentPlayer: 'Player 1',
    winner: null,
};

// Logic to drop a token in a column
export const dropToken = (board: Board, column: number, player: Player): Board => {
    const newBoard = [...board.map(row => [...row])]; // Deep clone the board
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!newBoard[row][column]) {
            newBoard[row][column] = player;
            break;
        }
    }
    return newBoard;
};

// Switch players
export const switchPlayer = (player: Player): Player => player === 'Player 1' ? 'Player 2' : 'Player 1';

// Use the provided utility to check for a winner or draw
export const checkForWinner = (board: Board): Player | 'draw' => (window as any).connectFour.checkForWinner(board);
