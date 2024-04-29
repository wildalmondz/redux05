import { blogHandler } from "../../pages/api";

const slugsData = [
    {
        "slugs": [
            {"id":796,"slug":"wildalmonds","type":"winereviews","image_path":null},
            {"id":601,"slug":"obelisco","type":"winery","image_path":null},
            {"id":872,"slug":"andrewreid","type":"founder","image_path":null},
            {"id":500,"slug":"sugarhorseCellars","type":"winery","image_path":null},
            {"id":488,"slug":"celil","type":"winery","image_path":"https://wildalmonds.com/api/uploads/52bfa242-b560-4f76-bbd3-7401cbb887fe_ceili_winery.jpg"},
            {"id":802,"slug":"chicken","type":"fastfood","image_path":"https://wildalmonds.com/api/uploads/61f7d043-74e4-4a8c-bbfa-b99ad95aa799_woodinvilleSign.jpg"},
            {"id":525,"slug":"threeOfCups","type":"winery","image_path":null},
            {"id":30,"slug":"bookwalter","type":"winery","image_path":null}
        ]
    },
    {"videos": []}
];

export default function Dynamic({ results }) {
    return (
        <>
            <h1>Top Stories</h1>
            {JSON.stringify(results)}
        </>
    );
}

export async function getStaticProps({ params }) {
    const { type, slug } = params;
    const apiUrl = `http://localhost:4500/blog/v2/${type}/${slug}`;

    const results = await blogHandler(apiUrl);

    return {
        props: {
            results,
        },
    };
}

export async function getStaticPaths() {
    // Generate paths dynamically based on the slugs array
    const paths = slugsData.reduce((acc, data) => {
        if (data.slugs) { // Check if 'slugs' property exists in the current 'data' object
            const categoryPaths = data.slugs.map(({ slug, type }) => ({ // Access 'slugs' property
                params: { type, slug },
            }));
            return [...acc, ...categoryPaths];
        }
        return acc;
    }, []);

    return {
        paths,
        fallback: false,
    };
}
