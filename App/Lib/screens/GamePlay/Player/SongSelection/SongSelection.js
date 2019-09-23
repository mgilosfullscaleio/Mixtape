import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Button } from 'react-native';
import { Container, Text, PlayerQueue } from '../../../../components';
import RoundHeader from './components/RoundHeader';
import PlayerAvatar from './components/PlayerAvatar';
import SongBar from './components/SongBar';
import SongSearchBar from './components/SongSearchBar';

import styles from './styles';

const SongSelection = ({
  players,
  onQuitGame,
  round,
  timeLeft,
  scenario,
  selectedSong
}) => {
  const renderHeader = () => <RoundHeader round={round} timeLeft={timeLeft} />;

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

      {selectedSong && (
        <ScrollView style={styles.bottomContainer}>
          <SongBar song={selectedSong} />
        </ScrollView>
      )}

      <SongSearchBar />

      <View style={styles.playerQueueContainer}>
        <PlayerQueue
          joinedPlayers={players}
          maxPlayers={5}
          renderItem={player => <PlayerAvatar player={player} />}
        />
      </View>
    </Container>
  );
};

SongSelection.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  onQuitGame: PropTypes.func,
  round: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  scenario: PropTypes.string.isRequired,
  selectedSong: PropTypes.shape({
    title: PropTypes.string,
    singer: PropTypes.string
  })
};

SongSelection.defaultProps = {
  onQuitGame: () => null,
  selectedSong: null
};

export default SongSelection;
