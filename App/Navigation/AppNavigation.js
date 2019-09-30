import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginWithSpotifyScreen from '../Containers/LoginWithSpotifyScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LobbyScreen from '../Lib/screens/Home/Lobby/Lobby'
import Login from '../Lib/screens/Auth/Login'
import Home from '../Lib/screens/Home/Home'
import Gameplay from '../Lib/screens/GamePlay/Player/SongSelection'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  LoginWithSpotifyScreen: { screen: LoginWithSpotifyScreen },
  Gameplay: { screen: Gameplay },
  LaunchScreen: { screen: LaunchScreen },
  Lobby: { screen: LobbyScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
