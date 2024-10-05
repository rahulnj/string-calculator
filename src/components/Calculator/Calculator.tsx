import React, { useState } from 'react';
import './Calculator.css';

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleCalculate = () => {
        add(input);
    };

    function add(input: string): void {
        try {
            const numbers = input.split(',').map(Number);
            if (numbers.some(isNaN)) throw new Error('Invalid input');
            const sum = numbers.reduce((acc, num) => acc + num, 0);
            setResult(sum);
        } catch (error) {
            setResult(null);
            alert('Invalid input');
        }
    }

    const handleClear = () => {
        setInput('');
        setResult(null);
    };

    return (
        <div className="calculator">
            <div className="display">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter numbers to add"
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
