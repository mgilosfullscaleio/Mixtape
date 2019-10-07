import React, { useState } from 'react';
import Facebook from './Facebook';

import normalizeScreenTitle from '../common/normalizeScreenTitle';
import { mockData } from '../../../constants';

const FacebookContainer = () => {
  const [friends, setFriends] = useState(mockData.players);

  const handleMarkFriend = ({ marked = false }, index) => {
    const newFriends = [...friends];
    newFriends[index].marked = !marked;

    setFriends(newFriends);
  };

  return <Facebook friends={friends} onMarkFriend={handleMarkFriend} />;
};

FacebookContainer.navigationOptions = ({ navigation }) => ({
  tabBarLabel: normalizeScreenTitle(navigation.state.routeName)
});

export default FacebookContainer;
