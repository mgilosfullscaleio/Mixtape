import { call, put } from 'redux-saga/effects'
import MessagingActions from '../Redux/MessagingRedux'
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
    });

export function * generateToken (action) {
  const response = yield call(getToken)

  yield put(
    response.matchWith({
      Ok: ({ value }) => MessagingActions.messagingSuccess(value),
      Error: ({ value }) => MessagingActions.messagingFailure(value)
    })
  )
}
