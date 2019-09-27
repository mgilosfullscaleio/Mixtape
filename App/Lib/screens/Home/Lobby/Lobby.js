import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import {
  Container,
  TouchableImage,
  Header,
  ListItem
} from '../../../components';
import { connect } from 'react-redux'

import { images, localization } from '../../../constants';
import styles from './styles';
import PlayerQueue from '../../../components/PlayerQueue/PlayerQueue';
import LobbyActions, { LobbySelectors } from '../../../../Redux/LobbyRedux'

const Lobby = props => {
  const renderHeader = () => <Header title={localization.loadingGame} />;

  useEffect(() => {
    props.subscribePlayerJoin()

    return props.unsubscribePlayerJoin
  }, [])

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <PlayerQueue joinedPlayers={props.players} maxPlayers={props.maxPlayers} showTitle />

      <View style={styles.mechanicsContainer}>
        <ListItem
          leftIcon={images.globe}
          leftIconStyle={styles.mechanicItemIcon1}
          title={localization.waitingForOthers}
        />

        <ListItem
          containerStyle={styles.mechanicItem}
          leftIcon={images.stopwatch}
          leftIconStyle={styles.mechanicItemIcon1}
          title={localization.playersHave60Seconds}
        />

        <ListItem
          containerStyle={styles.mechanicItem}
          leftIconStyle={styles.mechanicItemIcon2}
          leftIcon={images.crownedTape}
          title={
            <>
              {localization.gameWinnerReceives}
              <Image
                source={images.tape}
                style={styles.crownedTapeImage}
                resizeMode="contain"
              />
              {localization.rewards}
            </>
          }
        />

        <TouchableImage
          source={images.quitGameButton}
          style={styles.quitGameButton}
          resizeMode="contain"
          onPress={props.quitLobby}
        />
      </View>
    </Container>
  );
};

Lobby.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  onQuitGame: PropTypes.func
};

Lobby.defaultProps = {
  quitLobby: () => null
};

const mapStateToProps = (state) => ({
  players: LobbySelectors.selectPlayers(state),
  maxPlayers: LobbySelectors.selectMaxPlayers(state)
})
 
const mapDispatchToProps = (dispatch) => ({
  quitLobby: () => dispatch(LobbyActions.quitOpenMatch()),
  subscribePlayerJoin: () => dispatch(LobbyActions.subscribePlayerJoin()),
  unsubscribePlayerJoin: () => dispatch(LobbyActions.unsubscribePlayerJoin())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
