import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, StyleSheet, ViewPropTypes } from 'react-native';

import { images } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const Container = ({
  children,
  renderHeader,
  containerStyle,
  contentContainerStyle
}) => (
  <ImageBackground
    style={[styles.container, containerStyle]}
    source={images.background}
    resizeMode="cover"
  >
    {renderHeader()}

    <View style={[styles.container, contentContainerStyle]}>{children}</View>
  </ImageBackground>
);

Container.propTypes = {
  children: PropTypes.node,
  renderHeader: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style
};

Container.defaultProps = {
  children: null,
  renderHeader: () => null,
  containerStyle: null,
  contentContainerStyle: null
};

export default Container;
