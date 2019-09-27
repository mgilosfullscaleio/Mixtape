import Result from 'folktale/result'

export default {
  getUser: spotifyId => Promise.resolve(Result.Ok(require('../Fixtures/user.json'))),
  fetchUserInOpenMatch: (playerId) => Promise.resolve(Result.Ok(true)),
  subscribeGameplay: (gameId, playerId, emitter) => Promise.resolve(Result.Ok(true)),
  updateSongSelection: (playerId, song) => Promise.resolve(Result.Ok(true)),
  voteRoundWinner: (playerId) => Promise.resolve(Result.Ok(true)),
}