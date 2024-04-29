// pages/blog/[...urlparser].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { blogHandler } from "../../pages/api";

export default function Categories() {
    const router = useRouter();

    useEffect(() => {
        // Check if structuredUrl.post exists before accessing its properties
        //if (structuredUrl && structuredUrl.post !== 'null') {
            router.push(`/blogs/winereviews/wildalmonds`);
        //}
    }, []);

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}