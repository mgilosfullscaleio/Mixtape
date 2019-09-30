import { call, put, take, takeEvery } from 'redux-saga/effects'
import Actions, { LobbyTypes } from '../Redux/LobbyRedux'
import { NavigationActions } from 'react-navigation'
import { eventChannel } from 'redux-saga'

//TODO consider having an action for quitting lobby, for event channel saga to take and close
export function * quitOpenMatch (api, action) {
  yield put(Actions.unsubscribeOpenMatchUpdates())
  
  yield call(api.removePlayerFromOpenMatch)

  yield put(NavigationActions.navigate({ routeName: 'Home' }))
}

const onPlayerJoinChannel = firestore =>
  eventChannel(emitter => {
    const unsubscribe = firestore.playerJoinObserver(emitter)

    return () => unsubscribe()
  })

export function * subscribePlayerJoin (firestore, action) {
  const channel = yield call(onPlayerJoinChannel, firestore)

  // while (true) {
  //   const player = yield take(playerJoinSubscriptionChannel)

  //   yield put(Actions.playerJoinMatch(player))
  // }

  yield takeEvery(channel, function * (payload) {
    yield put(Actions.playerJoinMatch(payload))
  })

  //consider closing this when logging out?
  yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  channel.close()
}

// export function * unsubscribeOpenMatchUpdates (action) {
//   if (playerJoinSubscriptionChannel) {
//     playerJoinSubscriptionChannel.close()
//     playerJoinSubscriptionChannel = null
//   }
// }

export function * addPlayerInMatch (api, { playerId }) {
  yield call(api.addPlayerToOpenMatch, playerId)
}
