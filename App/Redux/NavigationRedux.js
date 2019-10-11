import AppNavigation from '../Navigation/AppNavigation'
/*
routes: [
  {
    isTransitioning:false
    index:0
    key:AUTH_LOGIN
    routeName:AUTH_LOGIN
    params:undefined
  }
],
index:0,
isTransitioning:false
*/
export const NavigationSelectors = {
  selectIndex: state => state.nav.index,
  selectCurrentRoute: state => state.nav.routes[state.nav.index]
}
export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}