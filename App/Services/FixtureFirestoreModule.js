import Result from 'folktale/result'

export default {
  signInWithPhoneNumber: phoneNumber =>
    Promise.resolve({
      confirm: code => Promise.resolve({
        uid: '4vUw5eIlBqRtL3Tm02XqI7nmM1U2'
      })
    }),

  queryUserWithUId: userUId =>
    Promise.resolve(Result.Ok(require('../Fixtures/user_admin.json')))
}
