import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import Config from 'react-native-config';
import _ from 'lodash';
import NavigationService from '../navigation/NavigationService';
import { get, StorageKey } from '@storage';

const httpLink = createHttpLink({ uri: Config.GRAPHQL_ENDPOINT });

const authLink = setContext(async (req, { headers }) => {
  // get auth token
  const jwt = await get(StorageKey.Token);
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
      Authorization: jwt ? `Bearer ${jwt}` : '',
      // Authorization: 'Basic bGV2aW5jaToxcWF6QFdTWA==',
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
    /**
     * graphQLErrors
     * Do something with a graphQL error
     */
    if (graphQLErrors?.length > 0) {
      let errors = [];

      graphQLErrors.map(({ message, locations, path, extensions }, index) => {
        if (
          extensions.category === 'graphql' ||
          extensions.category === 'graphql-input'
        ) {
          // error call graphql wrong
          errors.push(message);
        } else {
          switch (extensions.code) {
            default:
              errors[index] = message;
              break;
          }
        }
      });

      if (errors.length > 0) {
        NavigationService.alertWithError({ message: errors.join('\n ') });
      }

      if (!_.isEmpty(errors)) {
        response = Object.assign({}, response, { errors: errors });
      }
    }
    //graphQLErrors

    /**
     * networkError
     * Do something with a network error
     */
    if (networkError) {
      const { name, statusCode, result = {} } = networkError;

      // Logger.debug('[Network error]:', networkError);
      NavigationService.alertWithError({
        message: name + ' with status code ' + statusCode,
      });
    }
    //networkError
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
