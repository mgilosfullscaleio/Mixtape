import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
// import { UserSelectors } from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import { screens } from '../Lib/constants'

export function * getUserFromSpotify (api, action) {
  const { spotifyAcc } = action
  const response = yield call(api.findUserWithSpotifyId, spotifyAcc.id)
  
  yield put(
    response.matchWith({
      Ok: ({ value }) => UserActions.userSuccess(value), 
      Error: ({ value }) => UserActions.createUser(spotifyAcc)
    })
  )

  if (response.getOrElse(""))
    yield put(NavigationActions.navigate({ routeName: screens.root.main }))
}

export function * createUserFromSpotify (api, action) {
  const { spotifyAcc } = action
  const response = yield call(api.createUserFromSpotifyAccount, spotifyAcc)
  
  yield put(
    response.matchWith({
      Ok: ({ value }) => UserActions.createUserSuccess(value), 
      Error: ({ value }) => UserActions.createUserFailure(value)
    })
  )

  if (response.getOrElse(""))
    yield put(NavigationActions.navigate({ routeName: screens.root.main }))
}

