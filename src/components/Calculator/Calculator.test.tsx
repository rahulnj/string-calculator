import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
});

describe('Calculator', () => {
    test('renders input field and buttons', () => {
        render(<Calculator />);
        expect(screen.getByPlaceholderText(/Enter numbers to add/i)).toBeInTheDocument();
        expect(screen.getByText(/Add/i)).toBeInTheDocument();
        expect(screen.getByText(/Clear/i)).toBeInTheDocument();
    });

    const testCases = [
        {
            description: 'calculates the sum of input numbers using the default delimiter (commas and newlines)',
            input: '2,3\n4',
            expectedSum: 9,
        },
        {
            description: 'calculates the sum of input numbers with a custom delimiter',
            input: '//;\n1;2;3',
            expectedSum: 6,
        },
        {
            description: 'calculates the sum of any amount of input numbers separated by commas',
            input: '1,2,3,4,5,6,7,8,9,10',
            expectedSum: 55,
        },
        {
            description: 'calculates the sum of input numbers with newlines and commas',
            input: '1\n2,3',
            expectedSum: 6,
        },
    ];

    testCases.forEach(({ description, input, expectedSum }) => {
        test(`${description}`, () => {
            render(<Calculator />);
            const calcInput = screen.getByPlaceholderText(/Enter numbers to add/i);
            const addButton = screen.getByText(/Add/i);

            fireEvent.change(calcInput, { target: { value: input } });
            fireEvent.click(addButton);
            expect(screen.getByText(new RegExp(`Sum: ${expectedSum}`, 'i'))).toBeInTheDocument();
        });
    });

    test('handles invalid input', () => {
        render(<Calculator />);
        const input = screen.getByPlaceholderText(/Enter numbers to add/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: '2,a,4' } });
        fireEvent.click(addButton);

        expect(screen.getByText(/Sum: 0/i)).toBeInTheDocument();
        expect(window.alert).toHaveBeenCalledWith('Invalid input');
    });

    test('clears the input field and result when Clear button is clicked', () => {
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
});