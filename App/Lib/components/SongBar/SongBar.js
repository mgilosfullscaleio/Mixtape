import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text as BaseText,
  ViewPropTypes,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Text from '../Text';
import TouchableImage from '../TouchableImage';

import styles from './styles';
import { images } from '../../constants';

const SongBar = ({
  song,
  containerStyle,
  titleStyle,
  singerStyle,
  leftIcon,
  onLeftIconPress,
  leftIconContainerStyle,
  rightIcon,
  rightIconContainerStyle,
  onRightIconPress,
  onPress,
  highlighted
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(song);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={!onPress}>
      <ImageBackground
        style={[styles.container, containerStyle]}
        source={highlighted ? images.highlightedSongBar : undefined}
        resizeMode="stretch"
      >
        {leftIcon && (
          <TouchableImage
            style={[styles.sideIcon, leftIconContainerStyle]}
            source={leftIcon}
            disabled={!onLeftIconPress}
            onPress={onLeftIconPress}
          />
        )}

        <View style={styles.details}>
          <Text
            style={[styles.title, titleStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {song.title}
          </Text>

          <Text
            style={[styles.singer, singerStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {song.singer}
          </Text>
        </View>

        {rightIcon && (
          <TouchableImage
            style={[styles.sideIcon, rightIconContainerStyle]}
            source={rightIcon}
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

SongBar.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    singer: PropTypes.string,
    albumCover: PropTypes.string
  }).isRequired,
  containerStyle: ViewPropTypes.style,
  titleStyle: BaseText.propTypes.style,
  singerStyle: BaseText.propTypes.style,
  leftIcon: Image.propTypes.source,
  onLeftIconPress: PropTypes.func,
  leftIconContainerStyle: ViewPropTypes.style,
  rightIcon: Image.propTypes.source,
  rightIconContainerStyle: ViewPropTypes.style,
  onRightIconPress: PropTypes.func,
  onPress: PropTypes.func,
  highlighted: PropTypes.bool
};

SongBar.defaultProps = {
  containerStyle: null,
  titleStyle: null,
  singerStyle: null,
  leftIcon: null,
  onLeftIconPress: null,
  leftIconContainerStyle: null,
  rightIcon: null,
  rightIconContainerStyle: null,
  onRightIconPress: null,
  onPress: null,
  highlighted: false
};

export default SongBar;
