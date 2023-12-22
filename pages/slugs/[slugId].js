import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import blogs from "../api/blogFull";

function getBlogText(blogsObject, slugId) {
    let slugVal = parseInt(slugId);

    if (isNaN(slugVal)) {
        console.log("The slugVal variable is NaN");
        return null;
    }


    if (!Array.isArray(blogsObject.blogs)) {
        console.error("Invalid slugs object format");
        return null;
    }

    const slugsListArray = blogsObject.blogs.find(entry => Array.isArray(entry.slugs));

    if (!slugsListArray) {
        console.error("No slugs array found in the blogs object");
        return null;
    }

    const slugValue = slugsListArray.slugs.find(slug => slug.id === slugVal);

    if (!slugValue) {
        console.error(`Slug with id ${slugVal} not found`);
        return null;
    }

    return slugValue.type;
}

export default function Slug() {
    const router = useRouter();
    const { slugId } = router.query;

    console.log(slugId);
    const slugCo = getBlogText(blogs, slugId);

    // Check if the blog is not found
    if (!slugCo) {
        return (
            <Layout>
                <p>Slug not found</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <a href="#" onClick={() => router.back()}>
                Back
            </a>
            <p>{slugCo}</p>
        </Layout>
    );
}
