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
    paddingVertical: '10@s',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.lightGray,
    backgroundColor: colors.lighterGray
  },

  title: {
    textAlign: 'center',
    fontSize: '22@s',
    color: colors.mediumGray
  }
});

const Button = ({ style, title, titleStyle, ...props }) => (
  <TouchableOpacity style={[styles.container, style]} {...props}>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  titleStyle: BaseText.propTypes.style
};

Button.defaultProps = {
  style: null,
  titleStyle: null
};

export default Button;
