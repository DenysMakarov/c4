import React, {FC} from 'react';
import "./index.scss"
import useContextApp from "../../hooks/useContext";
import Btn from "../../shared/cmps/Btn";
import {AppContext} from "../../App";

interface IPropBoard{
    board: (string | number | null)[][];
    winner: string | number | null;
    currentPlayer: number,
}
const DropBtns: FC<IPropBoard> = ({board, winner, currentPlayer}) => {

    const {dropToken, resetGame, resetScore} = useContextApp(AppContext)
    const colorClass = currentPlayer === 1 ? "btn-red" : "btn-yellow"

    return (
        <div className='btn-block'>

            {
                winner ?
                    <>
                        <Btn text='Reset Scores' cls='btn-reset' handleClick={resetScore}/>
                        <Btn text='Play Again' cls='btn-reset' handleClick={resetGame}/>
                    </>
                    :
                    board.map((column, colIndex) => (
                            <div key={colIndex} className="btn-column">
                                <button onClick={() => dropToken(colIndex)} className={`btn btn-red ${colorClass}`}>Drop</button>
                            </div>
                        ))
            }
        </div>
    );
}

export default DropBtns;
