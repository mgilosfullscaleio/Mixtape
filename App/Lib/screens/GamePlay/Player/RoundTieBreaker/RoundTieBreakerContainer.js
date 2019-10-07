import React, { useState } from 'react';
import RoundTieBreaker from './RoundTieBreaker';

import { mockData, screens } from '../../../../constants';

const RoundTieBreakerContainer = ({ navigation }) => {
  const [submittedWinner, setSubmittedWinner] = useState();
  const [selectedWinner, setSelectedWinner] = useState();

  const handlePlaySong = song => console.log('play song:', song);
  const handleSubmitWinner = song => {
    setSubmittedWinner(song);
    setSelectedWinner(undefined);

    navigation.navigate(screens.gamePlay.roundWinnerRandomizer);
  };
  const handleSelectWinner = song => setSelectedWinner(song);

  return (
    <RoundTieBreaker
      songs={mockData.songs.slice(0, 2)}
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

export default RoundTieBreakerContainer;
