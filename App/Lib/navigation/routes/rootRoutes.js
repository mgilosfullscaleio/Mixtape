import Main from '../navigators/MainNavigator';
import GamePlay from '../navigators/GamePlayNavigator';

import { root } from '../../constants/screens';

const routes = {
  [root.main]: Main,
  [root.gamePlay]: GamePlay
};

export default routes;
