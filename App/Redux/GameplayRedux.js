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
  saveGameInfo: ['gameInfo'],

  //saga trigger
  subscribeGameplay: null,
  saveSongSelection: ['playerId', 'song'],
  voteRoundWinner: ['playerId'],
  searchSong: ['keyword', 'limit'],
  subscribeGameplayUpdates: null,
  unsubscribeGameplayUpdates: null
})

export const GameplayTypes = Types
export default Creators

/* ------------- Initial State ------------- */
/*
Card {
  content, title, id
}

players [
  { fcmToken, id, name, profileImage, tapes }
]
*/
export const INITIAL_STATE = Immutable({
  round: 2,
  players: [],
  card: null,
  loading: null,
  error: null,
  gameId: 'xPKKw5L8avkfjnuWsWhE',
  searchedSongs: [],
})

/* ------------- Selectors ------------- */

export const GameplaySelectors = {
  getRound: state => state.gameplay.round,
  searchedSongs: state => state.gameplay.searchedSongs,
  isLoading: state => state.gameplay.loading,
  selectGameId: state => state.gameplay.gameId
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

export const saveGameInfo = (state, { gameInfo }) =>
  state.merge({ round: gameInfo.currentRound, players: gameInfo.players, card: gameInfo.card })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAMEPLAY_FAILURE]: failure,
  [Types.SAVE_SONG_SELECTION_SUCCESS]: saveSongSelectionSuccess,
  [Types.VOTE_ROUND_WINNER_SUCCESS]: voteRoundWinnerSuccess,
  [Types.SEARCHED_SONGS_SUCCESS]: searchedSongsSuccess,
  [Types.SEARCHED_SONGS_SUCCESS]: searchedSongsSuccess,
  [Types.SAVE_GAME_ID]: saveGameId,
  [Types.SAVE_GAME_INFO]: saveGameInfo,
})
