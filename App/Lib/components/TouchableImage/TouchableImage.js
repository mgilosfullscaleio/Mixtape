import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import Text from '../Text';

import styles from './styles';

const TouchableImage = ({
  style,
  imageStyle,
  source,
  showBadge,
  badgeCount,
  badgeStyle,
  badgeTextStyle,
  ...props
}) => {
  const renderBadge = () => (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.badgeText, badgeTextStyle]}>{badgeCount}</Text>
    </View>
  );

  return (
    <TouchableOpacity style={style} {...props}>
      <>
        {showBadge && renderBadge()}
        {source && <Image source={source} style={imageStyle} />}
      </>
    </TouchableOpacity>
  );
};

TouchableImage.propTypes = {
  style: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  source: PropTypes.number.isRequired,
  showBadge: PropTypes.bool,
  badgeCount: PropTypes.number,
  badgeStyle: ViewPropTypes.style,
  badgeTextStyle: Text.propTypes.style
};

TouchableImage.defaultProps = {
  style: null,
  imageStyle: styles.image,
  showBadge: false,
  badgeCount: 0,
  badgeStyle: null,
  badgeTextStyle: null
};

export default TouchableImage;
