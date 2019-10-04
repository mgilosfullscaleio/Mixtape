import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { SongBar } from '../../../../components';

import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';
import { images } from '../../../../constants';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.lighterGray,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1
  }
});

const PlayableSongBar = ({ containerStyle, song, onPlay, ...props }) => (
  <SongBar
    containerStyle={[styles.container, containerStyle]}
    song={song}
    //leftIcon={images.songBarPlay}
    onLeftIconPress={() => onPlay(song)}
    {...props}
  />
);

PlayableSongBar.propTypes = {
  containerStyle: ViewPropTypes.style,
  song: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }).isRequired,
  onPlay: PropTypes.func
};

PlayableSongBar.defaultProps = {
  containerStyle: null,
  onPlay: () => null
};

export default PlayableSongBar;
