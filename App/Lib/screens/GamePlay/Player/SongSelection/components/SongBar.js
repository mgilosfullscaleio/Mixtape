import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TouchableImage, Text } from '../../../../../components';

import { ScaledSheet } from '../../../../../utils';
import { colors } from '../../../../../styles';
import { images } from '../../../../../constants';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s',
    paddingVertical: '11@s',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray
  },

  playButton: {
    width: '36@s',
    height: undefined,
    aspectRatio: 1
  },

  details: {
    flex: 1,
    marginLeft: '12@s',
    justifyContent: 'center'
  },

  title: {
    fontSize: '22@s',
    textTransform: 'uppercase'
  },

  singer: {
    fontSize: '12@s',
    textTransform: 'uppercase'
  }
});

const SongBar = ({ song }) => (
  <View style={styles.container}>
    <TouchableImage style={styles.playButton} source={images.songBarPlay} />

    <View style={styles.details}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {song.title}
      </Text>

      <Text style={styles.singer} numberOfLines={1} ellipsizeMode="tail">
        {song.singer}
      </Text>
    </View>
  </View>
);

SongBar.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string,
    singer: PropTypes.string
  }).isRequired
};

export default SongBar;
