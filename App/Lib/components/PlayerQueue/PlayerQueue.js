import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ViewPropTypes } from 'react-native';
import Text from '../Text';
import Avatar from '../Avatar';

import { localization } from '../../constants';
import styles from './styles';

const PlayerQueue = ({
  containerStyle,
  listStyle,
  listContentContainerStyle,
  joinedPlayers,
  maxPlayers,
  showTitle,
  renderItem
}) => {
  const unjoinedPlayers = new Array(maxPlayers - joinedPlayers.length).fill({});

  const renderPlayerAvatar = player => (
    <Avatar size={50} source={{ uri: player.profileImage }} />
  );

  const handleRenderItem = ({ item }) =>
    renderItem ? renderItem(item) : renderPlayerAvatar(item);

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={[styles.container, containerStyle]}>
      {showTitle && (
        <Text style={styles.title}>
          {localization.playersInQueue(joinedPlayers.length, maxPlayers)}
        </Text>
      )}

      <FlatList
        style={[styles.list, listStyle]}
        data={[...joinedPlayers, ...unjoinedPlayers]}
        renderItem={handleRenderItem}
        contentContainerStyle={styles.listContentContainer}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item, index) => (item.id ? item.id : `${index}`)}
      />
    </View>
  );
};

PlayerQueue.propTypes = {
  containerStyle: ViewPropTypes.style,
  listStyle: ViewPropTypes.style,
  listContentContainerStyle: ViewPropTypes.style,
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
  containerStyle: null,
  listStyle: null,
  listContentContainerStyle: null,
  showTitle: false,
  renderItem: null
};

export default PlayerQueue;
