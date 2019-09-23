import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ActivityIndicator } from 'react-native';
import { Container, Text, TouchableImage } from '../../../components';

import styles from './styles';
import { colors } from '../../../styles';
import { images, localization } from '../../../constants';

const Login = ({ onLoginSpotify, isLoggingIn }) => (
  <Container style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={images.logo} resizeMode="contain" />
      <Text style={styles.title}>{localization.chooseLogin}</Text>
    </View>

    <View style={styles.buttonsContainer}>
      <TouchableImage
        style={styles.button}
        source={images.spotifyButton}
        disabled={isLoggingIn}
        onPress={onLoginSpotify}
      />
    </View>

    {isLoggingIn && <ActivityIndicator size="large" color={colors.white} />}
  </Container>
);

Login.propTypes = {
  onLoginSpotify: PropTypes.func,
  isLoggingIn: PropTypes.bool
};

Login.defaultProps = {
  onLoginSpotify: () => null,
  isLoggingIn: false
};

export default Login;
