/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Container } from '../../../components';
import SearchBar from '../common/SearchBar';
import FriendListItem from '../common/FriendListItem';
import InviteButton from '../common/InviteButton';

import styles from './styles';

const markedFriendSum = (total, current) =>
  current.marked ? total + 1 : total;

const Friends = ({
  friends,
  onMarkFriend,
  onChangeSearchText,
  onSendInvite
}) => {
  const markedFriends = friends.reduce(markedFriendSum, 0);

  const renderItem = ({ item, index }) => (
    <FriendListItem
      title={item.name}
      subtitle={item.email || item.number}
      avatarImage={item.profileImage && { uri: item.profileImage }}
      marked={item.marked}
      onCheckBoxPress={() => onMarkFriend(item, index)}
    />
  );

  return (
    <Container contentContainerStyle={styles.container}>
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
    </Container>
  );
};

Friends.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string,
      marked: PropTypes.bool
    })
  ),
  onMarkFriend: PropTypes.func,
  onChangeSearchText: PropTypes.func,
  onSendInvite: PropTypes.func
};

Friends.defaultProps = {
  friends: [],
  onMarkFriend: () => null,
  onChangeSearchText: () => null,
  onSendInvite: () => null
};

export default Friends;
