
import { render, screen, fireEvent } from '@testing-library/react';
import Btn from './Btn';


describe('Btn Component', () => {
    it('renders with the correct text', () => {
        render(<Btn text="Test Button" />);
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('applies the given class', () => {
        render(<Btn cls="test-class" />);
        expect(screen.getByRole('button', {class: 'test-class'})).toBeInTheDocument();
    });

    it('triggers handleClick on click', () => {
        const handleClick = jest.fn();
        render(<Btn handleClick={handleClick} text="Test Button" />);
        fireEvent.click(screen.getByText('Test Button'));
        expect(handleClick).toHaveBeenCalled();
    });

    it('renders without text if no text prop is given', () => {
        render(<Btn />);
        expect(screen.getByRole('button').textContent).toBe('');
    });

    it('does not crash if handleClick is not provided', () => {
        render(<Btn text="Test Button" />);
        expect(() => fireEvent.click(screen.getByText('Test Button'))).not.toThrow();
    });
});

