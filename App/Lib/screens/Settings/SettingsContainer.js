import React from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings';

import { mockData, screens } from '../../constants';

const SettingsContainer = ({ navigation }) => {
  const handleHelp = () => navigation.navigate(screens.root.onBoarding);

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <Settings
      user={mockData.user}
      onHelp={handleHelp}
      onLogout={handleLogout}
    />
  );
};

SettingsContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default SettingsContainer;
