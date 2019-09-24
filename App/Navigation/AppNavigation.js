import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginWithSpotifyScreen from '../Containers/LoginWithSpotifyScreen'
import GameplayScreen from '../Containers/GameplayScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LobbyScreen from '../Lib/screens/Home/Lobby/Lobby'
import SpotifyLogin from '../Lib/screens/Auth/SpotifyLogin'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  SpotifyLogin: { screen: SpotifyLogin },
  LoginWithSpotifyScreen: { screen: LoginWithSpotifyScreen },
  GameplayScreen: { screen: GameplayScreen },
  LaunchScreen: { screen: LaunchScreen },
  Lobby: { screen: LobbyScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SpotifyLogin',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
