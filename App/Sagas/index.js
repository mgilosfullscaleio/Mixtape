import { takeLatest, all } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import FixtureFirestoreModule from '../Services/FixtureFirestoreModule'
import FirestoreModule from '../Services/FirestoreModule'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { GameplayTypes } from '../Redux/GameplayRedux'
import { LobbyTypes } from '../Redux/LobbyRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { fetchUserInOpenMatch, quitOpenMatch, subscribePlayerJoin, unsubscribePlayerJoin } from './LobbySagas'
import { initializeSpotify, loginSpotify } from './AuthSagas'
import { getUserFromSpotifyId } from './UserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const firestore =  DebugConfig.useFixtures ? FixtureFirestoreModule : FirestoreModule

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(LobbyTypes.FETCH_USER_IN_OPEN_MATCH, fetchUserInOpenMatch, firestore),
    takeLatest(LobbyTypes.QUIT_OPEN_MATCH, quitOpenMatch, firestore),
    takeLatest(LobbyTypes.SUBSCRIBE_PLAYER_JOIN, subscribePlayerJoin, firestore),
    takeLatest(LobbyTypes.UNSUBSCRIBE_PLAYER_JOIN, unsubscribePlayerJoin),

    takeLatest(AuthTypes.INITIALIZE_SPOTIFY, initializeSpotify),
    takeLatest(AuthTypes.LOGIN_SPOTIFY, loginSpotify),

    takeLatest(UserTypes.USER_REQUEST, getUserFromSpotifyId, firestore),
  ])
}
