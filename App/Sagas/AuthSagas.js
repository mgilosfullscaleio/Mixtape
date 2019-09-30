import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import UserActions from '../Redux/UserRedux'
import Result from 'folktale/result'
import Spotify from 'rn-spotify-sdk'

var scopes = [
                'user-modify-playback-state',
                'user-read-currently-playing',
                'user-read-playback-state',
                'user-library-modify',
                'user-library-read',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-modify-private',
                'user-read-recently-played',
                'user-top-read',
                'app-remote-control',
                'streaming'
              ];

const credentials = {
  clientId: 'dbee7dba4c8a44898d685c7ebac76c17',
  clientSecret: '0647bf0336354ec0b475d6245df4c953',
  redirectUri: Platform.OS === 'android' ? 'com.mixtape.mobileapp://oauth' : 'mixtape://',
}
// initialize spotify
const spotifyOptions = {
  "clientID":credentials.clientId,
  "sessionUserDefaultsKey":"SpotifySession",
  "redirectURL":credentials.redirectUri,
  "scopes":scopes,
};

const initializeSpotifyIfNeeded = () => {
  const Debug = message => arg => {
    console.tron.log(`${message}: ${arg}`);
    return arg;
  }
  return Spotify.isInitializedAsync()
    .then(init => 
      init || Spotify.initialize(spotifyOptions).then(Debug('Spotify.initialize'))
    )
    .then(init => Spotify.isLoggedInAsync() )
    .then(isLoggedIn => Result.Ok(isLoggedIn))
    .catch(error => {
      console.tron.log('initializeSpotifyIfNeeded Error', error);
      return Result.Error(error);
    });
}

const doLogin = async (shouldRedirect) => {
  if (shouldRedirect) {
    try {
      const user = await Spotify.getMe()
      console.tron.log(user)
      return Promise.resolve(Result.Ok(user.id)) 
    }
    catch (error) {
      Spotify.logout()
      return Promise.resolve(Result.Error(error))
    }
  }
  return Promise.resolve(Result.Error('Wrong credentials'))
}

const loginSpotifyWithOptions = async () => {
  const isLogin = await Spotify.login(spotifyOptions)
  return doLogin(isLogin) 
}

const navigationToHome = async (shouldRedirect) => {
  return doLogin(shouldRedirect)
}

export function * initializeSpotify (api, action) {
  yield put(AuthActions.loadingRequest())

  const response = yield call(initializeSpotifyIfNeeded)

  yield put(
    response.matchWith({
      Ok: ({ value }) => AuthActions.redirectToHome(value), 
      Error: ({ value }) => AuthActions.spotifyAuthFailure(value)
    })
  )
}

export function * redirectToHome (action) {
  const { isLoggedIn } = action
  yield put(AuthActions.loadingRequest())
  
  const response = yield call(navigationToHome, isLoggedIn)

  yield put(
    response.matchWith({
      Ok: ({ value }) =>  UserActions.userRequest(value),  
      Error: ({ value }) => AuthActions.redirectToHomeFailure(value)
    })
  )
}


export function * loginSpotify () {
  yield put(AuthActions.loadingRequest())
  
  const response = yield call(loginSpotifyWithOptions)

  yield put(
    response.matchWith({
      Ok: ({ value }) =>  UserActions.userRequest(value),  
      Error: ({ value }) => AuthActions.spotifyAuthFailure(value)
    })
  )
}
