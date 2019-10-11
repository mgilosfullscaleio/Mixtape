import React from 'react';
import PropTypes from 'prop-types';
import { SongBar } from '../../../../../components';

import { ScaledSheet } from '../../../../../utils';
import { colors } from '../../../../../styles';
import { images } from '../../../../../constants';
import PlayableSongBar from '../../common/PlayableSongBar';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.black,
    paddingVertical: '9@s',
    paddingHorizontal: '9@s',
    borderBottomWidth: '3@s',
    borderBottomColor: colors.lightGray
  },

  text: {
    color: colors.white
  }
});

const SongPlayer = ({ song, onSubmit, ...props }) => (
  <PlayableSongBar
    containerStyle={styles.container}
    titleStyle={styles.text}
    singerStyle={styles.text}
    song={song}
    rightIcon={images.addToPlaylist}
    onRightIconPress={() => onSubmit(song)}
    {...props}
  />
);

SongPlayer.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }).isRequired,
  onPlay: PropTypes.func,
  onSubmit: PropTypes.func
};

SongPlayer.defaultProps = {
  onPlay: () => null,
  onSubmit: () => null
};

export default SongPlayer;
