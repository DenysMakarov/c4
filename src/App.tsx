import React, {useState, useEffect} from 'react';
import './App.css';


const NUM_ROWS = 6;
const NUM_COLS = 7;
const EMPTY_BOARD = () => Array(NUM_COLS).fill(null).map(() => Array(NUM_ROWS).fill(null));
// const PLAYERS = { RED: 'red', YELLOW: 'yellow' };
const PLAYERS = {RED: 1, YELLOW: 2};

const App = () => {
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.RED);
    const [winner, setWinner] = useState<string | null>(null);

    useEffect(() => {
        console.log(board)
    }, [board])

    const checkWinner = (board: (string | null)[][]) => {
        const numRows = board[0].length;
        const numCols = board.length;

        // Check vertical
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows - 3; row++) {
                if (board[col][row] && board[col][row] === board[col][row + 1] &&
                    board[col][row] === board[col][row + 2] && board[col][row] === board[col][row + 3]) {
                    return board[col][row];
                }
            }
        }

        // Check horizontal
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols - 3; col++) {
                if (board[col][row] && board[col][row] === board[col + 1][row] &&
                    board[col][row] === board[col + 2][row] && board[col][row] === board[col + 3][row]) {
                    return board[col][row];
                }
            }
        }

        // Check diagonal (down-right and up-right)
        for (let col = 0; col < numCols - 3; col++) {
            for (let row = 0; row < numRows - 3; row++) {
                if (board[col][row] && board[col][row] === board[col + 1][row + 1] &&
                    board[col][row] === board[col + 2][row + 2] && board[col][row] === board[col + 3][row + 3]) {
                    return board[col][row];
                }
            }
            for (let row = 3; row < numRows; row++) {
                if (board[col][row] && board[col][row] === board[col + 1][row - 1] &&
                    board[col][row] === board[col + 2][row - 2] && board[col][row] === board[col + 3][row - 3]) {
                    return board[col][row];
                }
            }
        }

        // Check for draw
        let isDraw = true;
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                if (!board[col][row]) {
                    isDraw = false;
                    break;
                }
            }
            if (!isDraw) {
                break;
            }
        }

        if (isDraw) {
            return 'Draw';
        }

        return null;
    };


    const dropToken = (colIndex: number) => {
        if (winner) return; // Disable token drop if game is over

        const newBoard = [...board];
        for (let row = 0; row < NUM_ROWS; row++) {
            if (!newBoard[colIndex][row]) {
                newBoard[colIndex][row] = currentPlayer;
                setBoard(newBoard);
                setCurrentPlayer(currentPlayer === PLAYERS.RED ? PLAYERS.YELLOW : PLAYERS.RED);
                break;
            }
        }
    };

    const resetGame = () => {
        setBoard(EMPTY_BOARD);
        setCurrentPlayer(PLAYERS.RED);
        setWinner(null);
    };

    useEffect(() => {
        const result = checkWinner(board);
        if (result) {
            setWinner(result === 'Draw' ? 'Draw' : `${result} won!`);
        }
    }, [board]);

    const renderCell = (cell: string | number | null, colIndex: number, rowIndex: number) => {

        /*
        * new logic
        * */

        let cls = cell === 1 ? 'red' : cell === 2 ? 'yellow' : null;

        return (
            <div className="cell" onClick={() => dropToken(colIndex)} key={`${colIndex}-${rowIndex}`}>
                {cell && <div className={`token ${cls}`}></div>}
            </div>
        )

    };

    const renderBoard = () => (
        <div className="board">
            {board.map((column, colIndex) => (
                <div key={colIndex} className="column">
                    {column.map((cell, rowIndex) => renderCell(cell, colIndex, rowIndex))}
                </div>
            ))}
        </div>
    );

    return (
        <div className="App">
            <h1>Connect Four</h1>
            <h2>{winner ? winner : `${currentPlayer}'s turn`}</h2>
            {renderBoard()}
            {winner && <button onClick={resetGame}>Play Again</button>}
        </div>
    );
};

export default App;
