import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const space = 'PRIVATE_API_KEY';

const httpLink = createHttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${space}`,
  });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = 'zFz_WBaMLZVuzj5V_pt9SWlelT-ANvv6Qo2-bLBdM00';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;