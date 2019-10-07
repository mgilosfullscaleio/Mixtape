import React from 'react';
import GameWinner from './GameWinner';

import { mockData, screens } from '../../../../constants';

const GameWinnerContainer = ({ navigation }) => {
  const handleQuitGame = () => {
    console.log('quit game');
  };

  return (
    <GameWinner
      players={mockData.playersInGame}
      winner={mockData.playersInGame[0]}
      onQuitGame={handleQuitGame}
    />
  );
};

export default GameWinnerContainer;
