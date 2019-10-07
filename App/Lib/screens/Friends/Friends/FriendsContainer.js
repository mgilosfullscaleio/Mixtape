import React, { useState } from 'react';
import Friends from './Friends';

import normalizeScreenTitle from '../common/normalizeScreenTitle';
import { mockData } from '../../../constants';

const FriendsContainer = () => {
  const [friends, setFriends] = useState(mockData.friends);

  const handleMarkFriend = ({ marked = false }, index) => {
    const newFriends = [...friends];
    newFriends[index].marked = !marked;

    setFriends(newFriends);
  };

  return <Friends friends={friends} onMarkFriend={handleMarkFriend} />;
};

FriendsContainer.navigationOptions = ({ navigation }) => ({
  tabBarLabel: normalizeScreenTitle(navigation.state.routeName)
});

export default FriendsContainer;
