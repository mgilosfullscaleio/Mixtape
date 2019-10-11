import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  ViewPropTypes,
  Text as BaseText
} from 'react-native';
import Text from '../Text';

import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: '10@s',
    borderBottomRightRadius: '10@s',
    paddingVertical: '16@s',
    backgroundColor: colors.lightOrange
  },

  title: {
    fontSize: '30@s',
    textAlign: 'center',
    color: colors.white
  },

  left: {
    marginRight: '1@s',
    borderBottomRightRadius: 0
  },

  right: {
    borderBottomLeftRadius: 0
  },

  middle: {
    marginRight: '1@s',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});

const AlertButton = ({ style, titleStyle, title, onPress, type }) => {
  const typeStyle = styles[type];

  return (
    <TouchableOpacity
      style={[styles.container, typeStyle, style]}
      onPress={onPress}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

AlertButton.propTypes = {
  style: ViewPropTypes.style,
  titleStyle: BaseText.propTypes.style,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(['left', 'middle', 'right', 'single'])
};

AlertButton.defaultProps = {
  style: {},
  titleStyle: {},
  onPress: () => null,
  type: 'single'
};

export default AlertButton;
