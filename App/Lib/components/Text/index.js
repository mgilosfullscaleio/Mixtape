import React from 'react';
import { Text as BaseText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'AkzidenzGroteskBE-Cn'
  }
});

const Text = ({ style, ...props }) => (
  <BaseText style={[styles.text, style]} {...props} />
);

Text.propTypes = {
  style: BaseText.propTypes.style
};

Text.defaultProps = {
  style: {}
};

export default Text;
