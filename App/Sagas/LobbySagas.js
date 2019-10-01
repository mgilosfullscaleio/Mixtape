import { call, put, take, takeEvery, select } from 'redux-saga/effects'
import Actions, { LobbyTypes } from '../Redux/LobbyRedux'
import { NavigationActions } from 'react-navigation'
import { eventChannel } from 'redux-saga'
import { UserSelectors } from '../Redux/UserRedux'
import { MessagingSelectors } from '../Redux/MessagingRedux'

export function * quitOpenMatch (api, action) {
  yield put(Actions.unsubscribeOpenMatchUpdates())

  const userMatchData = yield select(UserSelectors.selectUserMatchData)
  const fcmToken = yield select(MessagingSelectors.selectToken)
  const userData = {...userMatchData, fcmToken, id: '1569898707610'}

  yield call(api.removePlayerFromOpenMatch, userData)

  yield put(NavigationActions.navigate({ routeName: 'Home' }))
}

const onPlayerJoinChannel = firestore =>
  eventChannel(emitter => {
    const unsubscribe = firestore.playerJoinObserver(emitter)

    return () => unsubscribe()
  })

export function * subscribePlayerJoin (firestore, action) {
  const channel = yield call(onPlayerJoinChannel, firestore)

  yield takeEvery(channel, function * (players) {
    yield put(Actions.playerJoinMatch(players))
  })

  yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  channel.close()
}

export function * addPlayerInMatch (api, action) {
  const userMatchData = yield select(UserSelectors.selectUserMatchData)
  const fcmToken = yield select(MessagingSelectors.selectToken)
  const userData = {...userMatchData, fcmToken, id: Date.now().toString()}

  yield call(api.addPlayerToOpenMatch, userData)
}
