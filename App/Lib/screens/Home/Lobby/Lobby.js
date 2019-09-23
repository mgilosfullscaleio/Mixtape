import React from 'react';
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
import { LobbySelectors } from '../../../../Redux/LobbyRedux'

const Lobby = ({ players, onQuitGame }) => {
  const renderHeader = () => <Header title={localization.loadingGame} />;

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <PlayerQueue joinedPlayers={players} maxPlayers={5} showTitle />

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
          onPress={onQuitGame}
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
  onQuitGame: () => null
};

const mapStateToProps = (state) => ({
  players: LobbySelectors.selectPlayers(state)
})
 
const mapDispatchToProps = (dispatch) => ({
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
