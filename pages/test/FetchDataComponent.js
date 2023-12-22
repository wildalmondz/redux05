// FetchDataComponent.js
import React from 'react';
import { useData } from './DataContext';

const FetchDataComponent = () => {
    const data = useData();

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Data fetched from Express route:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default FetchDataComponent;
