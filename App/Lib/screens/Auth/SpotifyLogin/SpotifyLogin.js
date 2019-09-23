import React from 'react';
import PropTypes from 'prop-types';
import { Image, ActivityIndicator } from 'react-native';
import { Container, Text, TouchableImage } from '../../../components';

import styles from './styles';
import { colors } from '../../../styles';
import { images, localization } from '../../../constants';

const SpotifyLogin = ({ onLogin, isLoggingIn }) => (
  <Container style={styles.container}>
    <Image style={styles.logo} source={images.logo} resizeMode="contain" />
    <Text style={styles.title}>{localization.connectToSpotify}</Text>

    <TouchableImage
      style={styles.button}
      imageStyle={styles.buttonImage}
      source={images.spotify}
      disabled={isLoggingIn}
      onPress={onLogin}
    />

    <Text style={styles.requireSpotify}>
      {localization.requireSpotifyPremium}
    </Text>

    {isLoggingIn && (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color={colors.white}
      />
    )}
  </Container>
);

SpotifyLogin.propTypes = {
  onLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool
};

SpotifyLogin.defaultProps = {
  onLogin: () => null,
  isLoggingIn: false
};

export default SpotifyLogin;
