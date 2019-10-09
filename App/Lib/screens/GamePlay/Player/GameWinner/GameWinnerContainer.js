import React from 'react';
import { connect } from 'react-redux';
import GameWinner from './GameWinner';

import { mockData, screens } from '../../../../constants';
import { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const GameWinnerContainer = props => {
  const handleQuitGame = () => {
    console.log('quit game');
  };

  return (
    <GameWinner
      players={mockData.playersInGame}
      winner={props.selectGameWinnerPlayer}
      onQuitGame={handleQuitGame}
    />
  );
};

const mapStateToProps = (state) => ({
  selectGameWinnerPlayer: GameplaySelectors.selectGameWinnerPlayer(state),
})
 
const mapDispatchToProps = (dispatch) => ({
})
 
export default connect(mapStateToProps, mapDispatchToProps)(GameWinnerContainer)
