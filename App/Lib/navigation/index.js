import { createAppContainer } from 'react-navigation';
import Auth from './navigators/AuthNavigator';
import Root from './navigators/RootNavigator';

const AuthNavigator = createAppContainer(Auth);
const RootNavigator = createAppContainer(Root);

export { AuthNavigator, RootNavigator };
