import React from 'react';
import { Cell as CellType } from './gameLogic';

interface CellProps {
    value: CellType;
}

export const Cell = ({ value }: CellProps) => (
    <div style={{ width: '50px', height: '50px', border: '1px solid black', backgroundColor: value ? (value === 'Player 1' ? 'red' : 'yellow') : 'white' }}>
        {value}
    </div>
);
