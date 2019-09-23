import { createStackNavigator } from 'react-navigation-stack';
import routes from '../routes/authRoutes';
import { auth as screens } from '../../constants/screens';

const config = {
  initialRouteName: screens.login,
  headerMode: 'none'
};

export default createStackNavigator(routes, config);
