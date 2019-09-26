import { call, put, take } from 'redux-saga/effects'
import Actions from '../Redux/LobbyRedux'
import { NavigationActions } from 'react-navigation'
import { eventChannel } from 'redux-saga'

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

const onPlayerJoinChannel = firestore =>
  eventChannel(emitter => {
    const unsubscribe = firestore.playerJoinObserver(emitter)

    return () => unsubscribe()
  })

export function * watchPlayerJoin (firestore, action) {
  const channel = yield call(onPlayerJoinChannel, firestore)

  while (true) {
    const player = yield take(channel)

    console.tron.log('watchPlayerJoin', player)

    yield put(Actions.playerJoinMatch(player))
  }

  //consider closing this when logging out?
}
