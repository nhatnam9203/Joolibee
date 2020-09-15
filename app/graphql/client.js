import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import Config from 'react-native-config';

const httpLink = createHttpLink({ uri: Config.GRAPHQL_ENDPOINT });

const authLink = setContext(async (req, { headers }) => {
  // get auth token
  // const jwt = await localStorage.getJwtToken();
  const jwt = '';
  let myHeaders = headers;
  if (!headers) {
    myHeaders = {
      'Content-Type': 'application/json',
      credentials: 'same-origin',
    };
  }
  return {
    ...myHeaders,
    headers: {
      authorization: jwt ? `Bearer ${jwt.token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // logger.debug(graphQLErrors, '*************graphQLErrors*************')
    if (graphQLErrors[0] && graphQLErrors[0].message) {
      let m = graphQLErrors[0].message;
      Logger.debug(m, '*************graphQLErrors*************');
      let index = m.search('E_JWT_TOKEN_EXPIRED');
      if (index >= 0) {
        // accountTokenExpired();
      }

      // let rs = await localStorage.getActiveUser(); if(rs) { }
    }
    // console.log(graphQLErrors) graphQLErrors.map(({message, path}) => {
    // logger.debug(`Message: ${message}, Path: ${path}`, 'Graphql Errors')
    // return '' });
  }

  if (networkError) Logger.debug('[Network error]:', networkError);
});

// const link = ApolloLink.concat(httpLink, errorLink, authLink); const link =
// errorLink.concat(httpLink);
const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();
// const graphQlClient = new ApolloClient({uri:
// 'http://192.168.0.117:3000/api/v1/graphql'})
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
};

const graphQlClient = new ApolloClient({ link, cache, defaultOptions });

export default graphQlClient;
