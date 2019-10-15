import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { UserSelectors } from './UserRedux'
import { pipe, reduce, defaultTo, toPairs, head, inc, max, equals, filter, length, values, flatten, complement } from 'ramda'

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
  addSecondsToGameTimer: ['seconds'],

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
  updateGameNextRound: ['delay'], //millis
  playRoundWinnerSong: null,
  subscribeTiebreakerRound: null,
  unsubscribeTiebreakerRound: null,
  updateRoundTiebreakWinner: ['playerId']
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
  round1: [playerId],
  round2: [playerId],
  ...
}
*/
export const INITIAL_STATE = Immutable({
  round: 1,
  roundWinner: { },
  players: [],
  card: { title: '', content: '' },
  loading: false,
  error: null,
  gameId: null,
  gameStart: null,  //date ISOString
  gameTimer: 0, //millis
  searchedSongs: [],
  timerTick: 0,
  song: null,
  songVote: null,
  tiebreakWinner: null
})

/* ------------- Selectors ------------- */

export const GameplaySelectors = {
  selectGameTimer: state => state.gameplay.gameTimer,
  searchedSongs: state => state.gameplay.searchedSongs,
  isLoading: state => state.gameplay.loading,
  selectGameId: state => state.gameplay.gameId,
  selectCardContent: state => state.gameplay.card.content,
  selectCardTitle: state => state.gameplay.card.title,
  selectTimerTick: state => state.gameplay.timerTick,
  selectRound: state => state.gameplay.round,
  selectGameStart: state => state.gameplay.gameStart,
  selectRoundWinnerAsMutable: state => Immutable.asMutable(state.gameplay.roundWinner),
  selectPlayers: state => getPlayers(state.gameplay),
  selectPlayerVotedSong: state => state.gameplay.songVote,
  selectPlayerSubmittedSong: state => state.gameplay.song,
  selectPlayerSubmittedSongs: state => computePlayerSubmittedSongs(state.gameplay.song, state.gameplay.players),
  selectIsUserTheRoundWinner: state => getRoundWinner(state.gameplay)[0] === UserSelectors.selectUserId(state),
  selectRoundWinnerPlayer: state => findWinnerPlayer(state.gameplay),
  selectWinningSong: state => collectRoundWinningSong(state.gameplay),
  selectSongsForTiebreak: state => collectTiebreakSongs(state.gameplay),
  selectIsTiebreakNeeded: state => getRoundWinner(state.gameplay).length > 1,
  selectAllPlayerIdForTiebreak: state => collectPlayerIdsWhoSubmittedASong(state.gameplay),
  selectWinnerSongTitleFromTiebreak: state => collectWinnerSongTitle(state.gameplay),
  selectGameWinnerPlayer: state => findGameWinnerPlayer(state.gameplay),
  selectHasAnyPlayerSubmittedSong: state => hasAnyPlayerSubmittedSong(state.gameplay),
  selectIsTiebreakNeededForGameWinner: state => !hasAGameWinner(state.gameplay),
}

const hasAnyPlayerSubmittedSong = gameplay =>
  gameplay.players
    .filter(player => player.song)
    .length > 0

const collectPlayerIdsWhoSubmittedASong = gameplay =>
  gameplay.players
    .filter(player => player.song)
    .map(player => player.id)

const collectWinnerSongTitle = gameplay => {
  if (!gameplay.tiebreakWinner) return ''
  
  return gameplay.players
    .filter(p => p.id === gameplay.tiebreakWinner)
    .filter(p => p.song)
    .map(p => p.song.title)[0]
  }

const hasAGameWinner = gameplay => {
  const value = largestValue(gameplay.roundWinner)
  const equalScores = ([k,v]) => value === v
  return pipe(toPairs, filter(equalScores), length, equals(1))(playerScores(gameplay.roundWinner))
}

const getPlayers = gameplay => 
  gameplay.players.map(player => {
    const score = pipe(values, flatten, filter(equals(player.id)), length)(gameplay.roundWinner)
    return { ...player, score }
  })


const collectTiebreakSongs = gameplay =>
  gameplay.players
    .filter(p => getRoundWinner(gameplay).includes(p.id))
    .filter(p => p.song)
    .map(p => ({ playerId: p.id, ...p.song }))

const getRoundWinner = gameplay => gameplay.roundWinner[`round${gameplay.round}`]

const findWinnerPlayer = gameplay =>
  gameplay.players.find(player => getRoundWinner(gameplay).includes(player.id))

const occurences = reduce((acc, x) => ({
  ...acc,
  [x]: pipe(defaultTo(0), inc)(acc[x])
}), Object.create(null))

const largestPair = reduce(([k0, v0], [k1, v1]) => {
  const maxVal = max(v0, v1)
  const keyOfLargest = maxVal > v0 ? k1 : k0
  return [keyOfLargest, maxVal]
}, [null, -Infinity])

const largestValue = roundWinner =>
  pipe(values, flatten, occurences, values, reduce(max, -Infinity))(roundWinner)

const playerScores = roundWinner =>
  pipe(values, flatten, occurences)(roundWinner)

const findGameWinnerPlayer = gameplay => {
  const mode = pipe(values, flatten, occurences, toPairs, largestPair, head)
  const winner = mode(gameplay.roundWinner)
  return gameplay.players.find(player => player.id === winner)
}

const collectRoundWinningSong = gameplay =>
  findWinnerPlayer(gameplay).song || {}

const computePlayerSubmittedSongs = (song, players) => (
  [
    song,
    ...players.filter(p => {
      const submittedSong = song || { }
      const playerSong = p.song || null
      return playerSong && playerSong.id !== submittedSong.id
    })
    .map(p => ({ playerId: p.id, ...p.song }))
  ]
  .filter(s => s)
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
  state.merge({ gameId, roundWinner: {}, players: [] })

export const saveGameInfo = (state, { gameInfo }) =>
  state.merge({ 
    round: gameInfo.currentRound, 
    players: gameInfo.players,
    gameStart: gameInfo.gameStart,
    gameTimer: new Date(gameInfo.gameStart).getTime()
  })

export const saveGameUpdate = (state, { gameUpdate }) =>
  state.merge({ card: gameUpdate.card, players: gameUpdate.players })

export const updateRoundWinner = (state, { roundWinner }) =>
  state.merge({ roundWinner })

export const setTimerTick = (state, { timerTick }) =>
  state.merge({ timerTick })

export const resetGameplayRound = state =>
  state.merge({ songVote: null, song: null, timerTick: 0, gameTimer: 0 })

export const updateRoundTiebreakWinner = (state, { playerId }) =>
  state.merge({ tiebreakWinner: playerId })

export const addSecondsToGameTimer = (state, { seconds }) => {
  const gameTimer = state.gameTimer + (seconds * 1000)
  return state.merge({ gameTimer })
}

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
  [Types.UPDATE_ROUND_TIEBREAK_WINNER]: updateRoundTiebreakWinner,
  [Types.ADD_SECONDS_TO_GAME_TIMER]: addSecondsToGameTimer,
})
