import { call, put, select, takeEvery, take } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { UserSelectors } from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import { screens } from '../Lib/constants'
import { eventChannel } from 'redux-saga'
import GameplayActions, { GameplaySelectors } from '../Redux/GameplayRedux'
import LobbyActions, { LobbyTypes } from '../Redux/LobbyRedux'

export function * getUserFromSpotify (firestore, action) {
  const { spotifyAcc } = action
  const response = yield call(firestore.findUserWithSpotifyId, spotifyAcc.id)
  
  yield put(
    response.matchWith({
      Ok: ({ value }) => UserActions.userSuccess(value), 
      Error: ({ value }) => UserActions.createUser(spotifyAcc)
    })
  )

  const gameId = yield select(GameplaySelectors.selectGameId)
  const gameplayInfoResult = yield call(firestore.getGameplayInfo, gameId)
  const gameplayInfo = gameplayInfoResult.getOrElse(null)
  const continueGame = gameplayInfo && gameplayInfo.currentRound <= 5

  console.tron.log('gameId', gameId, gameplayInfo)
  if (continueGame)
    yield put(NavigationActions.navigate({ routeName: screens.root.gamePlay }))

  const user = response.getOrElse(null)
  if (user && user.id && !continueGame)
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

  const user = response.getOrElse(null)
  if (user && user.id)
    yield put(NavigationActions.navigate({ routeName: screens.root.main }))
}

export function * subscribeGameStart(firestore, action) {
  const userId = yield select(UserSelectors.selectUserId)
  const channel = yield call(onGameStartReceived, firestore, userId)

  yield takeEvery(channel, function* (gameId) {
    yield put(LobbyActions.unsubscribeOpenMatchUpdates())
    yield put(GameplayActions.saveGameId(gameId))
    yield put(NavigationActions.navigate({ routeName: screens.root.gamePlay }))
  })

  yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  channel.close()
}

const onGameStartReceived = (firestore, userId) =>
  eventChannel(emitter => {
    const unsubscribe = firestore.userObserver(emitter, userId)

    return () => unsubscribe()
  })

