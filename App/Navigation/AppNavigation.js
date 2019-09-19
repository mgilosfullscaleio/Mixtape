import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginWithSpotifyScreen from '../Containers/LoginWithSpotifyScreen'
import GameplayScreen from '../Containers/GameplayScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginWithSpotifyScreen: { screen: LoginWithSpotifyScreen },
  GameplayScreen: { screen: GameplayScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginWithSpotifyScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
