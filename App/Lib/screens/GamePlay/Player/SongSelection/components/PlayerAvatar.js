import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Avatar } from '../../../../../components';

import { ScaledSheet } from '../../../../../utils';
import { colors } from '../../../../../styles';

const styles = ScaledSheet.create({
  container: {
    width: '45@s',
    alignItems: 'center'
  },

  name: {
    fontSize: '12@s',
    color: colors.white
  }
});

const PlayerAvatar = ({ player }) => (
  <View style={styles.container}>
    <Avatar size={40} source={{ uri: player.profileImage }} />
    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
      {player.name}
    </Text>
  </View>
);

PlayerAvatar.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    tapes: PropTypes.number,
    profileImage: PropTypes.string
  }).isRequired
};

export default PlayerAvatar;
