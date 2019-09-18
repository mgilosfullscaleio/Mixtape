import { createStackNavigator, createAppContainer } from 'react-navigation'
import GameplayScreen from '../Containers/GameplayScreen'
import GettingStarted from '../Containers/GettingStarted'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  GameplayScreen: { screen: GameplayScreen },
  GettingStarted: { screen: GettingStarted},
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'GettingStarted',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
