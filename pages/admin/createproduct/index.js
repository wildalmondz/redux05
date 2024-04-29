// admin/createblog/index.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Categories() {
    const router = useRouter();

    useEffect(() => {
        router.push(`/admin/createproduct/editor/1`);
    }, []);

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: {},
    };
}

