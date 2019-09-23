import React from 'react';
import PropTypes from 'prop-types';
import Home from './Home';

import { mockData } from '../../../constants';

const HomeContainer = props => <Home user={mockData.user} {...props} />;

HomeContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default HomeContainer;
