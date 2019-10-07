import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Avatar from '../Avatar';
import Text from '../Text';
import TouchableImage from '../TouchableImage';

import styles from './styles';
import { images } from '../../constants';
import Badge from '../Badge';

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
          renderBadge={() => (
            <Badge style={styles.tapesBadge1} value={user.tapes} type="green" />
          )}
        />
        <TouchableImage
          source={images.invite}
          imageStyle={styles.icon2}
          renderBadge={() => (
            <Badge style={styles.tapesBadge2} value={user.invitedFriends} />
          )}
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
