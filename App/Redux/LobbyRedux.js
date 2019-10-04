import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  lobbyRequest: ['data'],
  lobbySuccess: ['payload'],
  playerJoinMatch: ['players'],
  lobbyFailure: ['error'],
  
  // Saga Trigger
  quitOpenMatch: null,
  subscribePlayerJoin: null,
  subscribeOpenMatch: null,
  unsubscribeOpenMatchUpdates: null,
  addPlayerForMatch: null
})

export const LobbyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  players: [],
  maxPlayers: 5
})

/* ------------- Selectors ------------- */

export const LobbySelectors = {
  getData: state => state.data,
  selectPlayers: state => state.lobby.players,
  selectMaxPlayers: state => state.lobby.maxPlayers
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

export const playerJoinMatch = (state, { players }) => state.merge({ players })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOBBY_REQUEST]: request,
  [Types.LOBBY_SUCCESS]: success,
  [Types.LOBBY_FAILURE]: failure,
  [Types.PLAYER_JOIN_MATCH]: playerJoinMatch,
})
