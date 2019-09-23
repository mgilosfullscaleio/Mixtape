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
import Actions from '../Redux/LobbyRedux'
// import { LobbySagasSelectors } from '../Redux/LobbySagasRedux'

export function * fetchUserInOpenMatch (api, action) {
  const { playerId } = action
  // get current data from Store
  // const currentData = yield select(LobbySagasSelectors.getData)
  // make the call to the api
  const response = yield call(api.fetchUserInOpenMatch, playerId)

  yield put(
    response.matchWith({
      Ok: ({ value }) => Actions.fetchUserInOpenMatchSuccess(value),
      Error: ({ value }) => Actions.lobbyFailure(value)
    })
  )

}
