import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  generateTokenSuccess: ['fcmToken'],
  messagingFailure: null,
  requestAndroidPermissionSuccess: ['granted'],
  requestAndroidPermissionFailure: ['error'],

  //saga trigger
  requestToken: null,
  requestAndroidPermission: null,
  subscribeGameStartMessage: null,
  subscribeTokenRefresh: null
})

export const MessagingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fcmToken: null,
  error: null,
  hasPermission: false
})

/* ------------- Selectors ------------- */

export const MessagingSelectors = {
  selectToken: state => state.messaging.fcmToken,
  selectHasPermission: state => state.messaging.hasPermission
}

/* ------------- Reducers ------------- */

export const generateTokenSuccess = (state, { fcmToken }) =>
  state.merge({ fcmToken, error: null })

export const permissionSuccess = (state, { granted }) =>
  state.merge({ hasPermission: granted, error: null })

export const failure = (state, { error }) =>
  state.merge({ error })

export const permissionFailure = (state, { error }) =>
  state.merge({ error, hasPermission: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GENERATE_TOKEN_SUCCESS]: generateTokenSuccess,
  [Types.REQUEST_ANDROID_PERMISSION_SUCCESS]: permissionSuccess,
  [Types.REQUEST_ANDROID_PERMISSION_FAILURE]: permissionFailure,
  [Types.MESSAGING_FAILURE]: failure
})
