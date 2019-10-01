import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameplayRequest: ['data'],
  gameplaySuccess: ['payload'],
  gameplayFailure: null,
  saveGameId: ['gameId'],
  saveSongSelectionSuccess: ['song'],
  voteRoundWinnerSuccess: null,
  searchedSongsSuccess: ['searchedSongs'],

  //saga trigger
  subscribeGameplay: null,
  saveSongSelection: ['playerId', 'song'],
  voteRoundWinner: ['playerId'],
  searchSong: ['keyword', 'limit']
})

export const GameplayTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  round: 2,
  loading: null,
  error: null,
  gameId: null,
  searchedSongs: [],
})

/* ------------- Selectors ------------- */

export const GameplaySelectors = {
  getRound: state => state.gameplay.round,
  searchedSongs: state => state.gameplay.searchedSongs,
  isLoading: state => state.gameplay.loading,
}

/* ------------- Reducers ------------- */

export const failure = (state, { error }) =>
  state.merge({ loading: false, error })

export const saveSongSelectionSuccess = (state, { song }) =>
  state.merge({ loading: false, song })

export const voteRoundWinnerSuccess = state =>
  state.merge({ loading: false, error: false, payload: null })

export const searchedSongsSuccess = (state, { searchedSongs }) =>
  state.merge({ loading: false, error: null, searchedSongs })

export const saveGameId = (state, { gameId }) =>
  state.merge({ gameId })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAMEPLAY_FAILURE]: failure,
  [Types.SAVE_SONG_SELECTION_SUCCESS]: saveSongSelectionSuccess,
  [Types.VOTE_ROUND_WINNER_SUCCESS]: voteRoundWinnerSuccess,
  [Types.SEARCHED_SONGS_SUCCESS]: searchedSongsSuccess,
  [Types.SEARCHED_SONGS_SUCCESS]: searchedSongsSuccess,
  [Types.SAVE_GAME_ID]: saveGameId,
})
