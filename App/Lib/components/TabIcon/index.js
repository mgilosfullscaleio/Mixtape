import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import { images } from '../../constants';
import scale from '../../utils/scaleUtil';
import { colors } from '../../styles';

const TabIcon = ({ style, name, size, color }) => {
  const customStyle = {
    width: scale(size),
    height: undefined,
    aspectRatio: 1,
    tintColor: color
  };

  return (
    <Image
      style={[customStyle, style]}
      source={images[name]}
      resizeMode="contain"
    />
  );
};

TabIcon.propTypes = {
  style: Image.propTypes.style,
  name: PropTypes.oneOf(['home', 'settings', 'shop', 'friends']).isRequired,
  size: PropTypes.number,
  color: PropTypes.string
};

TabIcon.defaultProps = {
  style: null,
  size: 25,
  color: colors.white
};

export default TabIcon;
