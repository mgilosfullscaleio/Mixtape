import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import { images } from '../../constants';

const AlertCloseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <Image style={styles.x} source={images.x} />
  </TouchableOpacity>
);

AlertCloseButton.propTypes = {
  onPress: PropTypes.func
};

AlertCloseButton.defaultProps = {
  onPress: () => null
};

export default AlertCloseButton;
