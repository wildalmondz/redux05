// Import necessary modules
import { useRouter } from 'next/router';

// Your React component
const ScrollCard = () => {
    // Get the router instance
    const router = useRouter();

    // Extract path items as variables
    const { pathname } = router;
    const pathItems = pathname.split('/').filter(Boolean); // Remove empty strings

    // Use the path items as variables
    const firstPathItem = pathItems[0];
    const secondPathItem = pathItems[1];
    const thirdPathItem = pathItems[2];

    return (
        <div>
            <p>First Path Item: {firstPathItem}</p>
            <p>Second Path Item: {secondPathItem}</p>
            <p>Third Path Item: {thirdPathItem}</p>
        </div>
    );
};

export default ScrollCard;
