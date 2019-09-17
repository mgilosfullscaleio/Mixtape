import firebase from 'react-native-firebase'
import Result from 'folktale/result'

const firestore = firebase.firestore()

const getData = () => Promise.resolve(Result.Ok())

export default {
  getData
}
