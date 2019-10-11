/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Container, Button } from '../../../components';
import SearchBar from '../common/SearchBar';
import FriendListItem from '../common/FriendListItem';
import InviteButton from '../common/InviteButton';

import styles from './styles';
import { localization } from '../../../constants';

const Facebook = ({
  friends,
  markedFriends,
  isEnabled,
  onMarkFriend,
  onChangeSearchText,
  onSendInvite,
  onEnable
}) => {
  const renderItem = ({ item, index }) => (
    <FriendListItem
      title={item.name}
      subtitle={item.email}
      avatarImage={{ uri: item.profileImage }}
      marked={item.marked}
      onCheckBoxPress={() => onMarkFriend(item, index)}
    />
  );

  return (
    <Container contentContainerStyle={styles.container}>
      {isEnabled ? (
        <>
          <SearchBar onChangeSearchText={onChangeSearchText} />

          <FlatList
            style={styles.list}
            data={friends}
            extraData={[...friends]}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />

          <InviteButton invitesCount={markedFriends} onPress={onSendInvite} />
        </>
      ) : (
        <View style={styles.middleContainer}>
          <Button
            style={styles.enableButton}
            title={localization.enableFacebook}
            onPress={onEnable}
          />
        </View>
      )}
    </Container>
  );
};

Facebook.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string,
      marked: PropTypes.bool
    })
  ),
  markedFriends: PropTypes.number,
  isEnabled: PropTypes.bool,
  onMarkFriend: PropTypes.func,
  onChangeSearchText: PropTypes.func,
  onSendInvite: PropTypes.func,
  onEnable: PropTypes.func
};

Facebook.defaultProps = {
  friends: [],
  markedFriends: 0,
  isEnabled: false,
  onMarkFriend: () => null,
  onChangeSearchText: () => null,
  onSendInvite: () => null,
  onEnable: () => null
};

export default Facebook;
