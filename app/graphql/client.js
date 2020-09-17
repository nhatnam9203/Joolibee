import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import Config from 'react-native-config';
import _ from 'lodash';

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
      Accept: 'application/json',
    };
  }
  return {
    headers: {
      ...myHeaders,
      // authorization: jwt ? `Bearer ${jwt.token}` : '',
      Authorization: 'Basic bGV2aW5jaToxcWF6QFdTWA==',
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
    if (graphQLErrors?.length > 0) {
      Logger.debug(graphQLErrors, '*************graphQLErrors*************');

      let queryErrors = [];
      let arrErrors = {};
      graphQLErrors.map(({ message, locations, path, extensions }, index) => {
        if (extensions.category === 'graphql') {
          // error call graphql wrong
          queryErrors.push(message);
        } else {
          switch (extensions.code) {
            default:
              arrErrors[index] = message;
              break;
          }
        }
      });

      if (queryErrors.length > 0) {
        Logger.error(queryErrors, 'Graphql query wrong');
      }

      if (!_.isEmpty(arrErrors)) {
        response.error = arrErrors;
      }
    }

    if (networkError) {
      Logger.debug('[Network error]:', networkError);
    }
  },
);

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();
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
