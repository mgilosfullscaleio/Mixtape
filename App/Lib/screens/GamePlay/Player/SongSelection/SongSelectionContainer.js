import React from 'react';
import SongSelection from './SongSelection';

import { mockData } from '../../../../constants';

const SongSelectionContainer = () => (
  <SongSelection
    players={mockData.playersInGame}
    selectedSong={mockData.songs[0]}
    round={1}
    timeLeft={60}
    scenario={
      mockData.scenario +
      mockData.scenario +
      mockData.scenario +
      mockData.scenario +
      mockData.scenario
    }
  />
);

export default SongSelectionContainer;
