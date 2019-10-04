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
  saveGameUpdate: ['gameUpdate'],
  setTimerTick: ['timerTick'],
  //saga trigger
  subscribeGameplay: null,
  saveSongSelection: ['song'],
  voteRoundWinner: ['playerId'],
  searchSong: ['keyword', 'limit'],
  playSong: ['song'],
  pauseSong: null,
  resumeSong: null,
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
  round: 1,
  players: [],
  card: { title: '', content: '' },
  loading: false,
  error: null,
  gameId: 'SX55J0TcW3usKssctYZ8',
  gameStart: null,  //date ISOString
  searchedSongs: [],
  timerTick: 0
})

/* ------------- Selectors ------------- */

export const GameplaySelectors = {
  searchedSongs: state => state.gameplay.searchedSongs,
  isLoading: state => state.gameplay.loading,
  selectGameId: state => state.gameplay.gameId,
  selectCardContent: state => state.gameplay.card.content,
  selectCardTitle: state => state.gameplay.card.title,
  selectTimerTick: state => state.gameplay.timerTick,
  selectRound: state => state.gameplay.round,
  selectPlayers: state => state.gameplay.players,
  selectPlayersAsMutable: state => state.gameplay.players
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
  state.merge({ 
    round: gameInfo.currentRound, 
    players: gameInfo.players,
    gameStart: gameInfo.created
  })

export const saveGameUpdate = (state, { gameUpdate }) =>
  state.merge({ card: gameUpdate.card, players: gameUpdate.players })

export const setTimerTick = (state, { timerTick }) =>
  state.merge({ timerTick })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAMEPLAY_FAILURE]: failure,
  [Types.SAVE_SONG_SELECTION_SUCCESS]: saveSongSelectionSuccess,
  [Types.VOTE_ROUND_WINNER_SUCCESS]: voteRoundWinnerSuccess,
  [Types.SEARCHED_SONGS_SUCCESS]: searchedSongsSuccess,
  [Types.SAVE_GAME_ID]: saveGameId,
  [Types.SAVE_GAME_INFO]: saveGameInfo,
  [Types.SAVE_GAME_UPDATE]: saveGameUpdate,
  [Types.SET_TIMER_TICK]: setTimerTick,
})
