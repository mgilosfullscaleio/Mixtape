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
  roundWinner: {},
  players: [],
  card: { title: '', content: '' },
  loading: false,
  error: null,
  gameId: 'JsQVmdBTGvwIid2CUi4K',
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
}

const collectPlayerIdsWhoSubmittedASong = gameplay =>
  gameplay.players
    .filter(player => player.song)
    .map(player => ({ id: player.id }))

const collectWinnerSongTitle = gameplay => {
  if (!gameplay.tiebreakWinner) return ''
  
  return gameplay.players
    .filter(p => p.id === gameplay.tiebreakWinner)
    .filter(p => p.song)
    .map(p => p.song.title)[0]
  }

const getPlayers = gameplay => 
  gameplay.players.map(player => {
    var score = 0
    Object.entries(gameplay.roundWinner).map(([roundTitle, playerData]) => {
      console.tron.log('playerData', playerData)
      if (playerData.find(playerId => playerId === player.id))
            score = score + 1
    })
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

const findGameWinnerPlayer = gameplay => 
  gameplay.players.find(player => getRoundWinner(gameplay).includes(player.id))

const collectRoundWinningSong = gameplay =>
  findWinnerPlayer(gameplay).song || {}

const computePlayerSubmittedSongs = (song, players) => (
  [
    song,
    ...players.filter(p => {
      const submittedSong = song || { }
      const playerSong = p.song || { }
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
  state.merge({ gameId })

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
