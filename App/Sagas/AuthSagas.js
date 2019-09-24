import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
// import { AuthSelectors } from '../Redux/AuthRedux'

export function * initializeSpotify (api, action) {
  const response = yield call(api.getauth)

  yield put(
    response.matchWith({
      Ok: ({ value }) => Actions.spotifyAuthSuccess(value), 
      Error: ({ value }) => Actions.spotifyAuthFailure(value)
    })
  )
}
