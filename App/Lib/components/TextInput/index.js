import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput as BaseInput,
  Text as BaseText,
  ViewPropTypes
} from 'react-native';
import Text from '../Text';

import { ScaledSheet } from '../../utils';
import { colors } from '../../styles';

const styles = ScaledSheet.create({
  label: {
    color: colors.orange,
    fontSize: 22
  },

  input: {
    fontFamily: 'AkzidenzGroteskBE-Cn',
    paddingVertical: '2@s',
    fontSize: 22,
    color: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.white
  }
});

const TextInput = ({
  containerStyle,
  inputStyle,
  labelStyle,
  label,
  setRef,
  ...props
}) => (
  <View style={containerStyle}>
    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

    <BaseInput style={[styles.input, inputStyle]} ref={setRef} {...props} />
  </View>
);

TextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  inputStyle: BaseInput.propTypes.style,
  labelStyle: BaseText.propTypes.style,
  label: PropTypes.string,
  setRef: PropTypes.func
};

TextInput.defaultProps = {
  containerStyle: null,
  inputStyle: null,
  labelStyle: null,
  label: null,
  setRef: () => null
};

export default TextInput;
