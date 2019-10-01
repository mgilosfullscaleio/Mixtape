import { call, put, select, takeEvery } from 'redux-saga/effects'
import GameplayActions, { GameplaySelectors } from '../Redux/GameplayRedux'
import Spotify from 'rn-spotify-sdk'
import Result from 'folktale/result'
import { UserSelectors } from '../Redux/UserRedux'

const onGameplayChannel = (firestore, gameId, userId) =>
  eventChannel(emitter => {
    const unsubscribe = firestore.gameplayObserver(emitter, gameId, userId)

    return () => unsubscribe()
  })

export function * subscribeGameplay(firestore, action) {
  const gameId = yield select(GameplaySelectors.selectGameId())
  const userId = yield select(UserSelectors.selectUserId())

  const channel = yield call(onGameplayChannel, firestore, gameId, userId)

  yield takeEvery(channel, function * (action) {
    console.tron.log('gameplay actions', actions)
    // yield put(Actions.playerJoinMatch(players))
  })

  // yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  // channel.close()
}

export function * saveSongSelection(api, action) {
  const { playerId, song } = action

  const response = yield call(api.updateSongSelection, playerId, song)

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
      Ok: ({ value }) => GameplayActions.saveSongSelectionSuccess(value), 
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
        //uri: uri, 
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


