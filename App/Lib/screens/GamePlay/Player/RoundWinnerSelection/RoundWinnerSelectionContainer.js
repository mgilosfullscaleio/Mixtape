import React, { useState } from 'react';
import RoundWinnerSelection from './RoundWinnerSelection';

import { mockData, screens } from '../../../../constants';

const RoundWinnerSelectionContainer = ({ navigation }) => {
  const [submittedWinner, setSubmittedWinner] = useState();
  const [selectedWinner, setSelectedWinner] = useState();

  const handlePlaySong = song => console.log('play song:', song);
  const handleSubmitWinner = song => {
    setSubmittedWinner(song);
    setSelectedWinner(undefined);

    navigation.navigate(screens.gamePlay.roundWinner);
  };
  const handleSelectWinner = song => setSelectedWinner(song);

  return (
    <RoundWinnerSelection
      songs={mockData.songs}
      players={mockData.playersInGame}
      timeLeft={60}
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

export default RoundWinnerSelectionContainer;
