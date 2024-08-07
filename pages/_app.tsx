import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "../src/components/commons/layout";
import "/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps): JSX.Element {

  const client = new ApolloClient({
    uri:"http://localhost:4000/creator-connect",
    cache: new InMemoryCache()
  })

  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps}/>  
        </Layout> 
      </ApolloProvider>
    </> 
  )
}
