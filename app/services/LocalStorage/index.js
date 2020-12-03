import storage from './storage';
export * from './StorageKey';

/**
 * Storage Value To AsyncStorage With Time Expired
 * @param {*} value Value
 * @param {*} key Key Storage
 * @param {*} expires Time Expired
 */
export const saveValueWithExpires = (key, value, expires = null) =>
  storage.save({
    key: key,
    data: value,
    expires: expires,
  });

export const save = (key, value) =>
  storage.save({
    key: key,
    data: value,
    expires: null,
  });

export const remove = (key) => {
  if (!key) return;
  storage.remove({
    key,
  });
};

export const get = async (key, options) =>
  new Promise((resolve, reject) =>
    storage
      .load({
        key: key,
      })
      .then((data) => {
        resolve(data);
        Logger.debug(
          data,
          'Service -> LocalStorage -> get Value for key ' + key + ' -> result!',
        );
      })
      .catch((err) => {
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            // reject(err);
            Logger.debug(
              err,
              'Service -> LocalStorage -> get Value for key ' +
                key +
                ' -> NotFoundError!',
            );
            break;
          case 'ExpiredError':
            // TODO
            // reject(err);
            Logger.debug(
              err,
              'Service -> LocalStorage -> get Value for key ' +
                key +
                ' -> ExpiredError!',
            );
            break;
        }

        resolve({});
      }),
  );

export const clearForKey = (key) => {
  storage.clearMapForKey(key);
};
