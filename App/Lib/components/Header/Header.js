import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text as BaseText } from 'react-native';
import Text from '../Text';

import styles from './styles';

const Header = ({
  title,
  style,
  titleStyle,
  left,
  leftContainerStyle,
  right,
  rightContainerStyle
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={leftContainerStyle}>{left}</View>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={rightContainerStyle}>{right}</View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  titleStyle: BaseText.propTypes.style,
  left: PropTypes.node,
  leftContainerStyle: ViewPropTypes.style,
  right: PropTypes.node,
  rightContainerStyle: ViewPropTypes.style
};

Header.defaultProps = {
  style: null,
  titleStyle: null,
  left: null,
  leftContainerStyle: null,
  right: null,
  rightContainerStyle: null
};

export default Header;
