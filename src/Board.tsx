import React from 'react';
import { Cell as CellComponent } from './Cell';
import { Board as BoardType } from './gameLogic';

interface BoardProps {
    board: BoardType;
    onColumnClick: (columnIndex: number) => void;
}

export const Board = ({ board, onColumnClick }: BoardProps) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board[0].length}, 1fr)` }}>
        {board[0].map((_, columnIndex: number) => (
            <div key={columnIndex} onClick={() => onColumnClick(columnIndex)}>
                {board.map((row: BoardType[number], rowIndex: number) => (
                    <CellComponent key={`${rowIndex}-${columnIndex}`} value={row[columnIndex]} />
                ))}
            </div>
        ))}
    </div>
);
