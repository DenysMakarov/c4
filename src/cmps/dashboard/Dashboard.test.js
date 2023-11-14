import { render, screen } from '@testing-library/react';
import Dashboard from './dashboard/Dashboard';

describe('Dashboard Component', () => {
    const players = [{ name: 1, score: 0 }, { name: 2, score: 0 }];

    it('renders correctly for initial state', () => {
        const { getByText } = render(<Dashboard winner={null} currentPlayer={1} players={players} />);
        expect(screen.getByText("Red's turn")).toBeInTheDocument();
    });

    it('renders correctly for second player\'s turn', () => {
        const { getByText } = render(<Dashboard winner={null} currentPlayer={2} players={players} />);
        expect(screen.getByText("Yellow's turn")).toBeInTheDocument();
    });

    it('announces winner correctly', () => {
        const { getByText } = render(<Dashboard winner={1} currentPlayer={1} players={players} />);
        expect(screen.getByText('Red win')).toBeInTheDocument();
    });


    it('renders correctly when there is no winner yet', () => {
        const { queryByText } = render(<Dashboard winner={null} currentPlayer={1} players={players} />);
        expect(screen.queryByText('win')).not.toBeInTheDocument();
    });

});
