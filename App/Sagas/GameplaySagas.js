import { call, put, select, takeEvery, take, delay } from 'redux-saga/effects'
import GameplayActions, { GameplaySelectors, GameplayTypes } from '../Redux/GameplayRedux'
import Spotify from 'rn-spotify-sdk'
import Result from 'folktale/result'
import { UserSelectors } from '../Redux/UserRedux'
import { eventChannel } from 'redux-saga'
import { screens } from '../Lib/constants'
import { NavigationActions } from 'react-navigation'

const onGameplayChannel = (firestore, gameId, userId, currentRound) =>
  eventChannel(emitter => {
    const unsubscribe = firestore.gameplayObserver(emitter, gameId, userId, currentRound)

    return () => unsubscribe
  })

const onTimerTickChannel = startTime =>
  eventChannel(emitter => {
    const startDate = new Date(startTime).getTime()
    const timerId = setInterval(() => {
      const elapse = Math.floor((Date.now() - startDate) / 1000)
      let tick = 60 - elapse

      emitter(tick)
      if (tick < 0) clearInterval(timerId)

    }, 1000)

    return () => clearInterval(timerId)
  })

export function * subscribeGameplay(firestore, action) {
  const gameId = yield select(GameplaySelectors.selectGameId)
  const userId = yield select(UserSelectors.selectUserId)

  //check currentRound of the game
  const result = yield call(firestore.getGameplayInfo, gameId)
  const gameplayInfo = result.getOrElse(null)
  console.tron.log('subscribeGameplay', gameId, gameplayInfo)

  //subscribe to gameplay of round
  if (gameplayInfo && gameplayInfo.currentRound <= 5) {

    yield put(GameplayActions.saveGameInfo(gameplayInfo))
    
    const timerChannel = yield call(onTimerTickChannel, gameplayInfo.gameStart)
    yield takeEvery(timerChannel, function* (tick) {
      const defaultTick = tick < 0 ? 0 : tick
      yield put(GameplayActions.setTimerTick(defaultTick))

      if (tick < 0)
        yield put(NavigationActions.navigate({ routeName: screens.gamePlay.roundWinnerSelection }))
    })

    const gameplayChannel = yield call(onGameplayChannel, firestore, gameId, userId, gameplayInfo.currentRound)
    yield takeEvery(gameplayChannel, function* (docUpdate) {
      console.tron.log('docUpdate: ', docUpdate)
      const card = docUpdate.card || {title: '', content: ''}
      const mutablePlayers = yield select(GameplaySelectors.selectPlayers)
      const players = mutablePlayers.map(player => {
        // player id exist, then merge changes
        const playerUpdate = docUpdate.players && docUpdate.players[player.id]
        return playerUpdate ? {...player, ...playerUpdate} : player
      })

      // save song selection from user
      const userPlayer = players.find(p => p.id === userId)
      if (userPlayer && userPlayer.song)
        yield put(GameplayActions.saveSongSelectionSuccess(userPlayer.song))

      const votedUserPlayer = players.find(p => p.id === userPlayer.vote)
      if (votedUserPlayer && votedUserPlayer.song)
         yield put(GameplayActions.saveSongVoteSuccess(votedUserPlayer.song))
      
      yield put(GameplayActions.saveGameUpdate({card, players}))
    })

    // yield put(GameplayActions.voteRoundWinner('vMpgxp3UPGzEI5ctqTjx'))

    yield take(GameplayTypes.UNSUBSCRIBE_GAMEPLAY_UPDATES)
    gameplayChannel.close()
    timerChannel.close()
    yield put(GameplayActions.pauseSong())
  }
}

const collectRoundWinner = (voteCount = {}) => {
  const highestVoteCount = Object.values(voteCount).reduce((max, val) => Math.max(max,val), 0)
  const winners = 
    Object.entries(voteCount)
      .map(
        ([key, value]) => ({
          playerId: key,
          vote: value
        })
      )
      .filter(item => item.vote === highestVoteCount)
      .map(item => item.playerId.trim())

  return winners.length > 0 ? winners : playerIds
}

