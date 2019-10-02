import firebase from 'react-native-firebase'
import Result from 'folktale/result'
import { head, isNil } from 'ramda'
const firestore = firebase.firestore()
const auth = firebase.auth()
const Timestamp = firebase.firestore.Timestamp
const FieldValue = firebase.firestore.FieldValue
const USER = 'usersV2'

const signIn = async () => await auth.signInAnonymously()

// Move this to an action, in startup
signIn()

const addPlayerToOpenMatch = playerId =>
  firestore
    .collection('openmatch')
    .doc('lobby')
    .set({ players: FieldValue.arrayUnion(playerId) }, { merge: true })
    .then(() => Promise.resolve(Result.Ok()))

const playerJoinObserver = emitter =>
  firestore
    .collection(`openmatch`)
    .doc('lobby')
    .onSnapshot(docSnapshot  => {
      emitter(docSnapshot.data().players)
    })

const removePlayerFromOpenMatch = user => {//Promise.resolve(Result.Ok(true))
  console.tron.log('removePlayerFromOpenMatch', user)
  firestore
    .collection(`openmatch`)
    .doc('lobby')
    .set({ 
      players: FieldValue.arrayRemove(user)
    }, { merge: true })
    .then(() => Promise.resolve(Result.Ok(true)))
    .catch(e => Promise.resolve(Result.Error(e)))
}

const getGameplayInfo = gameId =>
  firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc('info')
    .get()
    .then(docs => 
      ({
        ...docs.data(),
        created: docs.data().created.toDate().toISOString() //convert it to a normal date object
      })
    )
    .catch(error => Result.Error(`Error with gameId ${gameId}\n${error}`))

const gameplayObserver = async (emitter, gameId, userId, currentRound) => {
  const roundRef = firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc(`round${currentRound}`)

  //update round by adding ourself to the players
  await roundRef.set({
    players: {
      [`${userId}`]: {}
    }
  }, {merge: true})

  return roundRef
    .onSnapshot(snapshot  => {
      emitter(snapshot.data())
    })
}

const updateSongSelection = (gameId, currentRound, userId, song) =>
  firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc(`round${currentRound}`)
    .set({
      players: {
        [`${userId}`]: song
      }
    }, {merge: true})
    .then(() => Result.Ok(song))
    .catch(e => Result.Error(e))

// createUser({
// 	name: `john${Date.now()}`
// })

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

const findUserWithSpotifyId = spotifyId =>
  firestore
    .collection(USER)
    .where('social.spotify.id', '==', spotifyId)
		.get()
    .then(snapshot => snapshot.docs)
    .then(head)
    .then(doc =>
      isNil(doc)
        ? Result.Error('No user registered with Spotify Id') 
          : Result.Ok(doc.data())
    )
    .catch(error => Result.Error(error))

/*
USER
{
  id
  name
  email
  coins
  points
  musicSrc
  avatar
  address: {
    geopoint
    location
  }
  social: {
    facebook: {
      friends: [] //facebookId
      profilePhoto
      facebookId
    }
    spotify: {
      id
      profilePhoto
    }
  }
  created
}
*/
const createUserFromSpotifyAccount = info => {
  const ref = firestore.collection(USER).doc()
  const userData = {
    id: ref.id,
    name: info.display_name,
    coins: 10,
    points: 10,
    avatar: null,
    social: {
      spotify: {
        id: info.id
      }
    },
    created: Timestamp.now()
  }

  console.tron.log('createUser', userData)

  return ref.set(userData)
    .then(() => Result.Ok(userData))
    .catch(e => Result.Error(e))
}

  // Promise.resolve(Result.Ok(require('../Fixtures/user.json')))

export default {
  signIn,
  createUserFromSpotifyAccount,
  findUserWithSpotifyId,

  addPlayerToOpenMatch,
  playerJoinObserver,
  removePlayerFromOpenMatch,

  getGameplayInfo,
  gameplayObserver,
  updateSongSelection
}
