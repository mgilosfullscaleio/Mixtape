import { AsyncStorage } from 'react-native';

const FIRST_TIME_KEY = 'ONBOARDING_FIRST_TIME';

const parseBoolean = value => !value || value === 'true';

const isFirstTime = async () => {
  try {
    const value = await AsyncStorage.getItem(FIRST_TIME_KEY);
    const result = parseBoolean(value);

    return result;
  } catch (e) {
    return false;
  }
};

const setFirstTime = (firstTime = true) =>
  AsyncStorage.setItem(FIRST_TIME_KEY, `${firstTime}`);

export default {
  isFirstTime,
  setFirstTime
};
