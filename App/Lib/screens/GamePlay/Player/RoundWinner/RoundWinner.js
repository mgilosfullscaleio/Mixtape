import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Container, Text, PlayerQueue } from '../../../../components';
import RoundHeader from '../common/RoundHeader';
import PlayerAvatar from '../common/PlayerAvatar';

import styles from './styles';
import { localization } from '../../../../constants';
import PlayableSongBar from '../common/PlayableSongBar';

const RoundWinner = ({
  isLoading,
  players,
  round,
  timeLeft,
  scenario,
  winner,
  onQuitGame,
  onPlaySong
}) => {
  const renderHeader = () => (
    <RoundHeader title={localization.winner} rightElementType={isLoading ? 'loading' : 'timer' } timeLeft={timeLeft} />
  );

  return (
    <Container
      contentContainerStyle={styles.container}
      renderHeader={renderHeader}
    >
      <ScrollView
        style={styles.topContainer}
        contentContainerStyle={styles.topContentContainer}
      >
        <Text style={styles.scenario}>{scenario}</Text>
      </ScrollView>

      <Container contentContainerStyle={styles.bottomContainer}>
        <Text style={styles.congratulations}>
          {localization.congratulations}
        </Text>
        <PlayerAvatar
          containerStyle={styles.winnerAvatar}
          titleStyle={styles.winnerAvatarName}
          size={50}
          player={winner}
        />

        <PlayableSongBar
          song={winner.song}
          highlighted
          onPlay={onPlaySong}
          pausable={false}
        />
      </Container>

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

RoundWinner.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  round: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  scenario: PropTypes.string.isRequired,
  winner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tapes: PropTypes.number,
    profileImage: PropTypes.string,
    song: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      singer: PropTypes.string
    })
  }).isRequired,
  onQuitGame: PropTypes.func,
  onPlaySong: PropTypes.func
};

RoundWinner.defaultProps = {
  onQuitGame: () => null,
  onPlaySong: () => null
};

export default RoundWinner;
