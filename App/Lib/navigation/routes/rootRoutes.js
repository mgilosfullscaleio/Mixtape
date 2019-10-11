import Login from '../../screens/Login';
import OnBoarding from '../../screens/OnBoarding';
import Main from '../navigators/MainNavigator';
import GamePlay from '../navigators/GamePlayNavigator';

import { root } from '../../constants/screens';

const routes = {
  [root.login]: Login,
  [root.onBoarding]: OnBoarding,
  [root.main]: Main,
  [root.gamePlay]: GamePlay
};

export default routes;
