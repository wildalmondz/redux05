// App.js
import React from 'react';
import { DataProvider } from './DataContext';
import FetchDataComponent from './FetchDataComponent';
import DisplayDataComponent from './DisplayDataComponent';

const Test = () => {
    return (
        <DataProvider>
            <FetchDataComponent />
            <DisplayDataComponent />
        </DataProvider>
    );
};

export default Test;
