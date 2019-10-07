import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, ViewPropTypes } from 'react-native';

import styles from './styles';

const TouchableImage = ({
  style,
  imageStyle,
  source,
  renderBadge,
  ...props
}) => (
  <TouchableOpacity style={style} {...props}>
    <>
      {renderBadge()}
      {source && <Image source={source} style={imageStyle} />}
    </>
  </TouchableOpacity>
);

TouchableImage.propTypes = {
  style: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  source: Image.propTypes.source,
  renderBadge: PropTypes.func
};

TouchableImage.defaultProps = {
  style: null,
  imageStyle: styles.image,
  source: null,
  renderBadge: () => null
};

export default TouchableImage;
