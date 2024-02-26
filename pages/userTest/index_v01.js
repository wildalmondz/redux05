import Layout from "../../components/Layout"
import {blogHandler} from "../api"

export default function UserTest({ results }) {
    return(
      <Layout>
        <h1>Top Stories</h1>
          {JSON.stringify(results)}
      </Layout>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;

    const results = await blogHandler('http://localhost:4500/admin/username', {
        credentials: 'include',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            // Include any additional headers or authentication tokens here
        },
    });

    return {
        props: {
            results,
        },
    };
}
