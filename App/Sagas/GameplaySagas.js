import { call, put, select, takeEvery, take } from 'redux-saga/effects'
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
    

    const timerId = setInterval(() => {
      const elapse = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000)
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
    
    const timerChannel = yield call(onTimerTickChannel, gameplayInfo.created)
    yield takeEvery(timerChannel, function* (tick) {
      if (tick <= 0)
        yield put(NavigationActions.navigate({ routeName: screens.gamePlay.roundWinnerSelection }))
      
      yield put(GameplayActions.setTimerTick(tick))
    })

    const gameplayChannel = yield call(onGameplayChannel, firestore, gameId, userId, gameplayInfo.currentRound)
    yield takeEvery(gameplayChannel, function* (docUpdate) {
      console.tron.log('docUpdate: ', docUpdate)
      const card = docUpdate.card || {title: '', content: ''}
      const mutablePlayers = yield select(GameplaySelectors.selectPlayersAsMutable)
      const players = mutablePlayers.map(player => {
        // player id exist, then merge changes
        const playerUpdate = docUpdate.players && docUpdate.players[player.id]
        return playerUpdate ? {...player, ...playerUpdate} : player
      })

      yield put(GameplayActions.saveGameUpdate({card, players}))
    })

    yield take(GameplayTypes.UNSUBSCRIBE_GAMEPLAY_UPDATES)
    gameplayChannel.close()
    timerChannel.close()
  }
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

export function * voteRoundWinner(api, action) {
  const { playerId } = action

  const response = yield call(api.voteRoundWinner, playerId)

  yield put(
    response.matchWith({
      Ok: ({ value }) => GameplayActions.voteRoundWinnerSuccess(), 
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