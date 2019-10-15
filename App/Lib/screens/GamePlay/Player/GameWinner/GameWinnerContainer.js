import React from 'react';
import { connect } from 'react-redux';
import GameWinner from './GameWinner';

import { mockData, screens } from '../../../../constants';
import { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const GameWinnerContainer = props => {
  const handleQuitGame = () => props.navigation.navigate(screens.main.home)

  return (
    <GameWinner
      players={props.selectPlayers}
      winner={props.selectGameWinnerPlayer}
      onQuitGame={handleQuitGame}
    />
  );
};

const mapStateToProps = (state) => ({
  selectPlayers: GameplaySelectors.selectPlayers(state),
  selectGameWinnerPlayer: GameplaySelectors.selectGameWinnerPlayer(state),
})
 
const mapDispatchToProps = (dispatch) => ({
})
 
export default connect(mapStateToProps, mapDispatchToProps)(GameWinnerContainer)
