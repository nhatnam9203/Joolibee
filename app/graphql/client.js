import Config from 'react-native-config';
import _ from 'lodash';
import NavigationService from '../navigation/NavigationService';
import { get, StorageKey, remove } from '@storage';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: Config.GRAPHQL_ENDPOINT });
const cache = new InMemoryCache();

const authLink = setContext(async (req, { headers }) => {
  let myHeaders = headers;
  if (!headers) {
    myHeaders = {
      'Content-Type': 'application/json',
      credentials: 'same-origin',
      Accept: 'application/json',
    };
  }

  // get auth token
  const jwtObject = await get(StorageKey.Token);

  if (jwtObject) {
    const key = jwtObject[StorageKey.Token];
    const jwt = jwtObject[key];
    return {
      headers: {
        ...myHeaders,
        Authorization: jwt ? `Bearer ${jwt}` : '',
        // Authorization: 'Basic bGV2aW5jaToxcWF6QFdTWA==',
      },
    };
  } else {
    return {
      headers: myHeaders,
    };
  }
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
    /**
     * graphQLErrors
     * Do something with a graphQL error
     */
    Logger.debug(graphQLErrors, 'graphQLErrors');
    Logger.debug(operation, 'operation');
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
              errors.push(message);

              break;
            case 'graphql-authorization':
              Logger.debug(graphQLErrors, 'graphql-authorization');
              remove(StorageKey.Token);

              break;
            default:
              errors[index] = message;

              break;
          }
        },
      );

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
