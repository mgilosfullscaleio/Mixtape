import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Container,
  Text,
  PlayerQueue,
  Button,
  Header
} from '../../../../components';
import PlayerAvatar from '../common/PlayerAvatar';

import styles from './styles';
import { localization } from '../../../../constants';

const GameWinner = ({ players, winner, onQuitGame }) => {
  const renderHeader = () => <Header title={localization.overallWinner} />;

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <View style={styles.content}>
        <Text style={styles.congratulations}>
          {localization.congratulations}
        </Text>

        <PlayerAvatar
          containerStyle={styles.winnerAvatar}
          titleStyle={styles.winnerAvatarName}
          size={100}
          player={winner}
        />

        <Button
          style={styles.button}
          title={localization.quitGame}
          onPress={onQuitGame}
        />
      </View>

      <View style={styles.playerQueueContainer}>
        <PlayerQueue
          joinedPlayers={players}
          maxPlayers={players.length}
          renderItem={player => <PlayerAvatar player={player} showBadge />}
        />
      </View>
    </Container>
  );
};

GameWinner.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  winner: PropTypes.shape({
    name: PropTypes.string,
    tapes: PropTypes.number,
    profileImage: PropTypes.string
  }).isRequired,
  onQuitGame: PropTypes.func
};

GameWinner.defaultProps = {
  onQuitGame: () => null
};

export default GameWinner;
