import React from 'react';
import RoundWinner from './RoundWinner';

import { mockData, screens } from '../../../../constants';

const RoundWinnerContainer = ({ navigation }) => {
  const handlePlaySong = song => {
    console.log('play song:', song);
    navigation.navigate(screens.gamePlay.roundWinnerSelection);
  };

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

export default RoundWinnerContainer;
