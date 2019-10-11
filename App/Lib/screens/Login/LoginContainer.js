import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

import { screens } from '../../constants';
import { onBoardingUtils } from '../../utils';

const LoginContainer = ({ navigation }) => {
  const handleLogin = async () => {
    const isFirstTime = await onBoardingUtils.isFirstTime();
    const destination = isFirstTime
      ? screens.root.onBoarding
      : screens.root.main;

    if (isFirstTime) {
      await onBoardingUtils.setFirstTime(false);
    }

    navigation.navigate(destination);
  };

  return <Login onLoginSpotify={handleLogin} />;
};

LoginContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default LoginContainer;
