import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ActivityIndicator } from 'react-native';
import { Container, Text, TouchableImage } from '../../../components';
import { connect } from 'react-redux'

import styles from './styles';
import { colors } from '../../../styles';
import { images, localization } from '../../../constants';
import AuthActions, { AuthSelectors } from '../../../../Redux/AuthRedux';

const Login = (props) => (
  <Container style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={images.logo} resizeMode="contain" />
      {!props.isLoading && <Text style={styles.title}>{localization.chooseLogin}</Text> }
    </View>

    <View style={[styles.buttonsContainer, { opacity: Number(!props.isLoading) }]}>
      <TouchableImage
        style={styles.button}
        source={images.spotifyButton}
        disabled={props.isLoading}
        onPress={props.loginSpotify}
      />
    </View>

    {props.isLoading && <ActivityIndicator size="large" color={colors.white} />}
  </Container>
);

Login.propTypes = {
  onLoginSpotify: PropTypes.func,
  isLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isLoading: AuthSelectors.isLoading(state)
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  loginSpotify: () => dispatch(AuthActions.loginSpotify())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Login)
