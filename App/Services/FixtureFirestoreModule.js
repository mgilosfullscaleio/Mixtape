import Result from 'folktale/result'

export default {
  getUser: spotifyId => Promise.resolve(Result.Ok(require('../Fixtures/user.json'))),
  fetchUserInOpenMatch: (playerId) => Promise.resolve(Result.Ok(true)),
}