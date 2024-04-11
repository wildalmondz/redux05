import { useRouter } from 'next/router';

export default function WriteBlog() {
    const router = useRouter();
    const { createblog } = router.query;
    const number = parseInt(createblog[1]); // Extract the number from the route

    return (
        <div>
            <h1>Number: {number}</h1>
        </div>
    );
}