import React, { useState } from 'react';
import './Calculator.css';

const DEFAULT_DELIMITER = /[,\n]/;

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    const handleCalculate = () => {
        const result = add(input);
        setResult(result);
    };

    function extractCustomDelimiter(lines: string[]): RegExp {
        const delimiterLine = lines[0];
        const customDelimiterMatch = delimiterLine.match(/\/\/(.+)/);
        if (customDelimiterMatch) {
            const customDelimiter = customDelimiterMatch[1].trim();
            return new RegExp(customDelimiter, 'g');

        }
        return DEFAULT_DELIMITER;
    }

    function validateNumbers(numbers: number[]): void {
        if (numbers.some(isNaN)) {
            throw new Error('Invalid input');
        }

        const negativeNumbers = numbers.filter(num => num < 0);
        if (negativeNumbers.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
        }
    }

    function add(input: string): number {
        try {
            const lines = input.split('\n');

            let delimiter = DEFAULT_DELIMITER;
            if (lines[0].startsWith('//')) {
                delimiter = extractCustomDelimiter(lines)
                lines.shift();
            }

            const numbers = lines.join(',').split(delimiter);
            const cleanedNumbers = numbers
                .filter(num => num.trim() !== '')
                .map(num => Number(num.replace(/^,/, '').trim()));

            validateNumbers(cleanedNumbers);

            const sum = cleanedNumbers.reduce((sumAcc, num) => sumAcc + num, 0);
            return sum;
        } catch (error) {
            if (error instanceof Error) {
                alert(error?.message);
            } else {
                alert('An unknown error occurred');
            }
            return 0;
        }
    }

    const handleClear = () => {
        setInput('');
        setResult(null);
    };

    return (
        <div className="calculator">
            <div className="display">
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter numbers to add (e.g. //;\n1;\n2;)"
                    className="input"
                />
                <button onClick={handleCalculate} className="add-button">Add</button>
                <button onClick={handleClear} className="clear-button">Clear</button>
            </div>
            {result !== null && <div className="result">Sum: {result}</div>}
        </div>
    );
};

export default Calculator;
