import React, { useState } from 'react';
import Friends from './Friends';

import normalizeScreenTitle from '../common/normalizeScreenTitle';
import { mockData } from '../../../constants';
import { friendsUtils } from '../../../utils';

const playersClone = mockData.friends.map(player => ({ ...player }));

const FriendsContainer = () => {
  const [friends, setFriends] = useState(playersClone);

  const handleMarkFriend = ({ marked = false }, index) => {
    const newFriends = [...friends];
    newFriends[index].marked = !marked;

    setFriends(newFriends);
  };

  const markedFriends = friendsUtils.countMarked(friends);

  return (
    <Friends
      friends={friends}
      markedFriends={markedFriends}
      onMarkFriend={handleMarkFriend}
    />
  );
};

FriendsContainer.navigationOptions = ({ navigation }) => ({
  tabBarLabel: normalizeScreenTitle(navigation.state.routeName)
});

export default FriendsContainer;
