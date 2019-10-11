import React from 'react';
import PropTypes from 'prop-types';
import OnBoarding from './OnBoarding';
import { screens } from '../../constants';

const OnBoardingContainer = ({ navigation }) => {
  const navigateToMain = () => navigation.navigate(screens.root.main);

  return <OnBoarding onDone={navigateToMain} onSkip={navigateToMain} />;
};

OnBoardingContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};

export default OnBoardingContainer;
