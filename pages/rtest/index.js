import ChildComponent from './ChildComponent';

// export default function News({ results }) {

import Layout from "../../components/Layout"
import { handler } from "../api"

export default function rtest({ }) {

    const type = "fastfood";
    const slug = "chicken";
    const id = 63;


    return (
        <ChildComponent type={type} slug={slug} id={id}   />
    );
}

/*
// to register for a new New York Times API KEY, visit :
const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ"
export async function getStaticProps() {

    const results = await handler(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
    )
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: {
            results
        }
    }
}

 */

/*
export default function rtest()  {
    const data = "Hello from ParentComponent";

    return (
        <ChildComponent data={data} />
    );
};

 */