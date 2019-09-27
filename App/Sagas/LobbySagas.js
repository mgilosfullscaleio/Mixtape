import { call, put, take } from 'redux-saga/effects'
import Actions from '../Redux/LobbyRedux'
import { NavigationActions } from 'react-navigation'
import { eventChannel } from 'redux-saga'

export function * quitOpenMatch (api, action) {
  yield call(api.removePlayerFromOpenMatch)

  yield put(NavigationActions.navigate({ routeName: 'Home' }))
}

const onPlayerJoinChannel = firestore =>
  eventChannel(emitter => {
    const unsubscribe = firestore.playerJoinObserver(emitter)

    return () => unsubscribe()
  })

let playerJoinSubscriptionChannel

export function * subscribePlayerJoin (firestore, action) {
  playerJoinSubscriptionChannel = yield call(onPlayerJoinChannel, firestore)

  while (true) {
    const player = yield take(playerJoinSubscriptionChannel)

    yield put(Actions.playerJoinMatch(player))
  }

  //consider closing this when logging out?
}

export function * unsubscribePlayerJoin (action) {
  if (playerJoinSubscriptionChannel) {
    playerJoinSubscriptionChannel.close()
    playerJoinSubscriptionChannel = null
  }
}

export function * addPlayerInMatch (api, { playerId }) {
  yield call(api.addPlayerToOpenMatch, playerId)
}
