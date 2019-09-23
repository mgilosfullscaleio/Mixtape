import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

import { screens } from '../../../constants';

const LoginContainer = ({ navigation }) => (
  <Login onLoginSpotify={() => navigation.navigate(screens.home.lobby)} />
);

LoginContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default LoginContainer;
