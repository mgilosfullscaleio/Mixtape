import Auth from '../navigators/AuthNavigator'
import Main from '../navigators/MainNavigator';
import GamePlay from '../navigators/GamePlayNavigator';

import { root, auth } from '../../constants/screens';

const routes = {
  [auth.login]: Auth,
  [root.main]: Main,
  [root.gamePlay]: GamePlay
};

export default routes;
