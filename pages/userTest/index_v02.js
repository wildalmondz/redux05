import Layout from "../../components/Layout"
import {blogHandler} from "../api"

export default function News({ results }) {
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

/*
export async function getStaticProps() {

    const results = await blogHandler('http://localhost:4500/admin/username', {
        credentials: 'include',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
        },
    });

    console.log(JSON.stringify(results));

  return {
    props: {
      results
    }
  }
}

 */

/*
{results} ?
    <span>{JSON.stringify(results)}</span>
    <ul>
        {results.map(result => {
            return(<li key={result.uri}><a href={result.url} target="_blank" rel="noopener norefferer">{result.title}</a></li>)
        })}
    </ul>
:

 */