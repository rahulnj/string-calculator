import React, { useState } from 'react';
import './Calculator.css';
import { add } from '../../utils/calculatorUtils';

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const handleClear = () => {
        setInput('');
        setResult(null);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    const handleCalculate = () => {
        try {
            const result = add(input);
            setResult(result);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred');
            }
            setResult(0);
        }
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
            {
                result !== null &&
                <div className="result">Sum: {result}</div>
            }
        </div>
    );
};

export default Calculator;
