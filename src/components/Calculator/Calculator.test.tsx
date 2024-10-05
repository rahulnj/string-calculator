import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
});

describe('Calculator', () => {
    test('renders inputfield and buttons', () => {
        render(<Calculator />);
        expect(screen.getByPlaceholderText(/Enter numbers to add/i)).toBeInTheDocument();
        expect(screen.getByText(/Add/i)).toBeInTheDocument();
        expect(screen.getByText(/Clear/i)).toBeInTheDocument();
    });

    test('calculates the sum of input numbers separated by commas', () => {
        render(<Calculator />);
        const input = screen.getByPlaceholderText(/Enter numbers to add/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: '2,3,4' } });
        fireEvent.click(addButton);

        expect(screen.getByText(/Sum: 9/i)).toBeInTheDocument();
    });

    test('handles invalid input', () => {
        render(<Calculator />);
        const input = screen.getByPlaceholderText(/Enter numbers to add/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: '2,a,4' } });
        fireEvent.click(addButton);

        expect(screen.queryByText(/Sum:/i)).not.toBeInTheDocument();
        expect(window.alert).toHaveBeenCalledWith('Invalid input');
    });

    test('clears the inputfield and result when Clear button is clicked', () => {
        render(<Calculator />);
        const input = screen.getByPlaceholderText(/Enter numbers to add/i);
        const addButton = screen.getByText(/Add/i);
        const clearButton = screen.getByText(/Clear/i);

        fireEvent.change(input, { target: { value: '2,3,4' } });
        fireEvent.click(addButton);
        fireEvent.click(clearButton);

        expect(screen.getByPlaceholderText(/Enter numbers to add/i)).toHaveValue('');
        expect(screen.queryByText(/Sum:/i)).not.toBeInTheDocument();
    });
})