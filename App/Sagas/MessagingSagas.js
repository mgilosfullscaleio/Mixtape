import { call, put, take, takeEvery } from 'redux-saga/effects'
import MessagingActions from '../Redux/MessagingRedux'
import { LobbyTypes } from '../Redux/LobbyRedux'
import firebase from 'react-native-firebase'
import Result from 'folktale/result'
import { eventChannel } from 'redux-saga'

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
    .then(enabled => {
      return (enabled) 
        ? Result.Ok(true)
          : firebase.messaging().requestPermission()
    })
    .catch(e => Result.Error(e))

export function * generateToken (action) {
  const response = yield call(getToken)

  yield put(
    response.matchWith({
      Ok: ({ value }) => MessagingActions.generateTokenSuccess(value),
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
  const tokenRefreshChannel = yield call(onTokenRefresh, firebase.messaging())

  yield takeEvery(tokenRefreshChannel, function* (fcmToken) {
    yield put(MessagingActions.generateTokenSuccess(fcmToken))
  })

  const messageChannel = yield call(onMessageReceived, firebase.messaging())

  yield takeEvery(messageChannel, function* (message) {
    console.tron.log('subscribeGameStart message', message)
  })

  yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  messageChannel.close()
  tokenRefreshChannel.close()
}

const onTokenRefresh = messaging =>
  eventChannel(emitter => {
    const unsubscribe = messaging.onTokenRefresh(fcmToken => {
      emitter(fcmToken)
    });

    return () => unsubscribe()
  })

const onMessageReceived = messaging =>
  eventChannel(emitter => {
    const unsubscribe = messaging.onMessage(message => {
      emitter(message)
    });

    return () => unsubscribe()
  })