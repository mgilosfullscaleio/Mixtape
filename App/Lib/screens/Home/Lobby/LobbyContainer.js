import React from 'react';
import Lobby from './Lobby';

import { mockData } from '../../../constants';

const LobbyContainer = () => <Lobby players={mockData.players} />;

export default LobbyContainer;
