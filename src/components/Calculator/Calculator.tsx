import React, { useState } from 'react';
import './Calculator.css';

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

    function add(input: string): number {
        try {
            const sanitizedInput = input.replace(/\n/g, ',');
            const numbers = sanitizedInput.split(',').map(Number);
            if (numbers.some(isNaN)) throw new Error('Invalid input');
            const sum = numbers.reduce((acc, num) => acc + num, 0);
            return sum;
        } catch (error) {
            alert('Invalid input');
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
                    placeholder="Enter numbers to add (e.g. 1\n2,3)"
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
