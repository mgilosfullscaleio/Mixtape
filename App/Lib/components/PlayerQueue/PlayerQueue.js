import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import Text from '../Text';
import Avatar from '../Avatar';

import { localization } from '../../constants';
import styles from './styles';

const PlayerQueue = ({ joinedPlayers, maxPlayers, showTitle, renderItem }) => {
  const unjoinedPlayers = new Array(maxPlayers - joinedPlayers.length).fill({});

  const renderPlayerAvatar = player => (
    <Avatar size={50} source={{ uri: player.profileImage }} />
  );

  const handleRenderItem = ({ item }) =>
    renderItem ? renderItem(item) : renderPlayerAvatar(item);

  return (
    <View style={styles.container}>
      {showTitle && (
        <Text style={styles.title}>
          {localization.playersInQueue(joinedPlayers.length, maxPlayers)}
        </Text>
      )}

      <FlatList
        style={styles.list}
        data={[...joinedPlayers, ...unjoinedPlayers]}
        renderItem={handleRenderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item, index) => (item.id ? item.id : `${index}`)}
      />
    </View>
  );
};

PlayerQueue.propTypes = {
  joinedPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      tapes: PropTypes.number,
      profileImage: PropTypes.string
    })
  ).isRequired,
  maxPlayers: PropTypes.number.isRequired,
  showTitle: PropTypes.bool,
  renderItem: PropTypes.func
};

PlayerQueue.defaultProps = {
  showTitle: false,
  renderItem: null
};

export default PlayerQueue;
