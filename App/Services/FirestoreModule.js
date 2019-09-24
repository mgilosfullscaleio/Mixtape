import firebase from 'react-native-firebase'
import Result from 'folktale/result'

const firestore = firebase.firestore()
const auth = firebase.auth()
const Timestamp = firebase.firestore.Timestamp
const USER = 'usersV2'

const signIn = async () => await auth.signInAnonymously()
signIn()


const createUser = info => {
	const ref = firestore.collection(USER).doc()
	const userData = {
		id: ref.id,
		created: Timestamp.now(),
		...info,
	}

	console.tron.log('createUser', userData)

	return ref.set(userData)
		.then(() => Result.Ok(userData))
		.catch(e => Result.Error(e))
}

createUser({
	name: `john${Date.now()}`
})

/*
const findUser = id => {
  return firebase
    .firestore()
    .collection('users')
    .where('social.spotify.id', '==', id)
		.get()
		.then(snapshot => snapshot.docs)
		.then(docs => docs.map(doc => doc.data()))
    .catch(error => Result.Error('Cant find user with id'))
}

const updateUser = user =>
  firestore
    .collection('users')
    .doc(user.id)
    .update(user)
    .then(() => Result.Ok(user))
    .catch(error => Result.Error(`Error updating bet\n${error}`))

const deleteUser = user =>
  firestore
    .collection('users')
    .doc(user.id)
    .delete()
    .then(() => Result.Ok(user))
		.catch(error => Result.Error(`Error deleting bet\n${error}`))

const getUsers = () => 
  firestore
    .collection('users')
    .get()
    .then(snapshot => snapshot.docs)
    .then(docs => docs.map(doc => doc.data()))
    .then(docs => Result.Ok(docs))
*/

export default {
	createUser
}
