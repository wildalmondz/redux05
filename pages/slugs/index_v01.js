import Link from 'next/link';
import blogs from "../api/blogFull"
import Layout from "../../components/Layout";
import {handler} from "@/pages/api";

function getSlugListArray(blogsObject) {
    if (!Array.isArray(blogsObject.blogs)) {
        console.error("Invalid slugs object format");
        return [];
    }

    const slugListArray = blogsObject.blogs.find(entry => Array.isArray(entry.slugs));

    if (!slugListArray) {
        console.error("No slugList array found in the slugs object");
        return [];
    }

    return slugListArray.slugs;
}



export default function Slugs() {
    const slugsObject = blogs;
    const slugListArray = getSlugListArray(slugsObject);

    return (
        <Layout>
            <ul>
                {slugListArray.map(slugValue => (
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

    /*
        const company = await handler(`https://wildalmonds.com/api/blog/v2/winereviews/wildalmonds`
    )
     */

    const company = await handler(`http://localhost:4500/blog/testId`
    )

    console.log(JSON.stringify(company));

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: {
            company
        }
    }
}