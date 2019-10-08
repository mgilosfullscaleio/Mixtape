import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { UserSelectors } from './UserRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameplayRequest: ['data'],
  gameplaySuccess: ['payload'],
  gameplayFailure: null,
  saveGameId: ['gameId'],
  saveSongSelectionSuccess: ['song'],
  saveSongVoteSuccess: ['song'],
  searchedSongsSuccess: ['searchedSongs'],
  saveGameInfo: ['gameInfo'],
  saveGameUpdate: ['gameUpdate'],
  updateRoundWinner: ['roundWinner'],
  setTimerTick: ['timerTick'],
  resetGameplayRound: null,

  //saga trigger
  subscribeGameplay: null,
  saveSongSelection: ['song'],
  voteRoundWinner: ['playerId'],
  searchSong: ['keyword', 'limit'],
  playSong: ['song'],
  pauseSong: null,
  resumeSong: null,
  subscribeGameplayUpdates: null,
  subscribeVotingRoundUpdates: null,
  unsubscribeGameplayUpdates: null,
  updateGameNextRound: null,
  playRoundWinnerSong: null
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

roundWinner {
  round1: playerId,
  round2: playerId,
  ...
}
*/
export const INITIAL_STATE = Immutable({
  round: 1,
  roundWinner: {}, //playerId
  players: [],
  card: { title: '', content: '' },
  loading: false,
  error: null,
  gameId: null,
  gameStart: null,  //date ISOString
  searchedSongs: [],
  timerTick: 0,
  song: null,
  songVote: null
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
  selectGameStart: state => state.gameplay.gameStart,
  selectRoundWinnerAsMutable: state => Immutable.asMutable(state.gameplay.roundWinner),
  selectPlayers: state => state.gameplay.players,
  selectPlayerVotedSong: state => state.gameplay.songVote,
  selectPlayerSubmittedSong: state => state.gameplay.song,
  selectPlayerSubmittedSongs: state => computePlayerSubmittedSongs(state.gameplay.song, state.gameplay.players),
  selectIsUserTheRoundWinner: state => getRoundWinner(state.gameplay) === UserSelectors.selectUserId(state),
  selectWinningSong: state => collectRoundWinningSong(state.gameplay)
}

const getRoundWinner = gameplay => gameplay.roundWinner[`round${gameplay.round}`]

const collectRoundWinningSong = gameplay =>
  gameplay.players.find(player => player.id === getRoundWinner(gameplay))

const computePlayerSubmittedSongs = (song, players) => (
  [
    song,
    ...players.filter(p => p.song && p.song !== song).map(p => ({ playerId: p.id, ...p.song }))
  ].filter(s => s)
  )

/* ------------- Reducers ------------- */

export const failure = (state, { error }) =>
  state.merge({ loading: false, error })

export const saveSongSelectionSuccess = (state, { song }) =>
  state.merge({ loading: false, song })

export const saveSongVoteSuccess = (state, { song }) =>
  state.merge({ loading: false, songVote: song })

export const searchedSongsSuccess = (state, { searchedSongs }) =>
  state.merge({ loading: false, error: null, searchedSongs })

export const saveGameId = (state, { gameId }) =>
  state.merge({ gameId })

export const saveGameInfo = (state, { gameInfo }) =>
  state.merge({ 
    round: gameInfo.currentRound, 
    players: gameInfo.players,
    gameStart: gameInfo.gameStart
  })

export const saveGameUpdate = (state, { gameUpdate }) =>
  state.merge({ card: gameUpdate.card, players: gameUpdate.players })

export const updateRoundWinner = (state, { roundWinner }) =>
  state.merge({ roundWinner })

export const setTimerTick = (state, { timerTick }) =>
  state.merge({ timerTick })

export const resetGameplayRound = state =>
  state.merge({ songVote: null, song: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAMEPLAY_FAILURE]: failure,
  [Types.SAVE_SONG_SELECTION_SUCCESS]: saveSongSelectionSuccess,
  [Types.SAVE_SONG_VOTE_SUCCESS]: saveSongVoteSuccess,
  [Types.SEARCHED_SONGS_SUCCESS]: searchedSongsSuccess,
  [Types.SAVE_GAME_ID]: saveGameId,
  [Types.SAVE_GAME_INFO]: saveGameInfo,
  [Types.SAVE_GAME_UPDATE]: saveGameUpdate,
  [Types.SET_TIMER_TICK]: setTimerTick,
  [Types.UPDATE_ROUND_WINNER]: updateRoundWinner,
  [Types.RESET_GAMEPLAY_ROUND]: resetGameplayRound,
})
