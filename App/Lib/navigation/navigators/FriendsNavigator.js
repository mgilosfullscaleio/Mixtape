/* eslint-disable react/prop-types */
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import routes from '../routes/friendsRoutes';
import { colors } from '../../styles';
import scale from '../../utils/scaleUtil';

const config = {
  tabBarOptions: {
    activeTintColor: colors.white,
    inactiveTintColor: colors.white,
    style: {
      backgroundColor: colors.black
    },
    labelStyle: {
      fontFamily: 'AkzidenzGroteskBE-Cn',
      fontSize: scale(22)
    },
    indicatorStyle: {
      height: scale(4),
      backgroundColor: colors.lightGray
    }
  }
};

export default createMaterialTopTabNavigator(routes, config);
