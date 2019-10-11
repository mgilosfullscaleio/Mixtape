import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { NavigationSelectors } from '../Redux/NavigationRedux'

// Styles
import styles from './Styles/RootContainerStyles'
import { screens } from '../Lib/constants'
import { createSafeAreaView } from '../Lib/utils'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    const { route } = this.props;
    const currentRoute = route.routeName;

    if (currentRoute === screens.root.login) {
      return <ReduxNavigation />;
    }

    return createSafeAreaView(ReduxNavigation)();
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateToProps = (state) => ({
  index: NavigationSelectors.selectIndex(state),
  route: NavigationSelectors.selectCurrentRoute(state),
})
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
