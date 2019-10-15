/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import {
  Container,
  Text,
  PlayerQueue,
  TouchableImage,
  Alert
} from '../../../../components';
import RoundHeader from '../common/RoundHeader';
import PlayerAvatar from '../common/PlayerAvatar';
import PlayableSongBar from '../common/PlayableSongBar';

import styles from './styles';
import { images, localization } from '../../../../constants';
import { useAlertVisible } from '../../../../utils/hooks';

const RoundWinnerSelection = ({
  isLoading,
  songs,
  players,
  timeLeft,
  scenario,
  submittedWinner,
  selectedWinner,
  userSongEntry,
  onQuitGame,
  onPlaySong,
  onSelectWinner,
  onSubmitWinner,
  songIsPlaying,
  songPlayingURI,
  disableSubmission
}) => {
  const { isVisible, showAlert, hideAlert } = useAlertVisible();

  const handleSubmitWinner = () => {
    if (selectedWinner) {
      onSubmitWinner(selectedWinner);
    } else {
      showAlert();
    }
  };

  const renderHeader = () => (
    <RoundHeader title={localization.chooseWinner} rightElementType={isLoading ? 'loading' : 'timer' } timeLeft={timeLeft} />
  );
  const showBadgeSubmittedVoteByPlayer = player => {
    const playerVote = player.vote
    return !!playerVote;
  }

  const renderSongBarItem = ({ item }) => {
    const isUserEntry = userSongEntry && item.id === userSongEntry.id;

    return (
      <PlayableSongBar
        containerStyle={isUserEntry && styles.disabledSongBarContainer}
        song={item}
        highlighted={selectedWinner && item.id === selectedWinner.id}
        onPlay={onPlaySong}
        //isPlaying={songPlayingURI === item.uri}
        isPlaying={songPlayingURI === item.uri && songIsPlaying}
        onPress={submittedWinner || isUserEntry ? undefined : onSelectWinner}
      />
    );
  };

  return (
    <>
      <Alert
        isVisible={isVisible}
        onClose={hideAlert}
        options={[
          {
            title: localization.okay,
            onPress: hideAlert
          }
        ]}
      >
        <Text style={styles.alertMessage}>{localization.pleaseSelectSong}</Text>
      </Alert>

      <Container
        contentContainerStyle={styles.container}
        renderHeader={renderHeader}
      >
        <FlatList
          style={styles.listContainer}
          data={songs}
          extraData={{ songs, selectedWinner }}
          ListHeaderComponent={<Text style={styles.scenario}>{scenario}</Text>}
          ListHeaderComponentStyle={styles.scenarioContainer}
          renderItem={renderSongBarItem}
          keyExtractor={item => item.id}
        />

        {!disableSubmission && 
          <View style={styles.submitButtonContainer}>
            <TouchableImage
              source={images.submitButton}
              style={styles.submitButton}
              onPress={handleSubmitWinner}
            />
          </View>
        }

        <View style={styles.playerQueueContainer}>
          <PlayerQueue
            joinedPlayers={players}
            maxPlayers={players.length}
            renderItem={player => (
              <PlayerAvatar player={player} type="checkmark" showBadge={showBadgeSubmittedVoteByPlayer(player)} />
            )}
          />
        </View>
      </Container>
    </>
  );
};

RoundWinnerSelection.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      singer: PropTypes.string,
      albumCover: PropTypes.string
    })
  ),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  timeLeft: PropTypes.number.isRequired,
  scenario: PropTypes.string.isRequired,
  submittedWinner: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }),
  selectedWinner: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }),
  userSongEntry: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }),
  onQuitGame: PropTypes.func,
  onPlaySong: PropTypes.func,
  onSelectWinner: PropTypes.func,
  onSubmitWinner: PropTypes.func,
  songIsPlaying: PropTypes.bool,
  songPlayingURI: PropTypes.string,
  disableSubmission: PropTypes.bool
};

RoundWinnerSelection.defaultProps = {
  songs: [],
  submittedWinner: undefined,
  selectedWinner: undefined,
  userSongEntry: undefined,
  songIsPlaying: false,
  songPlayingURI: '',
  onQuitGame: () => null,
  onPlaySong: () => null,
  onSelectWinner: () => null,
  onSubmitWinner: () => null,
  disableSubmission: false
};

export default RoundWinnerSelection;
