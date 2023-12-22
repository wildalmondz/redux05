import Link from 'next/link';
import Layout from '../../components/Layout';
import { blogHandler } from '../../pages/api';

export default function Slugs({ companyDetails, slugListArray, blogListArray }) {

    console.log(companyDetails);
    const companyInfo = companyDetails.company[0];

    return (
        <Layout>
            <h1>Name: {companyInfo.name}</h1>
            <h4>type: {companyInfo.type}</h4>
            <h4>slug: {companyInfo.slug}</h4>
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

                        <Link
                            href={`/blogs/[type]/[slug]/[id]`}
                            as={`/blogs/${companyInfo.type}/${companyInfo.slug}/${blogValue.id}`}
                        >
                            {blogValue.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

/*
                        <IdComponent type={companyDetails.type} slug={companyDetails.slug} id={blogValue.id}   />

 */

export async function getStaticProps() {
    let companyDetails = {};
    let slugListArray = {};
    let blogListArray = {};

    try {
        console.log(`Here at blogData`);
        const blogData = await blogHandler(`http://localhost:4500/blog/v2/fastfood/chicken`);

        companyDetails = blogData.find((entry) => entry.company);
        slugListArray = blogData.find((entry) => entry.slugs);
        blogListArray = blogData.find((entry) => entry.blogs);
    } catch (error) {
        console.error('Error fetching blog data:', error.message);
    }

    return {
        props: {
            companyDetails,
            slugListArray,
            blogListArray,
        },
    };
}
