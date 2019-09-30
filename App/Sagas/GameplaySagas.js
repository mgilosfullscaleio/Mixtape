/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import GameplayActions from '../Redux/GameplayRedux'
import Spotify from 'rn-spotify-sdk';

import Result from 'folktale/result'

export function * getGameplay (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(GameplaySelectors.getData)
  // make the call to the api
  const response = yield call(api.getgameplay, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(GameplayActions.gameplaySuccess(response.data))
  } else {
    yield put(GameplayActions.gameplayFailure())
  }
}

export function * subscribeGameplay(api, action) {
  const { gameId, playerId, emitter} = action
  
  yield call(api.subscribeGameplay, gameId, playerId, emitter)
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


