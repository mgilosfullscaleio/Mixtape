import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text as BaseText } from 'react-native';
import { Text, Avatar } from '../../../../components';

import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';
import Badge from '../../../../components/Badge';

const styles = ScaledSheet.create({
  container: {
    width: '50@s',
    alignItems: 'center'
  },

  avatar: {
    paddingHorizontal: '3@s'
  },

  name: {
    fontSize: '12@s',
    color: colors.white
  },

  badge: {
    right: '-2.5@s'
  }
});

const PlayerAvatar = ({
  player,
  size,
  containerStyle,
  titleStyle,
  showScore
}) => {
  const renderBadge = () =>
    showScore ? (
      <Badge
        style={styles.badge}
        size={15}
        value={player.score}
        type={player.score ? 'green' : 'orange'}
      />
    ) : null;

  return (
    <View style={[styles.container, containerStyle]}>
      <Avatar
        style={styles.avatar}
        size={size}
        source={{ uri: player.profileImage }}
        renderBadge={renderBadge}
      />
      <Text
        style={[styles.name, titleStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {player.name}
      </Text>
    </View>
  );
};

PlayerAvatar.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    tapes: PropTypes.number,
    profileImage: PropTypes.string,
    score: PropTypes.number
  }).isRequired,
  size: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  titleStyle: BaseText.propTypes.style,
  showScore: PropTypes.bool
};

PlayerAvatar.defaultProps = {
  size: 40,
  containerStyle: null,
  titleStyle: null,
  showScore: false
};

export default PlayerAvatar;
