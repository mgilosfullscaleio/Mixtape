import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
// import { UserSelectors } from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import { screens } from '../Lib/constants'

export function * getUserFromSpotifyId (api, action) {
  const { spotifyId } = action
  const response = yield call(api.getUser, spotifyId)
  
  yield put(
    response.matchWith({
      Ok: ({ value }) => UserActions.userSuccess(value), 
      Error: ({ value }) => UserActions.userFailure(value)
    })
  )
  if (response.getOrElse(""))
    yield put(NavigationActions.navigate({ routeName: screens.root.main }))
}

