import { render } from '@testing-library/react';
import Board from "./board/Board";
import Cell from "./cell/Cell";


describe('Board Component', () => {
    const mockBoard = [
        [1, null, null, null, null, null],
        [null, null, 2, null, null, null],
        [1, null, null, null, null, null],
        [null, null, null, null, null, 1],
        [null, 2, 1, null, null, null],
        [null, null, null, null, null, null],
        [2, 2, null, null, null, null],
    ];

    it('renders the correct number of columns and cells', () => {
        const { container } = render(<Board board={mockBoard} />);
        const columns = container.querySelectorAll('.column');

        // Check if the number of columns matches
        expect(columns.length).toBe(mockBoard.length);

        columns.forEach((col, index) => {
            const cells = col.querySelectorAll('.cell');

            // Check if the number of cells in each column matches
            expect(cells.length).toBe(mockBoard[index].length);
        });
    });

    it('renders empty cells correctly', () => {
        const { container } = render(<Board board={mockBoard} />);
        mockBoard.forEach((column, colIndex) => {
            column.forEach((cell, rowIndex) => {
                if (cell === null) {
                    expect(container.querySelector(`.column:nth-child(${colIndex + 1}) .cell:nth-child(${rowIndex + 1}) .empty-slot`)).toBeInTheDocument();
                }
            });
        });
    });

    it('does not render extra cells beyond the board size', () => {
        const { container } = render(<Board board={mockBoard} />);
        const totalCells = container.querySelectorAll('.cell').length;
        const expectedCellCount = mockBoard.flat().length;
        expect(totalCells).toBe(expectedCellCount);
    });


});

describe('Cell Component', () => {
    it('renders with the correct class for player 1', () => {
        const { container } = render(<Cell cell={1} colIndex={0} rowIndex={0} />);
        expect(container.querySelector('.red')).toBeInTheDocument();
    });

    it('renders with the correct class for player 2', () => {
        const { container } = render(<Cell cell={2} colIndex={0} rowIndex={0} />);
        expect(container.querySelector('.yellow')).toBeInTheDocument();
    });

    it('renders an empty slot for null cell', () => {
        const { container } = render(<Cell cell={null} colIndex={0} rowIndex={0} />);
        expect(container.querySelector('.empty-slot')).toBeInTheDocument();
    });


    it('renders an empty cell correctly', () => {
        const { container } = render(<Cell cell={null} colIndex={0} rowIndex={0} />);
        expect(container.querySelector('.empty-slot')).toBeInTheDocument();
    });
});

