import { call, put, all } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import UserActions from '../Redux/UserRedux'
import Result from 'folktale/result'
import Spotify from 'rn-spotify-sdk'
import { authorizeWithFacebook, getFBToken, getFBUserFriends, getFBUserInfo , logOutFacebook, } from '../Services/Facebook';
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
    .catch(error => Result.Error(error));
}

const doLogin = async (shouldRedirect) => {
  if (shouldRedirect) {
    try {
      const user = await Spotify.getMe()
      return Promise.resolve(Result.Ok(user))
    } catch (error) {
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

export function * initializeSpotify (api, action) {
  yield put(AuthActions.loadingRequest())

  const response = yield call(initializeSpotifyIfNeeded)

  all([
    yield put(AuthActions.spotifyAuthSuccess(true)),
    yield put(
      response.matchWith({
        Ok: ({ value }) => AuthActions.redirectToHome(value), 
        Error: ({ value }) => AuthActions.spotifyAuthFailure(value)
      })
    )
  ])
}

const getFBFriends =async () =>{
  var fbToken = await getFBToken();
  try{
    if(fbToken === null){
      if(await authorizeWithFacebook() === null){
          return Promise.resolve(Result.Error("error"));
      }
      fbToken = await getFBToken();
      // Sign to firebase with FB credentialsr
      console.log("FBToken: ",fbToken);
      await signInWithFacebookCredential(fbToken);
    }

    // console.log("fbToken" + fbToken)
    // const data = await getFBUserFriends(fbToken);
    // console.log("fbTokendata", data)
    
    // if (data !== null) {
    //     const fbIds = data.data.map(item=>item.id);
    //     const users = await getUsersWithFbIdsCF(fbIds);
    //     Promise.resolve(Result.Ok(users))
    //   }
  } catch(e) {
  console.log("GET FB FRIENDS ERROR ---> ", e);
    return Promise.resolve(Result.Error(e))
  }
};

const authFB =async () => {
  try {
    var fbToken = await getFBToken();
    if (fbToken === null) {
      if (await authorizeWithFacebook() === null) {
        return dispatch(authFailed(e));
      }
      fbToken = await getFBToken();
    }
    // Sign to firebase with FB credentials
    const credentials = await signInWithFacebookCredential(fbToken);
    var user = credentials.user;
    var authData = {
      uid: user.uid,
      providerData: user.providerData,
      email: user.email,
      providerId: user.providerData[0].providerId,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    }

    return dispatch(authSuccess(authData));
  }
  catch(e) {
    return dispatch(authFailed(e));
  }
}

export function * initializeFb(action){
  console.log("initializeFB");
  yield put(AuthActions.loadingRequest());

  const response = yield call(getFBFriends);
  yield put(
    response.matchWith({
      Ok: ({ value }) =>  AuthActions.getFBFriendsSuccess(value),
      Error: ({ value }) => AuthActions.getFBFriendsFailed(value)
    })
  );
}

export function * redirectToHome (action) {
  const { isLoggedIn } = action
  yield put(AuthActions.loadingRequest())
  
  const response = yield call(doLogin, isLoggedIn)

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

export function * loginFb(){
  console.log("loginFB");

  yield put(AuthActions.loadingRequest());

  const response = call(authFB);
  yield put(
    response.matchWith({
      Ok: ({ value }) =>  AuthActions.loginSuccess(value),
      Error: ({ value }) => AuthActions.loginFailed(value)
    })
  );
}
