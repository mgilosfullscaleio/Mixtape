import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import { colors } from '../../styles';
import { images } from '../../constants';
import { ScaledSheet } from '../../utils';
import scale from '../../utils/scaleUtil';

const styles = ScaledSheet.create({
  image: {
    borderColor: colors.white,
    borderWidth: 2
  }
});

const Avatar = ({ style, size, ...props }) => {
  const sizeStyle = {
    width: scale(size),
    height: undefined,
    aspectRatio: 1,
    borderRadius: scale(size / 2)
  };

  return (
    <Image
      style={[styles.image, sizeStyle, style]}
      resizeMode="cover"
      {...props}
    />
  );
};

Avatar.propTypes = {
  style: Image.propTypes.style,
  size: PropTypes.number
};

Avatar.defaultProps = {
  style: null,
  size: 50
};

export default Avatar;
