import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import SongSelection from './SongSelection';

import { mockData, screens } from '../../../../constants';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const SongSelectionContainer = (props) => {
  const [submittedSong, setSubmittedSong] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentSongURI, setcurrentSongURI] = useState(null); 

  useEffect(() => {
    props.subscribeGameplayUpdates()
    props.resetGameplayRound()

    return props.unsubscribeGameplayUpdates
  }, [])

  const handlePlaySong = song => {
    console.log('play song:', song);
    //console.log('Previous Song: ' + currentSongURI + '\nSelected Song: ' + song.uri);
    if (!songIsPlaying) {
      setSongIsPlaying(true);
      setcurrentSongURI(song.uri);
      if (currentSongURI != song.uri) {
        props.playSong(song, startPosition);
      } else {
        props.resumeSong();
      }
    } else {
      setSongIsPlaying(false);
      props.pauseSong();
    }
    
    //props.navigation.navigate(screens.gamePlay.roundWinnerSelection);
  };
  const handleSubmitSong = song => {
    const { id, uri, title, singer } = song;
    setSubmittedSong(song);
    setSelectedSong(undefined);
    props.saveSongSelection({ id, uri, title, singer })
  };
  const handleSelectSong = song => {
    setSongIsPlaying(false);
    props.pauseSong();
    console.tron.log("song :", song);
    setSelectedSong(song);
  }

  const handleSeachTextChange = keyword => props.searchSong(keyword, 20)

  return (
    <SongSelection
      players={mockData.playersInGame}
      round={props.selectRound}
      timeLeft={props.selectTimerTick}
      scenario={props.selectCardContent}
      submittedSong={submittedSong}
      selectedSong={selectedSong}
      searchedSongs={props.searchedSongs}
      songIsPlaying={songIsPlaying}
      onPlaySong={handlePlaySong}
      onSelectSong={handleSelectSong}
      onSubmitSong={handleSubmitSong}
      onSearchTextChange={handleSeachTextChange}
    />
  );
};

SongSelectionContainer.propTypes = {
  onLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool,
};

SongSelectionContainer.defaultProps = {
  onLogin: () => null,
  isLoggingIn: false,
};

const mapStateToProps = (state) => ({
  selectRound: GameplaySelectors.selectRound(state),
  searchedSongs: GameplaySelectors.searchedSongs(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  searchSong: (keyword, limit) => dispatch(GameplayActions.searchSong(keyword, limit)),
  playSong: (song) => dispatch(GameplayActions.playSong(song)),
  pauseSong: () => dispatch(GameplayActions.pauseSong()),
  resumeSong: () => dispatch(GameplayActions.resumeSong()),
  subscribeGameplayUpdates: () => dispatch(GameplayActions.subscribeGameplayUpdates()),
  resetGameplayRound: () => dispatch(GameplayActions.resetGameplayRound()),
  unsubscribeGameplayUpdates: () => dispatch(GameplayActions.unsubscribeGameplayUpdates()),
  saveSongSelection: song => dispatch(GameplayActions.saveSongSelection(song))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(SongSelectionContainer)