export function * subscribeVotingRound(firestore, action) {
  const currentRound = yield select(GameplaySelectors.selectRound)
  const playerIds = yield select(GameplaySelectors.selectAllPlayerIdForTiebreak)
  const roundWinner = yield select(GameplaySelectors.selectRoundWinnerAsMutable)
  // Start the voting round by adding all player ids as round winners
  roundWinner[`round${currentRound}`] = playerIds
  yield put(GameplayActions.updateRoundWinner(roundWinner))

  // start vote timer
  const gameStart = yield select(GameplaySelectors.selectGameStart)
  const gameStartDate = new Date(gameStart).getTime()
  const voteRoundStart = new Date(gameStartDate + 60000).toISOString()  // add 1 minute
  const timerChannel = yield call(onTimerTickChannel, voteRoundStart)
  yield takeEvery(timerChannel, function* (tick) {
    const defaultTick = tick < 0 ? 0 : tick
    yield put(GameplayActions.setTimerTick(defaultTick))
    
    if (tick < 0) {
      yield delay(1000)

      const isTiebreakNeeded = yield select(GameplaySelectors.selectIsTiebreakNeeded)
      if (isTiebreakNeeded)
        yield put(NavigationActions.navigate({ routeName: screens.gamePlay.roundWinnerRandomizer }))
      else
        yield put(NavigationActions.navigate({ routeName: screens.gamePlay.roundWinner }))
    }
  })

  // update round winner
  const userId = yield select(UserSelectors.selectUserId)
  const gameId = yield select(GameplaySelectors.selectGameId)
  const gameplayChannel = yield call(onGameplayChannel, firestore, gameId, userId, currentRound)
  yield takeEvery(gameplayChannel, function* (docUpdate) {
    if (docUpdate.voteCount) {
      roundWinner[`round${currentRound}`] = collectRoundWinner(docUpdate.voteCount)
      yield put(GameplayActions.updateRoundWinner(roundWinner))
    }
  })


  yield take(GameplayTypes.UNSUBSCRIBE_GAMEPLAY_UPDATES)
  gameplayChannel.close()
  timerChannel.close()
  yield put(GameplayActions.pauseSong())
}

export function * playRoundWinnerSong(action) {
  const winningSong = yield select(GameplaySelectors.selectWinningSong)
  yield put(GameplayActions.playSong(winningSong))
  
  const gameStart = yield select(GameplaySelectors.selectGameStart)
  const gameStartDate = new Date(gameStart).getTime()
  const celebrationDuration = new Date(gameStartDate + 95000).toISOString()  // add 35 sec
  const timerChannel = yield call(onTimerTickChannel, celebrationDuration)
  yield takeEvery(timerChannel, function* (tick) {
    const defaultTick = tick < 0 ? 0 : tick
    yield put(GameplayActions.setTimerTick(defaultTick))
    
    if (tick < 0) {
      const isUserWinner = yield select(GameplaySelectors.selectIsUserTheRoundWinner)
      if (isUserWinner) yield put(GameplayActions.updateGameNextRound())

      yield delay(3000)

      const currentRound = yield select(GameplaySelectors.selectRound)
      if (currentRound === 5)
        yield put(NavigationActions.navigate({ routeName: screens.gamePlay.gameWinner }))
      else
        yield put(NavigationActions.navigate({ routeName: screens.gamePlay.playerSongSelection }))
    }
  })
}

