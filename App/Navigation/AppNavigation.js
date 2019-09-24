import { createStackNavigator, createAppContainer } from 'react-navigation'
import GameplayScreen from '../Containers/GameplayScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LobbyScreen from '../Lib/screens/Home/Lobby/Lobby'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  GameplayScreen: { screen: GameplayScreen },
  LaunchScreen: { screen: LaunchScreen },
  Lobby: { screen: LobbyScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Lobby',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
