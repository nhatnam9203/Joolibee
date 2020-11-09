import Config from 'react-native-config';
import NavigationService from '../navigation/NavigationService';
import { get, StorageKey, remove } from '@storage';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  defaultDataIdFromObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/core';

const httpLink = new HttpLink({ uri: Config.GRAPHQL_ENDPOINT });
export const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      // case 'CartPrices':
      //   Logger.info(responseObject, 'responseObject');
      //   return `CartPrices:`;
      default:
        return defaultDataIdFromObject(responseObject);
    }
  },
});

const authLink = new ApolloLink(async (operation, forward) => {
  // get auth token
  let jwt;
  const jwtObject = await get(StorageKey.Token);
  if (jwtObject) {
    const key = jwtObject[StorageKey.Token];
    jwt = jwtObject[key];
  }

  operation.setContext(({ headers }) => ({
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : '',
      // Store: 'en',
      ...headers,
    },
  }));

  return forward(operation);
});
/**
 * Error Handle - graphQLErrors/networkError
 */
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response = {}, forward }) => {
    Logger.debug(graphQLErrors, 'graphQLErrors');

    /**
     * graphQLErrors
     * Do something with a graphql error
     */
    if (graphQLErrors?.length > 0) {
      let errors = [];
      graphQLErrors.map(
        (
          { message, locations, path, extensions: { category, code } },
          index,
        ) => {
          switch (category) {
            case 'graphql':
            case 'graphql-input':
              // client query/mutation wrong
              errors.push(message);

              break;
            case 'graphql-authorization':
              remove(StorageKey.Token);
              errors.push(message);
              // kick out user here ...
              NavigationService.logout();
              break;
            default:
              errors[index] = message;

              break;
          }
        },
      );

      // alert message on top
      if (errors.length > 0) {
        NavigationService.alertWithError({ message: errors.join('\n ') });
        response.errors = errors;
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

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  // Logger.debug('operation', `Start Request -----> ${operation.operationName}`);
  return forward(operation);
});

const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = new Date() - operation.getContext().start;

    Logger.debug(
      `Complete in ${(time / 1000).toFixed(2)} s`,
      `End Request -----> ${operation.operationName ?? 'mutation'}`,
    );

    return data;
  });
});

const link = ApolloLink.from([
  timeStartLink,
  authLink,
  logTimeLink,
  errorLink,
  httpLink,
]);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export const graphQlClient = (persistCache) =>
  new ApolloClient({
    link,
    cache: persistCache ?? cache,
    defaultOptions,
  });
