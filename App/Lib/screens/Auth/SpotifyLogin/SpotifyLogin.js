import React from 'react';
import PropTypes from 'prop-types';
import { Image, ActivityIndicator } from 'react-native';
import { Container, Text, TouchableImage } from '../../../components';
import { connect } from 'react-redux'
import styles from './styles';
import { colors } from '../../../styles';
import { images, localization } from '../../../constants';
import AuthActions, { AuthSelectors } from '../../../../Redux/AuthRedux';

const SpotifyLogin = (props) => (
  <Container style={styles.container}>
    <Image style={styles.logo} source={images.logo} resizeMode="contain" />
    <Text style={styles.title}>{localization.connectToSpotify}</Text>

    <TouchableImage
      style={styles.button}
      imageStyle={styles.buttonImage}
      source={images.spotify}
      disabled={props.isLoading}
      onPress={props.loginSpotify}
    />

    <Text style={styles.requireSpotify}>
      {localization.requireSpotifyPremium}
    </Text>

    {props.isLoading && (
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

const mapStateToProps = (state) => ({
  isLoading: AuthSelectors.isLoading(state)
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  loginSpotify: () => dispatch(AuthActions.loginSpotify())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(SpotifyLogin)
