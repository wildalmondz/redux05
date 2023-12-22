// test/index.js
import { DataProvider, useData } from './DataContext';

const Home = ({ initialData }) => {
    const data = useData(initialData);

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

export const getStaticProps = async () => {
    try {
        const response = await fetch('/api/blog');
        const initialData = await response.json();

        return {
            props: {
                initialData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                initialData: null,
            },
        };
    }
};

const TestPage = ({ initialData }) => {
    return (
        <DataProvider initialData={initialData}>
            <Home />
        </DataProvider>
    );
};

export default TestPage;
