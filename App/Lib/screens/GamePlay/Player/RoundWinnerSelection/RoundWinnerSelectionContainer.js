import React, { useState, useEffect } from 'react';
import RoundWinnerSelection from './RoundWinnerSelection';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux'
import { connect } from 'react-redux'
import { mockData, screens } from '../../../../constants';

const RoundWinnerSelectionContainer = props => {
  const [submittedWinner, setSubmittedWinner] = useState();
  const [selectedWinner, setSelectedWinner] = useState();

  const handlePlaySong = song => console.log('play song:', song);
  const handleSubmitWinner = song => {
    setSubmittedWinner(song);
    setSelectedWinner(undefined);

    props.navigation.navigate(screens.gamePlay.roundWinner);
  };
  const handleSelectWinner = song => setSelectedWinner(song);

  useEffect(() => {
    props.subscribeVotingRoundUpdates()
    
    return props.unsubscribeGameplayUpdates
  }, [])

  return (
    <RoundWinnerSelection
      songs={mockData.songs}
      players={mockData.playersInGame}
      timeLeft={props.selectTimerTick}
      scenario={mockData.scenario}
      submittedWinner={submittedWinner}
      userSongEntry={mockData.songs[0]}
      selectedWinner={selectedWinner}
      onPlaySong={handlePlaySong}
      onSelectWinner={handleSelectWinner}
      onSubmitWinner={handleSubmitWinner}
    />
  );
};

const mapStateToProps = state => ({
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
})
 
const mapDispatchToProps = dispatch => ({
  subscribeVotingRoundUpdates: () => dispatch(GameplayActions.subscribeVotingRoundUpdates()),
  unsubscribeGameplayUpdates: () => dispatch(GameplayActions.unsubscribeGameplayUpdates())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerSelectionContainer)
