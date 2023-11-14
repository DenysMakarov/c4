import React, {FC} from 'react';
import "../index.scss"

interface IPropCell {
    cell: string | number | null,
    colIndex: number,
    rowIndex: number,
}

const Cell: FC<IPropCell> = React.memo(({cell, colIndex, rowIndex}) => {

    let playerClass = cell === 1 ? 'red' : cell === 2 ? 'yellow' : null;

    return (
        <div className="cell"
             key={`${colIndex}-${rowIndex}`}
        >
            {cell ? <div className={`token ${playerClass}`}/> : <div className='empty-slot'></div>}
        </div>
    )
})

export default Cell;