export function * subscribeTiebreakerRound(firestore, action) {
  const gameId = yield select(GameplaySelectors.selectGameId)
  const currentRound = yield select(GameplaySelectors.selectRound)
  const userId = yield select(UserSelectors.selectUserId)
  const songs = yield select(GameplaySelectors.selectSongsForTiebreak)
  const rand = Math.floor(Math.random() * songs.length)
  const playerWinner = songs[rand].playerId
  console.tron.log('subscribeTiebreakerRound', songs, playerWinner, songs[1].playerId)
  //the first player in the song is the one to right to firestore
  if (songs[1].playerId === userId) {
    firestore.updateRoundTiebreakWinner(gameId, currentRound, playerWinner)
  }


  const duration = new Date(Date.now() + 8000).toISOString()
  const timerChannel = yield call(onTimerTickChannel, duration)
  // yield takeEvery(timerChannel, function* (tick) {
    // const defaultTick = tick < 0 ? 0 : tick
    // yield put(GameplayActions.setTimerTick(defaultTick))

    // if (tick < 0) {
    //   yield put(NavigationActions.navigate({ routeName: screens.gamePlay.playerSongSelection }))
    // }
  // })

  const gameplayChannel = yield call(onGameplayChannel, firestore, gameId, userId, currentRound)
  yield takeEvery(gameplayChannel, function* (docUpdate) {
    if (docUpdate.tiebreakWinner) {
      yield put(GameplayActions.updateRoundTiebreakWinner(docUpdate.tiebreakWinner))

      const songWinnerTitle = yield select(GameplaySelectors.selectWinnerSongTitleFromTiebreak)
      console.tron.log('songWinnerTitle', songWinnerTitle)
    }
  })

  yield take(GameplayTypes.UNSUBSCRIBE_TIEBREAKER_ROUND)
  gameplayChannel.close()
  timerChannel.close()
}

export function * saveSongSelection(api, action) {
  const { song } = action
  const gameId = yield select(GameplaySelectors.selectGameId)
  const userId = yield select(UserSelectors.selectUserId)
  const currentRound = yield select(GameplaySelectors.selectRound)

  const response = yield call(api.updateSongSelection, gameId, currentRound, userId, song)

  yield put(
    response.matchWith({
      Ok: ({ value }) => GameplayActions.saveSongSelectionSuccess(value), 
      Error: ({ value }) => GameplayActions.gameplayFailure(value)
    })
  )
}

export function * voteRoundWinner(api, { playerId }) {
  const mutablePlayers = yield select(GameplaySelectors.selectPlayers)
  const votedUserPlayer = mutablePlayers.find(p => p.id === playerId)
  const voteSong = votedUserPlayer && votedUserPlayer.song
  const gameId = yield select(GameplaySelectors.selectGameId)
  const userId = yield select(UserSelectors.selectUserId)
  const currentRound = yield select(GameplaySelectors.selectRound)
  const response = yield call(api.voteRoundWinner, gameId, currentRound, userId, playerId)

  yield put(
    response.matchWith({
      Ok: ({ value }) => GameplayActions.saveSongVoteSuccess(voteSong), 
      Error: ({ value }) => GameplayActions.gameplayFailure(value)
    })
  )
}

const getSongTacksByKeywords = async (keyword, limit, offset=0) => {
  try {
    const { tracks } = await Spotify.search(keyword, ['track'], { limit, offset });
    const { items } = tracks;
    console.tron.log('items', items, tracks);
    const songs = items.map(item => {
      const { name, artists, album, uri, id } = item
      const albumImages = album.images || []
      return {
        id,
        uri, 
        title: name,
        singer: !!artists[0] ? artists[0].name : '',
        albumCover: !!albumImages[0] ? albumImages[0].url : '',
        //albumName:  album.name, 
      }
    });
    
    return Promise.resolve(Result.Ok(songs))
  }
  catch(error) {
    return Promise.resolve(Result.Error(error))
  }
  
}

export function * searchSong(action) {
  const { keyword, limit } = action

  const response = yield call(getSongTacksByKeywords, keyword, limit)

  yield put(
    response.matchWith({
      Ok: ({ value }) => GameplayActions.searchedSongsSuccess(value), 
      Error: ({ value }) => GameplayActions.gameplayFailure(value)
    })
  )
}

export function * playSong(action) {
  const { song, startPosition = 0 } = action
  Spotify.playURI(song.uri, 0, startPosition);
}

export function * pauseSong() {
  Spotify.setPlaying(false);
}

export function * resumeSong() {
  Spotify.setPlaying(true);
}

export function * updateNextRound(firestore, action) {
  const gameId = yield select(GameplaySelectors.selectGameId)

  const response = yield call(firestore.updateGameNextRound, gameId)

  // yield put(
  //   response.matchWith({
  //     Ok: ({ value }) => console.tron.log(value), //subscribe for next round
  //     Error: ({ value }) => GameplayActions.gameplayFailure(value)
  //   })
  // )
}