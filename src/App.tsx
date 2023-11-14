import React, {useState, createContext, useEffect, useCallback, useMemo} from 'react';
import './App.scss';
import {NUM_ROWS, PLAYERS} from "./utils/constants";
import Board from "./cmps/board/board/Board";
import {checkForWinner, deepClone, emptyBoard} from "./utils/utils";
import Cell from "./cmps/board/cell/Cell";
import DropBtns from "./cmps/dropBtns/DropBtns";
import Dashboard from "./cmps/dashboard/dashboard/Dashboard";

const mockBoard = [
    [1, null, null, null, null, null],
    [null, null, 2, null, null, null],
    [1, null, null, null, null, null],
    [null, null, null, null, null, 1],
    [null, 2, 1, null, null, null],
    [null, null, null, null, null, null],
    [2, 2, null, null, null, null],
]

interface IContext {
    dropToken: (colIndex: number) => void,
    resetGame: () => void,
    resetScore: () => void
}

export interface IPlayer {
    name: number;
    score: number;
}

export const AppContext = createContext<IContext | null>(null)

const  App = () => {

    const initialPlayers = useMemo(() => {
        const storedPlayers = localStorage.getItem('playerScores');
        return storedPlayers ? JSON.parse(storedPlayers) : [
            { name: 1, score: 0 },
            { name: 2, score: 0 }
        ];
    }, []);

    const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);

    const [board, setBoard] = useState(emptyBoard);
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.RED);
    const [winner, setWinner] = useState<string | number | null>(null);

    useEffect(() => {
        localStorage.setItem('playerScores', JSON.stringify(players));
    }, [players]);

    const updatePlayerScore = useCallback((winner: number) => {
        const updatedPlayers = players.map(player => {
            if (player.name === winner) {
                return { ...player, score: player.score + 1 };
            }
            return player;
        });

        setPlayers(updatedPlayers);
    }, [players]);

     const dropToken = (colIndex: number) => {
        if (winner) return;

        const newBoard = deepClone(board);
        for (let row = 0; row < NUM_ROWS; row++) {
            if (!newBoard[colIndex][row]) {
                newBoard[colIndex][row] = currentPlayer;

                const gameResult = checkForWinner(newBoard);

                if (gameResult === PLAYERS.RED) {
                    setWinner(gameResult);
                    updatePlayerScore(1);
                } else if (gameResult === PLAYERS.YELLOW) {
                    setWinner(gameResult);
                    updatePlayerScore(2);
                } else if (gameResult === 'draw') {
                    setWinner("Draw");
                }

                setBoard(newBoard);
                setCurrentPlayer(currentPlayer === PLAYERS.RED ? PLAYERS.YELLOW : PLAYERS.RED);
                break;
            }
        }
    };

    const resetGame = useCallback(() => {
        setWinner(null);
        setBoard(emptyBoard);
        setCurrentPlayer(PLAYERS.RED)
    }, [])

    const resetScore = useCallback(() => {
        localStorage.setItem('playerScores', JSON.stringify(initialPlayers))
        setPlayers([
            { name: 1, score: 0 },
            { name: 2, score: 0 }
        ])
        resetGame()
    }, [initialPlayers, resetGame])


    return (
        <AppContext.Provider value={{dropToken, resetGame, resetScore}} >
            <div className="App">
                <h1>Connect Four</h1>
                <Dashboard winner={winner} currentPlayer={currentPlayer} players={players}/>
                <DropBtns board={board} winner={winner} currentPlayer={currentPlayer}/>
                <Board board={board}/>
            </div>
        </AppContext.Provider>

    );
}

export default App;
