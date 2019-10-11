import { createStackNavigator } from 'react-navigation-stack';
import routes from '../routes/homeRoutes';
import { home as screens } from '../../constants/screens';

const config = {
  initialRouteName: screens.root,
  headerMode: 'none'
};

export default createStackNavigator(routes, config);
