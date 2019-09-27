import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  messagingSuccess: ['fcmToken'],
  messagingFailure: null,

  //saga trigger
  messagingRequest: null,
})

export const MessagingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fcmToken: null,
  error: null
})

/* ------------- Selectors ------------- */

export const MessagingSelectors = {
  selectToken: state => state.messaging.fcmToken
}

/* ------------- Reducers ------------- */

export const success = (state, { fcmToken }) =>
  state.merge({ fcmToken, error: null })

export const failure = (state, { error }) =>
  state.merge({ error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGING_SUCCESS]: success,
  [Types.MESSAGING_FAILURE]: failure
})
