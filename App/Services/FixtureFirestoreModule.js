import Result from 'folktale/result'

export default {
  getData: () => Promise.resolve(Result.Ok(require('../Fixtures/root.json')))
}