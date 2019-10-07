import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text as BaseText, Image } from 'react-native';
import { Text, Avatar } from '../../../../components';

import { ScaledSheet } from '../../../../utils';
import { colors } from '../../../../styles';
import Badge from '../../../../components/Badge';
import { images } from '../../../../constants';

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
  },

  check: {
    position: 'absolute',
    top: 0,
    right: '-3.5@s',
    zIndex: 3,
    width: '10@s',
    height: undefined,
    aspectRatio: 1
  }
});

const PlayerAvatar = ({
  player,
  size,
  containerStyle,
  titleStyle,
  type,
  showBadge
}) => {
  const badge =
    type === 'count' ? (
      <Badge
        style={styles.badge}
        size={15}
        value={player.score}
        type={player.score ? 'green' : 'orange'}
      />
    ) : (
      <Image source={images.check} style={styles.check} />
    );

  const renderBadge = () => <>{showBadge && badge}</>;

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
  type: PropTypes.oneOf(['checkmark', 'count']),
  showBadge: PropTypes.bool
};

PlayerAvatar.defaultProps = {
  size: 40,
  containerStyle: null,
  titleStyle: null,
  type: 'count',
  showBadge: false
};

export default PlayerAvatar;
