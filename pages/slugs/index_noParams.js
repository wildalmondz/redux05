import Link from 'next/link';
import Layout from '../../components/Layout';
import { blogHandler } from '@/pages/api';

export default function Slugs({ companyDetails, slugListArray, blogListArray }) {
    return (
        <Layout>
            <h1>{companyDetails.name}</h1>
            <h4>{companyDetails.type}</h4>
            <h4>{companyDetails.slug}</h4>
            <ul>
                {slugListArray.slugs.map((slugValue) => (
                    <li key={slugValue.id}>
                        <Link href={`slugs/${slugValue.id}`}>
                            {slugValue.slug}
                        </Link>
                    </li>
                ))}
            </ul>
            <br />
            <ul>
                {blogListArray.blogs.map((blogValue) => (
                    <li key={blogValue.id}>
                        <Link href="../../../../sandbox/waDatabase/post/[type]/[slug]/[id]" as href={`blogs/post/${companyDetails.type}/${companyDetails.slug}/${blogValue.id}`}>
                            {blogValue.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

/*

    <Link href="/child/[id]" as="/child/123">
                        <Link href={`blogs/post/${companyDetails.type}/${companyDetails.slug}/${blogValue.id}`}>
                            {blogValue.title}
                        </Link>
 */

export async function getStaticProps() {
    let companyDetails = {};
    let companyListArray = [];
    let slugListArray = [];
    let blogListArray = [];

    try {
        /*
            const company = await handler(`https://wildalmonds.com/api/blog/v2/winereviews/wildalmonds`
        )
         */
        console.log(`Here at blogData`)
        const blogData = await blogHandler(`http://localhost:4500/blog/v2/fastfood/chicken`
        // const blogData = await handler('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ'
        )


        // console.log(`blogData ${JSON.stringify(blogData)}`)
        console.log(`blogData ${typeof(blogData)}`)

        companyListArray = blogData.find(entry => Array.isArray(entry.company));

        companyListArray.company.map(companyValue => (
            companyDetails = {
                'name': companyValue.name,
                'type': companyValue.type,
                'slug': companyValue.slug}
            ));

        slugListArray = blogData.find(entry => Array.isArray(entry.slugs));

        slugListArray.slugs.map(slugValue => (
            console.log(slugValue.id
                + ' ' +
                slugValue.slug)))

        blogListArray = blogData.find(entry => Array.isArray(entry.blogs));

        blogListArray.blogs.map(blogValue => (
            console.log(blogValue.id
                + ' => \t' +
                blogValue.title)))

        // Check if blogData contains the expected structure before accessing properties
        if (Array.isArray(blogData) && blogData.length > 0 && Array.isArray(blogData[0].slugs)) {
            slugListArray = blogData.find(entry => Array.isArray(entry.slugs));


            slugListArray.slugs.map(slugValue => (
                console.log(slugValue.id
                    + ' ' +
                    slugValue.slug)))


        }
    } catch (error) {
        console.error('Error fetching blog data:', error.message);
    }

    return {
        props: {
            companyDetails,
            slugListArray,
            blogListArray
        },
    };
}
