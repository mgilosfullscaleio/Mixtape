/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabIcon, BottomTabBar } from '../../components';

import routes from '../routes/mainRoutes';
import { main } from '../../constants/screens';
import { colors } from '../../styles';
import { screens } from '../../constants';

const config = {
  initialRouteName: main.home,
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      const iconName = routeName.toLowerCase();
      return (
        <TabIcon
          name={iconName}
          size={routeName === screens.main.home ? 40 : 30}
          color={tintColor}
        />
      );
    }
  }),
  tabBarComponent: BottomTabBar,
  tabBarOptions: {
    activeTintColor: colors.orange,
    inactiveTintColor: colors.white
  }
};

export default createBottomTabNavigator(routes, config);
