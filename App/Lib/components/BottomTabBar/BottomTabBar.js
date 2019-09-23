/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';

import styles from './styles';
import { colors } from '../../styles';

const BottomTabBar = ({
  renderIcon,
  getLabelText,
  activeTintColor,
  inactiveTintColor,
  onTabPress,
  onTabLongPress,
  getAccessibilityLabel,
  navigation
}) => {
  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View style={styles.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
        const labelColorStyle = { color: tintColor };

        return (
          <TouchableOpacity
            key={`tab-${routeIndex}`}
            style={styles.tabButton}
            onPress={() => onTabPress({ route })}
            onLongPress={() => onTabLongPress({ route })}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}

            <Text style={[styles.label, labelColorStyle]}>
              {getLabelText({ route })}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

BottomTabBar.propTypes = {
  renderIcon: PropTypes.func.isRequired,
  getLabelText: PropTypes.func.isRequired,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  onTabPress: PropTypes.func.isRequired,
  onTabLongPress: PropTypes.func.isRequired,
  getAccessibilityLabel: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          routeName: PropTypes.string,
          index: PropTypes.number
        })
      ),
      index: PropTypes.number
    })
  }).isRequired
};

BottomTabBar.defaultProps = {
  activeTintColor: colors.black,
  inactiveTintColor: colors.black
};

export default BottomTabBar;
