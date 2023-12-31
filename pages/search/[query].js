import Layout from "../../components/Layout"
import { handler } from "../api"

export default function News({ results, query }) {
    return(
      <Layout>
        <h1>Search: {query}</h1>
          <br />
          <h3>Company</h3>
        <ul>
          {results[0].company.map(result => {
            return(<li key={result.id}><a>{result.name}</a></li>)
          })}
        </ul>
          <br />
          <h3>Game</h3>
          <ul>
              {results[0].game.map(result => {
                  return(<li key={result.id}><a>{result.name}</a></li>)
              })}
          </ul>
          <br />
          <h3>Blogs</h3>
          <ul>
              {results[0].blogs.map(result => {
                  return(<li key={result.id}><a>{result.title}</a></li>)
              })}
          </ul>
      </Layout>
    )
}

// to register for a new New York Times API KEY, visit :
export async function getServerSideProps({ params }) {
  // The value of the `props` key will be
  //  passed to the `Home` component
  const URL = `http://localhost:4500/search/company/red`
    const results = await handler(URL)
  return {
    props: {
        results, 
        query: params.query
    }
  }
}