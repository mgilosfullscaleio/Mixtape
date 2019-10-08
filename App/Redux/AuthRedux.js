import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  spotifyAuthSuccess: ['isAuthenticated'],
  spotifyAuthFailure: ['error'],
  redirectToHomeFailure: ['error'],
  loadingRequest: null,
  //saga triggers
  initializeSpotify: null,
  loginSpotify: null,
  redirectToHome: ['isLoggedIn'],
  getFBFriendsSuccess: ['data'],
  getFBFriendsFailed:['error'],
  initializeFb: null,
  loginFb: null,
  loginSuccess: ['data'],
  loginFailed : ['error'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  loading: true,
  error: null,
  data:[],
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  isAuthenticated: state => state.auth.isAuthenticated,
  isLoading: state => state.auth.loading
}

/* ------------- Reducers ------------- */

export const spotifyAuthSuccess = (state, { isAuthenticated }) => 
  state.merge({ loading: false, error: null, isAuthenticated })

export const spotifyAuthFailure = (state, { error }) =>
  state.merge({ loading: false, error })

export const redirectToHomeFailure = (state, { error }) =>
  state.merge({ loading: false, error })

export const loadingRequest = (state) =>
  state.merge({ loading: true })

export const getFBFriendsSuccess=  (state, { data }) => 
state.merge({ loading: false, error: null, data })

export const getFBFriendsFailed=  (state, { error }) => 
state.merge({ loading: false, error: null, error })

export const loginFb=  (state, { data }) => 
state.merge({ loading: true, error: null, data })

export const loginSuccess=  (state, { data }) => 
state.merge({ loading: false, error: null, data })

export const loginFailed=  (state, { error }) => 
state.merge({ loading: false, error: null, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SPOTIFY_AUTH_SUCCESS]: spotifyAuthSuccess,
  [Types.SPOTIFY_AUTH_FAILURE]: spotifyAuthFailure,
  [Types.REDIRECT_TO_HOME_FAILURE]: redirectToHomeFailure,
  [Types.LOADING_REQUEST]: loadingRequest,
  [Types.GET_FB_FRIENDS_SUCCESS]: getFBFriendsSuccess,
  [Types.GET_FB_FRIENDS_FAILED]: getFBFriendsFailed,
})

/*[Types.LOGOUT_SUCCESS]:loginSuccess,
  [Types.LOGIN_FAILED]:loginFailed, */