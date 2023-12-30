import React, { useState } from 'react';

const testArray = [61, 60, 57, 56, 55, 52, 45, 44, 42, 40, 37, 35, 32, 19, 18, 7];

const ArrayMover: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');

    const handleBack = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleForward = () => {
        setCurrentIndex((prevIndex) => Math.min(testArray.length - 1, prevIndex + 1));
    };

    const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = parseInt(event.target.value, 10);
        if (!isNaN(newIndex) && newIndex >= 0 && newIndex < testArray.length) {
            setCurrentIndex(newIndex);
        }
    };

    const handleSearch = () => {
        const inputValueAsNumber = parseInt(inputValue, 10);
        const indexOfInputValue = testArray.indexOf(inputValueAsNumber);

        if (indexOfInputValue !== -1) {
            console.log(`The element ${inputValueAsNumber} is found at index ${indexOfInputValue}`);
        } else {
            console.log(`Element ${inputValueAsNumber} is not found in the array`);
        }
    };

    return (
        <div>
            <h2>Array Mover</h2>
            <p>Current Element: {testArray[currentIndex]}</p>
            <input
                type="number"
                value={currentIndex}
                onChange={handleStartChange}
                min="0"
                max={testArray.length - 1}
            />
            <button onClick={handleBack} disabled={currentIndex === 0}>
                Back
            </button>
            <button onClick={handleForward} disabled={currentIndex === testArray.length - 1}>
                Forward
            </button>
            <br />
            <input
                type="text"
                placeholder="Search for value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default ArrayMover;
