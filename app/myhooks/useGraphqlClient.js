import React from 'react';
import { graphQlClient, cache } from '../graphql';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { CachePersistor, persistCache } from 'apollo3-cache-persist';

export const useGraphqlClient = () => {
  const [graphqlClient, setGraphqlClient] = React.useState(null);

  const persistor = new CachePersistor({
    cache,
    storage: AsyncStorage,
    debounce: 3000,
    debug: Config.NODE_ENV === 'development',
  });

  React.useEffect(() => {
    const loadCache = async () => {
      await persistor.restore();
    };

    loadCache();
    setGraphqlClient(graphQlClient(cache));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { persistor, graphqlClient };
};
