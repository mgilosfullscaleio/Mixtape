import { call, put, take, takeEvery } from 'redux-saga/effects'
import MessagingActions from '../Redux/MessagingRedux'
import LobbyActions, { LobbyTypes } from '../Redux/LobbyRedux'
import firebase from 'react-native-firebase'
import Result from 'folktale/result'
import { eventChannel } from 'redux-saga'
import { NavigationActions } from 'react-navigation'
import GameplayActions from '../Redux/GameplayRedux'

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

const requestPermission = () =>
  firebase
    .messaging()
    .hasPermission()
    .then(enabled => {
      return (enabled) || firebase.messaging().requestPermission()
    })
    .then(granted => Result.Ok(granted))
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
  const response = yield call(requestPermission)

  yield put(
    response.matchWith({
      Ok: ({ value }) => MessagingActions.requestAndroidPermissionSuccess(value),
      Error: ({ value }) => MessagingActions.requestAndroidPermissionFailure(value)
    })
  )
}

export function * subscribeGameStart (action) {
  const notificationChannel = yield call(onNotificationReceived, firebase.notifications())

  yield takeEvery(notificationChannel, function* (notification) {
    if (notification.title === 'OPEN_MATCH') {
      yield put(LobbyActions.unsubscribeOpenMatchUpdates())
      yield put(GameplayActions.subscribeToGameWithId(notification.body))
      yield put(NavigationActions.navigate({ routeName: 'Gameplay' }))
    }
  })

  const tokenRefreshChannel = yield call(onTokenRefresh, firebase.messaging())

  yield takeEvery(tokenRefreshChannel, function* (fcmToken) {
    yield put(MessagingActions.generateTokenSuccess(fcmToken))
  })

  const messageChannel = yield call(onMessageReceived, firebase.messaging())

  yield takeEvery(messageChannel, function* (message) {
    console.tron.log(message)
    yield put(LobbyActions.unsubscribeOpenMatchUpdates())
    yield put(GameplayActions.subscribeToGameWithId('ovs28CVpkYZtCUIE0i0S'))
    yield put(NavigationActions.navigate({ routeName: 'Gameplay' }))
  })

  yield take(LobbyTypes.UNSUBSCRIBE_OPEN_MATCH_UPDATES)
  messageChannel.close()
  tokenRefreshChannel.close()
  notificationChannel.close()
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
      console.tron.log('subscribeGameStart message', message)
      emitter(message)
    });

    return () => unsubscribe()
  })

const onNotificationReceived = notifications =>
  eventChannel(emitter => {
    const unsubscribe = notifications.onNotification(notification => {
      console.tron.log('subscribeGameStart notification', notification, notification.data)
      emitter(notification)
    });

    return () => unsubscribe()
  })