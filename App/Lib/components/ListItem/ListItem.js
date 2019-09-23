import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ViewPropTypes, Text as BaseText } from 'react-native';
import Text from '../Text';

import styles from './styles';

const ListItem = ({
  containerStyle,
  leftIcon,
  leftIconStyle,
  title,
  titleStyle
}) => (
  <View style={[styles.container, containerStyle]}>
    {leftIcon && (
      <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />
    )}

    <Text style={[styles.title, titleStyle]}>{title}</Text>
  </View>
);

ListItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  leftIcon: PropTypes.number,
  leftIconStyle: Image.propTypes.style,
  title: PropTypes.node.isRequired,
  titleStyle: BaseText.propTypes.style
};

ListItem.defaultProps = {
  containerStyle: null,
  leftIcon: null,
  leftIconStyle: null,
  titleStyle: null
};

export default ListItem;
