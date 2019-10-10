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
import { quitOpenMatch, subscribePlayerJoin, addPlayerInMatch, subscribeOpenMatch } from './LobbySagas'
import { getUserFromSpotify, createUserFromSpotify, subscribeGameStart } from './UserSagas'
import { generateToken, initiateAndroidPermission, subscribeTokenRefresh } from './MessagingSagas'
import { fetchUserInOpenMatch } from './LobbySagas'
import { initializeSpotify, loginSpotify, redirectToHome } from './AuthSagas'
import { 
  subscribeGameplay, 
  saveSongSelection, 
  voteRoundWinner, 
  searchSong, 
  playSong, 
  pauseSong, 
  resumeSong, 
  subscribeVotingRound,
  updateNextRound,
  playRoundWinnerSong,
  subscribeTiebreakerRound
 } from './GameplaySagas'

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
    takeLatest(LobbyTypes.SUBSCRIBE_OPEN_MATCH, subscribeOpenMatch),
    takeLatest(LobbyTypes.ADD_PLAYER_FOR_MATCH, addPlayerInMatch, firestore),
    // takeLatest(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES, unsubscribeOpenMatchUpdates),

    takeLatest(AuthTypes.INITIALIZE_SPOTIFY, initializeSpotify),
    takeLatest(AuthTypes.LOGIN_SPOTIFY, loginSpotify),
    takeLatest(AuthTypes.REDIRECT_TO_HOME, redirectToHome),

    takeLatest(MessagingTypes.REQUEST_TOKEN, generateToken),
    takeLatest(MessagingTypes.REQUEST_ANDROID_PERMISSION, initiateAndroidPermission),
    takeLatest(MessagingTypes.SUBSCRIBE_TOKEN_REFRESH, subscribeTokenRefresh),
    // takeLatest(MessagingTypes.SUBSCRIBE_GAME_START_MESSAGE, subscribeGameStart, firestore),

    takeLatest(UserTypes.USER_REQUEST, getUserFromSpotify, firestore),
    takeLatest(UserTypes.CREATE_USER, createUserFromSpotify, firestore),
    takeLatest(UserTypes.SUBSCRIBE_GAME_START_MESSAGE, subscribeGameStart, firestore),

    //GAME PLAY FUNCTIONS
    takeLatest(GameplayTypes.SUBSCRIBE_GAMEPLAY, subscribeGameplay, firestore),
    takeLatest(GameplayTypes.SAVE_SONG_SELECTION, saveSongSelection, firestore),
    takeLatest(GameplayTypes.VOTE_ROUND_WINNER, voteRoundWinner, firestore),
    takeLatest(GameplayTypes.SUBSCRIBE_GAMEPLAY_UPDATES, subscribeGameplay, firestore),
    takeLatest(GameplayTypes.SUBSCRIBE_VOTING_ROUND_UPDATES, subscribeVotingRound, firestore),
    takeLatest(GameplayTypes.UPDATE_GAME_NEXT_ROUND, updateNextRound, firestore),
    takeLatest(GameplayTypes.PLAY_ROUND_WINNER_SONG, playRoundWinnerSong),
    takeLatest(GameplayTypes.SUBSCRIBE_TIEBREAKER_ROUND, subscribeTiebreakerRound, firestore),
    
    takeLatest(GameplayTypes.SEARCH_SONG, searchSong),
    takeLatest(GameplayTypes.PLAY_SONG, playSong),
    takeLatest(GameplayTypes.PAUSE_SONG, pauseSong),
    takeLatest(GameplayTypes.RESUME_SONG, resumeSong),
  ])
}
