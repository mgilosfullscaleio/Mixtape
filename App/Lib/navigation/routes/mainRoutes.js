import Home from '../navigators/HomeNavigator';
import Shop from '../../screens/Shop';

import { main } from '../../constants/screens';

const routes = {
  [main.home]: Home,
  [main.friends]: Home,
  [main.shop]: Shop,
  [main.settings]: Home
};

export default routes;
