import React from 'react';
import PropTypes from 'prop-types';
import Shop from './Shop';

import { mockData } from '../../constants';

const ShopContainer = props => <Shop user={mockData.user} {...props} />;

ShopContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default ShopContainer;
