// DisplayDataComponent.js
import React from 'react';
import { useData } from './DataContext';

const DisplayDataComponent = () => {
    const data = useData();

    if (!data) {
        return <div>Data not available</div>;
    }

    // Access specific elements from the data
    const title = data.results[0].title;

    return (
        <div>
            <h2>Data displayed without accessing the route:</h2>
            <p>Title: {title}</p>
        </div>
    );
};

export default DisplayDataComponent;
