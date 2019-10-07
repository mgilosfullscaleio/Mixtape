import React from 'react';
import PropTypes from 'prop-types';
import { Image, ViewPropTypes } from 'react-native';
import TouchableImage from '../TouchableImage';

import { colors } from '../../styles';
import { images } from '../../constants';
import { ScaledSheet } from '../../utils';
import scale from '../../utils/scaleUtil';

const styles = ScaledSheet.create({
  bordered: {
    borderColor: colors.white,
    borderWidth: 2
  }
});

const Avatar = ({ style, imageStyle, size, onPress, bordered, ...props }) => {
  const sizeStyle = {
    width: scale(size),
    height: undefined,
    aspectRatio: 1,
    borderRadius: scale(size / 2)
  };

  return (
    <TouchableImage
      style={style}
      imageStyle={[bordered && styles.bordered, sizeStyle, imageStyle]}
      resizeMode="cover"
      defaultSource={images.avatarPlaceholder}
      disabled={!onPress}
      onPress={onPress}
      {...props}
    />
  );
};

Avatar.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number,
  onPress: PropTypes.func,
  bordered: PropTypes.bool
};

Avatar.defaultProps = {
  style: null,
  size: 50,
  onPress: null,
  bordered: true
};

export default Avatar;
