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
  }, [])

  return (
    <RoundWinner
      players={mockData.playersInGame}
      round={1}
      timeLeft={35}
      scenario={mockData.scenario}
      topVotedSong={mockData.songs[0]}
      onPlaySong={handlePlaySong}
    />
  );
};

const mapStateToProps = (state) => ({
})
 
const mapDispatchToProps = (dispatch) => ({
  playRoundWinnerSong: () => dispatch(GameplayActions.playRoundWinnerSong()),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerContainer)
