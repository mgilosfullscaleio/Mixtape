import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  spotifyAuthSuccess: ['payload'],
  spotifyAuthFailure: ['error'],
  loadingRequest: null,
  //saga triggers
  spotifyAuthRequest: ['data'],
  initializeSpotify: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  loading: false,
  error: null
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

export const loadingRequest = (state) =>
  state.merge({ loading: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SPOTIFY_AUTH_SUCCESS]: spotifyAuthSuccess,
  [Types.SPOTIFY_AUTH_FAILURE]: spotifyAuthFailure,
  [Types.LOADING_REQUEST]: loadingRequest,
})

