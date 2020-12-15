import { useLazyQuery } from '@apollo/client';
import { get, save, StorageKey } from '@storage';
import { appUtil, generate } from '@utils';
import RNFetchBlob from 'rn-fetch-blob';
import { STORE_JSON_INFO } from '../gql';

export const useGetStoreInfo = () => {
  const [getStoreJsonData] = useLazyQuery(STORE_JSON_INFO, {
    fetchPolicy: 'network-only',
    onCompleted: async (data) => {
      if (data?.getStoreJsonData) {
        const { url, version } = data?.getStoreJsonData;
        const storeVersion = get(StorageKey.StoreVersion);

        if (storeVersion?.version !== version) {
          // download file store về

          RNFetchBlob.config({
            title: 'store',
            fileCache: true,
            appendExt: 'json',
            description: 'File downloaded by download manager.',
            path: appUtil.getStorePath(),
          })
            .fetch('GET', url, {})
            .then(async (response) => {
              save(StorageKey.StoreVersion, {
                version,
                url,
                path: response.path(),
                modifyAt: generate.timeInMilliseconds(),
              });
            });
        }
      }
    },
  });

  // cache version, va parse here

  return getStoreJsonData;
};
