import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Avatar from '../Avatar';
import Text from '../Text';
import TouchableImage from '../TouchableImage';

import styles from './styles';
import { images } from '../../constants';

const UserProfileHeader = ({ navigation, user }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.leftColumn]}>
        <Avatar source={{ uri: user.profileImage }} />

        <View style={styles.row}>
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {user.name.toUpperCase()}
          </Text>
          <Text style={styles.address} ellipsizeMode="tail" numberOfLines={1}>
            {user.address.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={[styles.column, styles.rightColumn]}>
        <TouchableImage
          source={images.currency}
          style={styles.tapes}
          imageStyle={styles.icon1}
          badgeStyle={styles.tapesBadge1}
          badgeTextStyle={styles.tapesBadgeText1}
          showBadge
          badgeCount={user.tapes}
        />
        <TouchableImage
          source={images.invite}
          imageStyle={styles.icon2}
          badgeStyle={styles.tapesBadge2}
          badgeTextStyle={styles.tapesBadgeText2}
          showBadge
          badgeCount={user.invitedFriends}
        />
      </View>
    </View>
  );
};

UserProfileHeader.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    tapes: PropTypes.number,
    invitedFriends: PropTypes.number,
    profileImage: PropTypes.string
  }).isRequired
};

export default UserProfileHeader;
