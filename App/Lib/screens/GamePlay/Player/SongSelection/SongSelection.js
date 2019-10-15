import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Container, Text, PlayerQueue, Alert } from '../../../../components';
import RoundHeader from '../common/RoundHeader';
import PlayerAvatar from '../common/PlayerAvatar';
import SongSearchBar from './components/SongSearchBar';
import SongPlayer from './components/SongPlayer';
import PlayableSongBar from '../common/PlayableSongBar';

import styles from './styles';
import scale from '../../../../utils/scaleUtil';
import { images, localization } from '../../../../constants';
import { useAlertVisible } from '../../../../utils/hooks';

const SongSelection = ({
  players,
  round,
  timeLeft,
  scenario,
  submittedSong,
  selectedSong,
  searchedSongs,
  songIsPlaying,
  songPlayingURI,
  onQuitGame,
  onPlaySong,
  onSelectSong,
  onSubmitSong,
  onSearchTextChange
}) => {
  const { isVisible: isAlertVisible, showAlert, hideAlert } = useAlertVisible();

  const renderHeader = () => <RoundHeader round={round} timeLeft={timeLeft} />;
  const showBadgeSubmittedSongByPlayer = player => {
    const playerSong = player.song || {};
    return !!playerSong.id;
  };

  const handleSubmitSong = () => {
    hideAlert();
    onSubmitSong(selectedSong);
  }

  return (
    <>
      <Alert
        isVisible={isAlertVisible}
        onClose={hideAlert}
        options={[
          {
            title: localization.no,
            onPress: hideAlert
          },
          {
            title: localization.yes,
            onPress: handleSubmitSong,
          },
        ]}>
        <Text style={styles.alertMessage}>{localization.areYouSureToAddSong}</Text>
      </Alert>

      <Container
        contentContainerStyle={styles.container}
        renderHeader={renderHeader}>
        <ScrollView
          style={styles.topContainer}
          contentContainerStyle={styles.topContentContainer}>
          <Text style={styles.scenario}>{scenario}</Text>
        </ScrollView>

        {submittedSong && (
          <View style={styles.bottomContainer}>
            <PlayableSongBar
              containerStyle={styles.songBar}
              song={submittedSong}
              onPlay={onPlaySong}
              isPlaying={songPlayingURI === submittedSong.uri}
            />
          </View>
        )}

        {!submittedSong && (
          <SongSearchBar
            songs={searchedSongs}
            onSongPress={onSelectSong}
            onSearchTextChange={onSearchTextChange}
            initialPositionOffset={
              selectedSong && {
                x: 0,
                y: styles.playerQueueContainer.marginTop + scale(3),
              }
            }
        />
      )}

        {selectedSong && (
          <SongPlayer
            song={selectedSong}
            onPlay={onPlaySong}
            onSubmit={showAlert}
            leftIcon={!songIsPlaying ? images.songBarPlay : images.songBarPause}
          />
        )}

        <View
          style={[
            styles.playerQueueContainer,
            (selectedSong || submittedSong) && styles.noTopMargin, ,
          ]}>
          <PlayerQueue
            joinedPlayers={players}
            maxPlayers={5}
            renderItem={player => (
              <PlayerAvatar
                type="checkmark"
                showBadge={showBadgeSubmittedSongByPlayer(player)}
                player={player}
              />
            )}
          />
        </View>
      </Container>
    </>
  );
};

SongSelection.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    }),
  ).isRequired,
  round: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  scenario: PropTypes.string.isRequired,
  selectedSong: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }),
  submittedSong: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }),
  searchedSongs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      singer: PropTypes.string,
      albumCover: PropTypes.string
    }),
  ),
  songIsPlaying: PropTypes.bool,
  songPlayingURI: PropTypes.string,
  onQuitGame: PropTypes.func,
  onPlaySong: PropTypes.func,
  onSelectSong: PropTypes.func,
  onSubmitSong: PropTypes.func,
  onSearchTextChange: PropTypes.func,
};

SongSelection.defaultProps = {
  selectedSong: undefined,
  submittedSong: undefined,
  searchedSongs: [],
  songIsPlaying: false,
  songPlayingURI: '',
  onQuitGame: () => null,
  onPlaySong: () => null,
  onSelectSong: () => null,
  onSubmitSong: () => null,
  onSearchTextChange: () => null
};

export default SongSelection;
