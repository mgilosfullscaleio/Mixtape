import React from 'react';
import RoundWinnerRandomizer from './RoundWinnerRandomizer';

import { mockData } from '../../../../constants';

const RoundWinnerRandomizerContainer = () => (
  <RoundWinnerRandomizer
    songs={mockData.songs}
    players={mockData.playersInGame}
    scenario={mockData.scenario}
  />
);

export default RoundWinnerRandomizerContainer;
