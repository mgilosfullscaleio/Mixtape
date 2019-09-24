import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  lobbyRequest: ['data'],
  lobbySuccess: ['payload'],

  lobbyFailure: ['error'],
  fetchUserInOpenMatchSuccess: ['isPresent'],
  // Saga Trigger
  fetchUserInOpenMatch: ['playerId'] //<--- PARAMS
})

export const LobbyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  players: []
})

/* ------------- Selectors ------------- */

export const LobbySelectors = {
  getData: state => state.data,
  selectPlayers: state => state.lobby.players
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const fetchUserInOpenMatchSuccess = (state, { isPresent }) =>
    state.merge({ isPresent })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOBBY_REQUEST]: request,
  [Types.LOBBY_SUCCESS]: success,
  [Types.LOBBY_FAILURE]: failure, 
  [Types.FETCH_USER_IN_OPEN_MATCH_SUCCESS]: fetchUserInOpenMatchSuccess
})
