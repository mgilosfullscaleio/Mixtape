import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginWithSpotifyScreen from '../Containers/LoginWithSpotifyScreen'
import GameplayScreen from '../Containers/GameplayScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LobbyScreen from '../Lib/screens/Home/Lobby/Lobby'
import Login from '../Lib/screens/Auth/Login'
import Home from '../Lib/screens/Home/Home'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  LoginWithSpotifyScreen: { screen: LoginWithSpotifyScreen },
  GameplayScreen: { screen: GameplayScreen },
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
