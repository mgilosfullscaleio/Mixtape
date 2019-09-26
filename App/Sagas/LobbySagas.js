import { call, put } from 'redux-saga/effects'
import Actions from '../Redux/LobbyRedux'
import { NavigationActions } from 'react-navigation'
// import { LobbySagasSelectors } from '../Redux/LobbySagasRedux'

export function * fetchUserInOpenMatch (api, action) {
  const { playerId } = action
  // get current data from Store
  // const currentData = yield select(LobbySagasSelectors.getData)
  // make the call to the api
  const response = yield call(api.fetchUserInOpenMatch, playerId)

  yield put(
    response.matchWith({
      Ok: ({ value }) => Actions.fetchUserInOpenMatchSuccess(value),
      Error: ({ value }) => Actions.lobbyFailure(value)
    })
  )

}

export function * quitOpenMatch (api, action) {
  yield call(api.quitOpenMatch)

  yield put(NavigationActions.navigate({ routeName: 'Home' }))
}
