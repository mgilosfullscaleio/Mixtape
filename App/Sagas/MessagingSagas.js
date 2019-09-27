import { call, put, take } from 'redux-saga/effects'
import MessagingActions from '../Redux/MessagingRedux'
import { LobbyTypes } from '../Redux/LobbyRedux'
import firebase from 'react-native-firebase'
import Result from 'folktale/result'

//TODO consider extracting api for firebase messaging
const getToken = () =>
  firebase.messaging().getToken()
    .then(fcmToken => {
      if (fcmToken) {
        return Result.Ok(fcmToken)
      } else {
        return Result.Error('Failed to generate fcm token')
      } 
    })

const requestPerission = () =>
  firebase
    .messaging()
    .hasPermission()
    .then(enabled => Result.Ok(enabled))
    .catch(e => Result.Error(e))

export function * generateToken (action) {
  const response = yield call(getToken)

  yield put(
    response.matchWith({
      Ok: ({ value }) => MessagingActions.messagingSuccess(value),
      Error: ({ value }) => MessagingActions.messagingFailure(value)
    })
  )
}

export function * initiateAndroidPermission (action) {
  const response = yield call(requestPerission)

  yield put(
    response.matchWith({
      Ok: ({ value }) => MessagingActions.requestAndroidPermissionSuccess(value),
      Error: ({ value }) => MessagingActions.requestAndroidPermissionFailure(value)
    })
  )
}

export function * subscribeGameStart (action) {
  //TODO close connection
  const messageListener = firebase.messaging().onMessage(message => {
    console.tron.log(message)
  });

  yield take(LobbyTypes.QUIT_OPEN_MATCH)
  messageListener()
}
