import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { mockData, screens } from '../../../../constants';
import RoundWinnerSelection from './RoundWinnerSelection';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const RoundWinnerSelectionContainer = (props) => {
  const [selectedWinner, setSelectedWinner] = useState();

  useEffect(() => {
    props.subscribeVotingRoundUpdates()

    if(props.selectPlayerVotedSong) {
      setSelectedWinner(props.selectPlayerVotedSong)
      
    }
    
    return props.unsubscribeGameplayUpdates
  }, [])

  const handlePlaySong = song => console.log('play song:', song);
  const handleSubmitWinner = ({ playerId }) => props.voteRoundWinner(playerId);
  const handleSelectWinner = song => setSelectedWinner(song);

  return (
    <RoundWinnerSelection
      songs={props.selectPlayerSubmittedSongs}
      players={mockData.playersInGame}
      timeLeft={props.selectTimerTick}
      scenario={props.selectCardContent}
      userSongEntry={props.selectPlayerSubmittedSong}
      selectedWinner={selectedWinner}
      onPlaySong={handlePlaySong}
      onSelectWinner={handleSelectWinner}
      onSubmitWinner={handleSubmitWinner}
      disableSubmission={!!props.selectPlayerVotedSong}
    />
  );
};

const mapStateToProps = (state) => ({
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  selectPlayerSubmittedSong: GameplaySelectors.selectPlayerSubmittedSong(state),
  selectPlayerSubmittedSongs: GameplaySelectors.selectPlayerSubmittedSongs(state),
  selectPlayerVotedSong: GameplaySelectors.selectPlayerVotedSong(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  subscribeVotingRoundUpdates: () => dispatch(GameplayActions.subscribeVotingRoundUpdates()),
  unsubscribeGameplayUpdates: () => dispatch(GameplayActions.unsubscribeGameplayUpdates()),
  voteRoundWinner: (playerId) => dispatch(GameplayActions.voteRoundWinner(playerId))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerSelectionContainer)
