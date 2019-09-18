import firebase from 'react-native-firebase'
import Result from 'folktale/result'

const firestore = firebase.firestore()
// const auth = firebase.auth()

const getData = () => Promise.resolve(Result.Ok())

firebase.auth().signInAnonymously()
	.then(()=> {
    console.tron.log('signInAnonymously success')
		firebase.firestore().collection('cards').doc('0JC9ULagFVdlw0jlH9Go').get().then(doc => doc.data()).then(data => console.tron.log('fs', data))
	}).catch((err)=>{
		console.tron.log('fs err', err)
  })
  


export default {
  getData
}
