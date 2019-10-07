import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ViewPropTypes } from 'react-native';
import { TextInput } from '../../../components';

import { ScaledSheet } from '../../../utils';
import { colors } from '../../../styles';
import { images, localization } from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10@s',
    paddingHorizontal: '20@s',
    marginHorizontal: '20@s',
    borderRadius: 200,
    backgroundColor: colors.darkGray
  },

  icon: {
    width: '20@s',
    height: undefined,
    aspectRatio: 1
  },

  inputContainer: {
    flex: 1,
    marginLeft: '10@s'
  },

  input: {
    borderBottomWidth: 0,
    color: colors.gray
  }
});

const SearchBar = ({ containerStyle, onChangeSearchText }) => (
  <View style={[styles.container, containerStyle]}>
    <Image source={images.search} style={styles.icon} />

    <TextInput
      containerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholder={localization.search}
      placeholderTextColor={colors.gray}
      onChangeText={onChangeSearchText}
    />

    <Image source={images.search} style={styles.icon} />
  </View>
);

SearchBar.propTypes = {
  containerStyle: ViewPropTypes.style,
  onChangeSearchText: PropTypes.func
};

SearchBar.defaultProps = {
  containerStyle: {},
  onChangeSearchText: () => null
};

export default SearchBar;
