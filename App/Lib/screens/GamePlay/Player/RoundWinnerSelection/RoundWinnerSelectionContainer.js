import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { mockData, screens } from '../../../../constants';
import RoundWinnerSelection from './RoundWinnerSelection';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const RoundWinnerSelectionContainer = (props) => {
  const [submittedWinner, setSubmittedWinner] = useState();
  const [selectedWinner, setSelectedWinner] = useState();

  useEffect(() => {
    props.subscribeGameplayUpdates()
    
    return props.unsubscribeGameplayUpdates
  }, [])

  const handlePlaySong = song => console.log('play song:', song);
  const handleSubmitWinner = song => {
    setSubmittedWinner(song);
    setSelectedWinner(undefined);

    props.navigation.navigate(screens.gamePlay.roundWinner);
  };
  const handleSelectWinner = song => setSelectedWinner(song);

  return (
    <RoundWinnerSelection
      songs={props.selectPlayerSubmittedSongs}
      players={mockData.playersInGame}
      timeLeft={props.selectTimerTick}
      scenario={props.selectCardContent}
      submittedWinner={submittedWinner}
      userSongEntry={props.selectPlayerSubmittedSong}
      selectedWinner={selectedWinner}
      onPlaySong={handlePlaySong}
      onSelectWinner={handleSelectWinner}
      onSubmitWinner={handleSubmitWinner}
    />
  );
};

const mapStateToProps = (state) => ({
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  selectPlayerSubmittedSong: GameplaySelectors.selectPlayerSubmittedSong(state),
  selectPlayerSubmittedSongs: GameplaySelectors.selectPlayerSubmittedSongs(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  subscribeGameplayUpdates: () => dispatch(GameplayActions.subscribeGameplayUpdates()),
  unsubscribeGameplayUpdates: () => dispatch(GameplayActions.unsubscribeGameplayUpdates()),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerSelectionContainer)
