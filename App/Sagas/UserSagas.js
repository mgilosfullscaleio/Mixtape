import { call, put, select, delay } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
// import { UserSelectors } from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import { screens } from '../Lib/constants'
import { GameplaySelectors } from '../Redux/GameplayRedux'

export function * getUserFromSpotify (firestore, action) {
  const { spotifyAcc } = action
  const response = yield call(firestore.findUserWithSpotifyId, spotifyAcc.id)
  
  yield put(
    response.matchWith({
      Ok: ({ value }) => UserActions.userSuccess(value), 
      Error: ({ value }) => UserActions.createUser(spotifyAcc)
    })
  )

  // yield delay(2000)

  const gameId = yield select(GameplaySelectors.selectGameId)
  const gameplayInfo = yield call(firestore.getGameplayInfo, gameId)
  const continueGame = gameplayInfo.currentRound <= 5
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

