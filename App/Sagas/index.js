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

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { fetchUserInOpenMatch } from './LobbySagas'
import { initializeSpotify } from './AuthSagas'
import { AuthTypes } from '../Redux/AuthRedux'

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

    takeLatest(AuthTypes.INITIALIZE_SPOTIFY, initializeSpotify)
  ])
}
