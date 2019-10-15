import { call, put, take, takeEvery, select } from 'redux-saga/effects'
import LobbyActions, { LobbyTypes, LobbySelectors } from '../Redux/LobbyRedux'
import { NavigationActions } from 'react-navigation'
import { eventChannel } from 'redux-saga'
import UserActions, { UserSelectors } from '../Redux/UserRedux'
import MessagingActions from '../Redux/MessagingRedux'
import { MessagingSelectors } from '../Redux/MessagingRedux'
import { screens } from '../Lib/constants'

export function * getMaximumPlayersByPlayWithOthers(api, action) {

  const response = yield call(api.getLobbyMaximumPlayers)

  yield put(
    response.matchWith({
      Ok: ({ value }) => LobbyActions.getMaximumPlayersSuccess(value), 
      Error: ({ value }) => LobbyActions.lobbyFailure(value)
    })
  )

  yield put(NavigationActions.navigate({ routeName: screens.home.lobby }))
    
}

export function * quitOpenMatch (api, action) {
  yield put(LobbyActions.unsubscribeOpenMatchUpdates())

  const userMatchData = yield select(UserSelectors.selectUserMatchData)
  const fcmToken = yield select(MessagingSelectors.selectToken)
  const userData = {...userMatchData, fcmToken}

  yield call(api.removePlayerFromOpenMatch, userData)

  yield put(NavigationActions.navigate({ routeName: screens.home.root }))
}

const onPlayerJoinChannel = firestore =>
  eventChannel(emitter => {
    const unsubscribe = firestore.playerJoinObserver(emitter)

    return () => unsubscribe()
  })

export function * subscribePlayerJoin (firestore, action) {
  const channel = yield call(onPlayerJoinChannel, firestore)

  yield takeEvery(channel, function * (players) {
    yield put(LobbyActions.playerJoinMatch(players))
  })

  yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  channel.close()
}

export function * addPlayerInMatch (api, action) {
  const userMatchData = yield select(UserSelectors.selectUserMatchData)
  const fcmToken = yield select(MessagingSelectors.selectToken)
  const userData = {...userMatchData, fcmToken}

  yield call(api.addPlayerToOpenMatch, userData)
}

export function * subscribeOpenMatch (api, action) {
  yield put(LobbyActions.addPlayerForMatch())
  yield put(LobbyActions.subscribePlayerJoin())
  yield put(MessagingActions.requestAndroidPermission())
  yield put(MessagingActions.subscribeGameStartMessage())
  yield put(UserActions.subscribeGameStartMessage())
}