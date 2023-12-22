// test/index.js
import { useRouter } from 'next/router';
import { DataProvider, useData } from './DataContext';



const Home = ({ initialData }) => {

    const router = useRouter();

// Extracting values from the URL
    const { companyType, companyName } = router.query;

    const data = useData(initialData);

    return (
        <div>
            {JSON.stringify(data)}
            <span>type: ${companyType}</span>
            <span>name: ${companyName}</span>
        </div>
    );
};

export const getStaticProps = async () => {
    try {
        const response = await fetch('http://localhost:4500/blog/v4/fastfood/chicken');
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
