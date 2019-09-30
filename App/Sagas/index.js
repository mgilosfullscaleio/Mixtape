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
import { MessagingTypes } from '../Redux/MessagingRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { quitOpenMatch, subscribePlayerJoin, addPlayerInMatch } from './LobbySagas'
import { initializeSpotify, loginSpotify } from './AuthSagas'
import { getUserFromSpotifyId } from './UserSagas'
import { generateToken, initiateAndroidPermission, subscribeGameStart } from './MessagingSagas'

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

    takeLatest(LobbyTypes.QUIT_OPEN_MATCH, quitOpenMatch, firestore),
    takeLatest(LobbyTypes.SUBSCRIBE_PLAYER_JOIN, subscribePlayerJoin, firestore),
    // takeLatest(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES, unsubscribeOpenMatchUpdates),
    takeLatest(LobbyTypes.ADD_PLAYER_FOR_MATCH, addPlayerInMatch, firestore),

    takeLatest(AuthTypes.INITIALIZE_SPOTIFY, initializeSpotify),
    takeLatest(AuthTypes.LOGIN_SPOTIFY, loginSpotify),

    takeLatest(MessagingTypes.REQUEST_TOKEN, generateToken),
    takeLatest(MessagingTypes.REQUEST_ANDROID_PERMISSION, initiateAndroidPermission),
    takeLatest(MessagingTypes.SUBSCRIBE_GAME_START_MESSAGE, subscribeGameStart),

    takeLatest(UserTypes.USER_REQUEST, getUserFromSpotifyId, firestore),
  ])
}
