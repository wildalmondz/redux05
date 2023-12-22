import Link from 'next/link';
import Layout from "../../components/Layout";
import {handler} from "@/pages/api";

export default function Slugs(slugListArray) {
    return (
        <Layout>
            <ul>
                {slugListArray.slugs.map(slugValue => (
                    <li key={slugValue.id}>
                        <Link href={`slugs/${slugValue.id}`}>
                            {slugValue.slug}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export async function getStaticProps() {

    let slugListArray = [];

    const blogData = await handler(`https://wildalmonds.com/api/blog/v2/winereviews/wildalmonds`);

    await blogData.then((data) => {
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].slugs)) {
            slugListArray = data[0].slugs;
        }
    });

    return {
        props: {
            slugListArray
        }
    }
}