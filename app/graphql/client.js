import Config from 'react-native-config';
import NavigationService from '../navigation/NavigationService';
import { get, StorageKey, remove } from '@storage';
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { InMemoryCache } from '@apollo/client/core';
import { CachePersistor } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { translate } from '@localize';

const GraphQLException = {
  AlreadyExists: 'graphql-already-exists', //Thrown when data already exists
  Authentication: 'graphql-authentication', //Thrown when an authentication fails
  Authorization: 'graphql-authorization', //Thrown when an authorization error occurs
  Input: 'graphql-input', //Thrown when a query contains invalid input
  NoSuchEntity: 'graphql-no-such-entity', //Thrown when an expected resource doesn’t exist
};

const httpLink = new HttpLink({ uri: Config.GRAPHQL_ENDPOINT });

const authLink = new ApolloLink(async (operation, forward) => {
  // get auth token
  const { token } = await get(StorageKey.User);
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      // Store: 'en',
      ...headers,
    },
  }));

  return forward(operation);
});
/**
 * Error Handle - graphQLErrors/networkError
 */
const errorLink = onError((err) => {
  const {
    graphQLErrors,
    networkError,
    operation,
    response = {},
    forward,
  } = err;
  // Logger.debug(err, '======> graphQLErrors err');
  Logger.debug(graphQLErrors, '======> graphQLErrors');

  /**
   * graphQLErrors
   * Do something with a graphql error
   */
  if (graphQLErrors?.length > 0) {
    let errors = [];
    graphQLErrors?.map(
      (
        {
          debugMessage,
          message,
          locations,
          path,
          extensions: { category, code },
        },
        index,
      ) => {
        switch (category) {
          case GraphQLException.Input:
            // client query/mutation wrong
            errors.push(message);
            // if (debugMessage) {
            //   errors.push(debugMessage);
            // }

            break;
          case GraphQLException.Authorization:
          case GraphQLException.Authentication:
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
  //https://www.facebook.com/JollibeeVietnam/

  if (networkError) {
    const { name, statusCode, result = {} } = networkError;

    switch (statusCode) {
      case 503:
        NavigationService.showConfirm(
          translate('txtServerMaintainTitle'),
          translate('txtServerMaintainDesc'),
          () => {},
        );
        break;
      case 500:
        // kick out user here ...
        NavigationService.logout();

        NavigationService.showConfirm(
          translate('txtServerMaintainTitle'),
          translate('txtServerMaintainDesc'),
          () => {},
        );
        break;
      default:
        // Logger.debug('[Network error]:', networkError);
        NavigationService.alertWithError({
          message: name + ' with status code ' + statusCode,
        });
        break;
    }
  }
  //networkError
});

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  Logger.debug(
    operation?.variables,
    `***************** Start Request -----> ${
      operation?.query?.definitions[0]?.operation
    }: ${
      operation.operationName ??
      operation?.query?.definitions[0]?.selectionSet?.selections[0]?.name?.value
    }`,
  );

  return forward(operation);
});

const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = new Date() - operation.getContext().start;

    const {
      name,
      selectionSet,
    } = operation?.query?.definitions[0]?.selectionSet?.selections[0];

    Logger.debug(
      operation?.variables,
      `*****************  End Request ----->  ${
        operation?.query?.definitions[0]?.operation
      }: ${
        operation.operationName ??
        operation?.query?.definitions[0]?.selectionSet?.selections[0]?.name
          ?.value
      } in ${(time / 1000).toFixed(2)} s`,
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

// https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
const defaultOptions = {
  /**
   * This watches the cache store of the query according to the options specified and returns an ObservableQuery.
   * We can subscribe to this ObservableQuery and receive updated results through a GraphQL observer when the cache store changes.
   */
  watchQuery: {
    fetchPolicy: 'network-only',
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

// Apollo Cache
const apolloCache = new InMemoryCache({
  typePolicies: {
    Cart: {
      fields: {
        prices: {
          merge(existing, incoming, { mergeObjects }) {
            // Correct, thanks to invoking nested merge functions.
            return mergeObjects(existing, incoming);
          },
        },
      },
    },
  },
});

// Persistor graphql cache
export const setupCachePersistor = () =>
  new CachePersistor({
    cache: apolloCache,
    storage: AsyncStorage,
    debug: Config.NODE_ENV === 'development',
  });

// Graphql Client
export const setupGraphQlClient = () =>
  new ApolloClient({
    link,
    defaultOptions,
    cache: apolloCache,
  });
