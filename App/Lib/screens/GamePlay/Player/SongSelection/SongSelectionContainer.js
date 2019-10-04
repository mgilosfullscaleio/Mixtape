import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import SongSelection from './SongSelection';

import { mockData, screens } from '../../../../constants';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const SongSelectionContainer = (props) => {
  const [submittedSong, setSubmittedSong] = useState();
  const [selectedSong, setSelectedSong] = useState();

  useEffect(() => {
    props.subscribeGameplayUpdates()
    
    //return //props.unsubscribeGameplayUpdates
  }, [])

  const handlePlaySong = song => {
    console.log('play song:', song);
    props.navigation.navigate(screens.gamePlay.roundWinnerSelection);
  };
  const handleSubmitSong = song => {
    const { uri, title, singer } = song;
    setSubmittedSong(song);
    setSelectedSong(undefined);
    props.saveSongSelection({ uri, title, singer })
  };
  const handleSelectSong = song => {
    console.tron.log("song :", song);
    setSelectedSong(song);
  }

  const handleSeachTextChange = keyword => props.searchSong(keyword, 20)

  return (
    <SongSelection
      players={mockData.playersInGame}
      round={1}
      timeLeft={props.selectTimerTick}
      scenario={props.selectCardContent}
      submittedSong={submittedSong}
      selectedSong={selectedSong}
      searchedSongs={props.searchedSongs}
      onPlaySong={handlePlaySong}
      onSelectSong={handleSelectSong}
      onSubmitSong={handleSubmitSong}
      onSearchTextChange={handleSeachTextChange}
    />
  );
};

SongSelectionContainer.propTypes = {
  onLogin: PropTypes.func,
  searchSong: PropTypes.func,
  saveSongSelection: PropTypes.func,
  isLoggingIn: PropTypes.bool,
};

SongSelectionContainer.defaultProps = {
  onLogin: () => null,
  searchSong: () => null,
  saveSongSelection: () => null,
  isLoggingIn: false,
};

const mapStateToProps = (state) => ({
  searchedSongs: GameplaySelectors.searchedSongs(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  searchSong: (keyword, limit) => dispatch(GameplayActions.searchSong(keyword, limit)),
  subscribeGameplayUpdates: () => dispatch(GameplayActions.subscribeGameplayUpdates()),
  unsubscribeGameplayUpdates: () => dispatch(GameplayActions.unsubscribeGameplayUpdates()),
  saveSongSelection: song => dispatch(GameplayActions.saveSongSelection(song))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(SongSelectionContainer)
