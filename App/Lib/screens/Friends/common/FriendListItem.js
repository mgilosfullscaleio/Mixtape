import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, Avatar, TouchableImage } from '../../../components';

import { ScaledSheet } from '../../../utils';
import scale from '../../../utils/scaleUtil';
import { colors } from '../../../styles';
import { images } from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    paddingVertical: '10@s'
  },

  avatar: {
    marginRight: '10@s'
  },

  avatarSize: {
    width: 55,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 27.5
  },

  nameInitialsAvatar: {
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center'
  },

  nameInitials: {
    color: colors.lightGray,
    fontSize: 25
  },

  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 3,
    width: 20,
    height: undefined,
    aspectRatio: 1,
    borderRadius: scale(10),
    borderWidth: scale(4),
    borderColor: colors.darkGray,
    backgroundColor: colors.spotifyGreen
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.darkerGray,
    borderBottomWidth: 1
  },

  infoContainer: {
    flex: 1
  },

  title: {
    color: colors.white,
    fontSize: 18
  },

  subtitle: {
    color: colors.gray,
    fontSize: 15
  },

  checkbox: {
    width: 20,
    height: 20,
    padding: 2,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.lightGray
  }
});

const FriendListItem = ({
  avatarImage,
  title,
  subtitle,
  marked,
  onCheckBoxPress
}) => {
  const renderBadge = () => <View style={styles.badge} />;

  const renderNameInitialsAvatar = () => {
    const initials = title.split(' ').map(part => part[0]);

    return (
      <View
        style={[styles.avatar, styles.avatarSize, styles.nameInitialsAvatar]}
      >
        <Text style={styles.nameInitials}>{initials}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {avatarImage ? (
        <Avatar
          style={styles.avatar}
          imageStyle={styles.avatarSize}
          size={55}
          source={avatarImage}
          bordered={false}
          renderBadge={renderBadge}
        />
      ) : (
        renderNameInitialsAvatar()
      )}

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <TouchableImage
          style={styles.checkbox}
          source={marked ? images.check : undefined}
          onPress={onCheckBoxPress}
        />
      </View>
    </View>
  );
};

FriendListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatarImage: Image.propTypes.source,
  marked: PropTypes.bool,
  onCheckBoxPress: PropTypes.func
};

FriendListItem.defaultProps = {
  marked: false,
  avatarImage: undefined,
  onCheckBoxPress: () => null
};

export default FriendListItem;
