import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameplayRequest: ['data'],
  gameplaySuccess: ['payload'],
  gameplayFailure: null,
  saveSongSelectionSuccess: ['song'],
  voteRoundWinnerSuccess: null,

  //saga trigger
  subscribeGameplay: ['gameId', 'playerId', 'emitter'],
  saveSongSelection: ['playerId', 'song'],
  voteRoundWinner: ['playerId']
})

export const GameplayTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  round: 2,
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GameplaySelectors = {
  getRound: state => state.gameplay.round
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

export const saveSongSelectionSuccess = (state, { song }) => {
  state.merge({ fetching: false, error: true, song })
}

export const voteRoundWinnerSuccess = state =>
  state.merge({ fetching: false, error: false, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAMEPLAY_REQUEST]: request,
  [Types.GAMEPLAY_SUCCESS]: success,
  [Types.GAMEPLAY_FAILURE]: failure,
  [Types.SAVE_SONG_SELECTION_SUCCESS]: saveSongSelectionSuccess,
  [Types.VOTE_ROUND_WINNER_SUCCESS]: voteRoundWinnerSuccess,
})
