import React from 'react';
import PropTypes from 'prop-types';
import { SongBar } from '../../../../../components';

import { ScaledSheet } from '../../../../../utils';
import { colors } from '../../../../../styles';

const styles = ScaledSheet.create({
  albumCover: {
    width: '38@s',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: colors.lightGray
  }
});

const SongItem = ({ song, onPress }) => (
  <SongBar
    song={song}
    leftIcon={{ uri: song.albumCover }}
    leftIconContainerStyle={styles.albumCover}
    onPress={onPress}
  />
);

SongItem.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func
};

SongItem.defaultProps = {
  onPress: () => null
};

export default SongItem;
