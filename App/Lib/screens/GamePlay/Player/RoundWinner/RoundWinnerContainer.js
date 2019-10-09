import React, { useState, useEffect } from 'react';
import RoundWinner from './RoundWinner';
import { connect } from 'react-redux'
import { mockData, screens } from '../../../../constants';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const RoundWinnerContainer = props => {
  const handlePlaySong = song => {
    console.log('play song:', song);
    props.navigation.navigate(screens.gamePlay.roundTieBreaker);
  };

  useEffect(() => {
    props.playRoundWinnerSong()

    return props.stopPlayingSong
  }, [])

  return (
    <RoundWinner
      players={mockData.playersInGame}
      round={props.selectRound}
      timeLeft={props.selectTimerTick}
      scenario={props.selectCardContent}
      winner={props.selectRoundWinnerPlayer}
      //onPlaySong={handlePlaySong}
    />
  );
};

const mapStateToProps = (state) => ({
  selectRound: GameplaySelectors.selectRound(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
  selectRoundWinnerPlayer: GameplaySelectors.selectRoundWinnerPlayer(state),
  selectWinningSong: GameplaySelectors.selectWinningSong(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  playRoundWinnerSong: () => dispatch(GameplayActions.playRoundWinnerSong()),
  stopPlayingSong: () => dispatch(GameplayActions.pauseSong())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerContainer)
