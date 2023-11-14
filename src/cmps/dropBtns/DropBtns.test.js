import { render, fireEvent, screen } from '@testing-library/react';
import { AppContext } from '../../App';
import DropBtns from './DropBtns';

describe('DropBtns Component', () => {
    const mockDropToken = jest.fn();
    const mockResetGame = jest.fn();
    const mockResetScore = jest.fn();

    const contextValue = {
        dropToken: mockDropToken,
        resetGame: mockResetGame,
        resetScore: mockResetScore,
    };

    it('renders drop buttons when there is no winner', () => {
        const board = Array(7).fill(Array(6).fill(null));
        const { getAllByText } = render(
            <AppContext.Provider value={contextValue}>
                <DropBtns board={board} winner={null} currentPlayer={1} />
            </AppContext.Provider>
        );
        expect(screen.getAllByText('Drop').length).toBe(7);
    });

    it('calls dropToken when drop button is clicked', () => {
        const board = Array(7).fill(Array(6).fill(null));
        const { getAllByText } = render(
            <AppContext.Provider value={contextValue}>
                <DropBtns board={board} winner={null} currentPlayer={1} />
            </AppContext.Provider>
        );
        fireEvent.click(screen.getAllByText('Drop')[0]);
        expect(mockDropToken).toHaveBeenCalled();
    });

    it('renders reset buttons when there is a winner', () => {
        const board = Array(7).fill(Array(6).fill(null));
        const { getByText } = render(
            <AppContext.Provider value={contextValue}>
                <DropBtns board={board} winner="Red" currentPlayer={1} />
            </AppContext.Provider>
        );
        expect(screen.getByText('Reset Scores')).toBeInTheDocument();
        expect(screen.getByText('Play Again')).toBeInTheDocument();
    });

    it('calls resetScore on clicking Reset Scores', () => {
        const board = Array(7).fill(Array(6).fill(null));
        const { getByText } = render(
            <AppContext.Provider value={contextValue}>
                <DropBtns board={board} winner="Red" currentPlayer={1} />
            </AppContext.Provider>
        );
        fireEvent.click(screen.getByText('Reset Scores'));
        expect(mockResetScore).toHaveBeenCalled();
    });

    it('calls resetGame on clicking Play Again', () => {
        const board = Array(7).fill(Array(6).fill(null));
        const { getByText } = render(
            <AppContext.Provider value={contextValue}>
                <DropBtns board={board} winner="Red" currentPlayer={1} />
            </AppContext.Provider>
        );
        fireEvent.click(screen.getByText('Play Again'));
        expect(mockResetGame).toHaveBeenCalled();
    });
});
