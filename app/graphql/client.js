import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Config from 'react-native-config';

const makeApolloClient = (token) => {
  console.log(Config);
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: Config.GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();
  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};
export default makeApolloClient;
