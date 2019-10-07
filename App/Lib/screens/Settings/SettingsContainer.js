import React from 'react';
import Settings from './Settings';

import { mockData } from '../../constants';

const SettingsContainer = ({ navigation }) => {
  const handleLogout = () => {
    console.log('logout');
  };

  return <Settings user={mockData.user} onLogout={handleLogout} />;
};

export default SettingsContainer;
