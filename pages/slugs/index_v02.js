import Link from 'next/link';
import Layout from '../../components/Layout';
import { handler } from '@/pages/api';

export default function Slugs({ slugListArray }) {
    return (
        <Layout>
            <ul>
                {slugListArray.map((slugValue) => (
                    <li key={slugValue.id}>
                        <Link href={`slugs/${slugValue.id}`}>
                            {slugValue.slug}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export async function getStaticProps() {
    let slugListArray = [];

    try {
        const blogData = await handler('https://slugs.com/api/blog/v2/slugstest');

        // Check if blogData contains the expected structure before accessing properties
        if (Array.isArray(blogData) && blogData.length > 0 && Array.isArray(blogData[0].slugs)) {
            slugListArray = blogData[0].slugs;
        }
    } catch (error) {
        console.error('Error fetching blog data:', error.message);
    }

    return {
        props: {
            slugListArray,
        },
    };
}
