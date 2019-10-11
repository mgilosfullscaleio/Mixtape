import React, { useState } from 'react';
import Facebook from './Facebook';

import normalizeScreenTitle from '../common/normalizeScreenTitle';
import { mockData } from '../../../constants';
import { friendsUtils } from '../../../utils';

const playersClone = mockData.players.map(player => ({ ...player }));

const FacebookContainer = () => {
  const [friends, setFriends] = useState(playersClone);
  const [isEnabled, setEnabled] = useState(false);

  const handleMarkFriend = ({ marked = false }, index) => {
    const newFriends = [...friends];
    newFriends[index].marked = !marked;

    setFriends(newFriends);
  };

  const handleEnable = () => setEnabled(true);

  const markedFriends = friendsUtils.countMarked(friends);

  return (
    <Facebook
      friends={friends}
      markedFriends={markedFriends}
      isEnabled={isEnabled}
      onMarkFriend={handleMarkFriend}
      onEnable={handleEnable}
    />
  );
};

FacebookContainer.navigationOptions = ({ navigation }) => ({
  tabBarLabel: normalizeScreenTitle(navigation.state.routeName)
});

export default FacebookContainer;
