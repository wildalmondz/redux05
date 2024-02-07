// test/index.js
import { DataProvider, useData } from './DataContext';
import PathDisplay from "./PathDisplay";
import Bottomdeal from "./Bottomdeal";
import Countdown from "./Countdown";


const Home = ({ initialData }) => {
    const data = useData(initialData);

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

/*
export const getStaticProps = async () => {
    try {
        const response = await fetch('http://4500//blog/frontblogs');
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

 */

const TestPage = ({ }) => {
    return (
        <>
            <Countdown />
        </>
    );
};

/*
const TestPage = ({ initialData }) => {
    return (
        <DataProvider initialData={initialData}>
            <PathDisplay />
            <Bottomdeal />
        </DataProvider>
    );
};

 */

export default TestPage;
