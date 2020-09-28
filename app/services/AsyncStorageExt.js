import AsyncStorage from '@react-native-community/async-storage';

const jwt_key = '@storage_jwt_key';

export const saveJwtToken = async (value) => {
  try {
    if (value) await AsyncStorage.setItem(jwt_key, value);
    else await AsyncStorage.removeItem(jwt_key);
  } catch (e) {
    // saving error
  }
};

export const getJwtToken = async () => {
  try {
    const value = await AsyncStorage.getItem(jwt_key);
    return value;
  } catch (e) {
    // error reading value
    return null;
  }
};
