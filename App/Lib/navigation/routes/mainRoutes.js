import Home from '../navigators/HomeNavigator';
import Friends from '../navigators/FriendsNavigator';
import Shop from '../../screens/Shop';
import Settings from '../../screens/Settings';

import { main } from '../../constants/screens';

const routes = {
  [main.home]: Home,
  [main.friends]: Friends,
  [main.shop]: Shop,
  [main.settings]: Settings
};

export default routes;
