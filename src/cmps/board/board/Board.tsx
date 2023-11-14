import React, {FC} from 'react';
import Cell from "../cell/Cell";
import "../index.scss"

interface IPropBoard {
    board: (string | number | null)[][];
}
const Board : FC<IPropBoard> = ({board}) => {

    return (
        <div className="board">
            <div className='board-wrapper'>
                {board.map((column, colIndex) => (
                    <div key={colIndex} className="column">
                        {column.map((cell, rowIndex) => (
                            <Cell
                                cell={cell}
                                colIndex={colIndex}
                                rowIndex={rowIndex}
                                key={`${colIndex}-${rowIndex}`}
                            />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Board;
