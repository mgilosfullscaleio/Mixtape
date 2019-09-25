import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
// import { UserSelectors } from '../Redux/UserRedux'

export function * getUserFromSpotifyId (api, action) {
  const { spotifyId } = action
  const response = yield call(api.getUser, spotifyId)

  yield put(
    response.matchWith({
      Ok: ({ value }) => UserActions.userSuccess(value), 
      Error: ({ value }) => UserActions.userFailure(value)
    })
  )
}
