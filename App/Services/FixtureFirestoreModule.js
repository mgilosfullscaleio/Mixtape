import Result from 'folktale/result'

export default {
  getUser: spotifyId => Promise.resolve(Result.Ok(require('../Fixtures/user.json'))),
  fetchUserInOpenMatch: (playerId) => Promise.resolve(Result.Ok(true)),
  removePlayerFromOpenMatch: () => Promise.resolve(Result.Ok(true)),
  playerJoinObserver: emitter => {
    setTimeout(() => {
      emitter(require('../Fixtures/player.json'))
    }, 2000)

    setTimeout(() => {
      emitter(require('../Fixtures/player.json'))
    }, 3000)

    return () => {}
  },
  addPlayerToOpenMatch: playerId => Promise.resolve(Result.Ok()),
  subscribeGameplay: (gameId, playerId, emitter) => Promise.resolve(Result.Ok(true)),
  updateSongSelection: (playerId, song) => Promise.resolve(Result.Ok(true)),
  voteRoundWinner: (playerId) => Promise.resolve(Result.Ok(true)),
}