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

// TODO not currently working
const removePlayerFromOpenMatch = user => {//Promise.resolve(Result.Ok(true))
  console.tron.log('removePlayerFromOpenMatch', user)
  return firestore
    .collection(`openmatch`)
    .doc('lobby')
    .set({ 
      players: FieldValue.arrayRemove(user)
    }, { merge: true })
    .then(() => Promise.resolve(Result.Ok(true)))
    .catch(e => Promise.resolve(Result.Error(e)))
}

// TODO this is not returning a Result
const getGameplayInfo = gameId =>
  firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc('info')
    .get()
    .then(docs => 
      Result.Ok({
        ...docs.data(),
        created: docs.data().created.toDate().toISOString() //convert it to a normal date object
      })
    )
    .catch(error => Result.Error(`Error with gameId ${gameId}\n${error}`))

const gameplayObserver = async (emitter, gameId, userId, currentRound) =>
  firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc(`round${currentRound}`)
    .onSnapshot(snapshot  => {
      emitter(snapshot.data())
    }, err => {
      console.tron.log(`Encountered error: ${err}`);
    })

const updateSongSelection = (gameId, currentRound, userId, song) =>
  firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc(`round${currentRound}`)
    .set({
      players: {
        [`${userId}`]: { song }
      }
    }, {merge: true})
    .then(() => Result.Ok(song))
    .catch(e => Result.Error(e))

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

const createUserFromSpotifyAccount = info => {
  const ref = firestore.collection(USER).doc()
  const userData = {
    id: ref.id,
    name: info.display_name,
    coins: 10,
    points: 10,
    avatar: info.images && info.images[0] && info.images[0].url,
    social: {
      spotify: {
        id: info.id
      }
    },
    created: Timestamp.now()
  }

  return ref.set(userData)
    .then(() => Result.Ok(userData))
    .catch(e => Result.Error(e))
}


/**
 * Performs user fetch from Firestore having the fbIds being passed in the paramter.
 * Calls a callable function exposed from Cloud Functions. Expects fbIds key.
 * @param {*} fbIds - An array of fbIds.
 * @returns Promise
 */
export const getUsersWithFbIdsCF = async (fbIds) => {
  console.log("getUsersWithFbIdsCF b4:");
  try {
    const collection = __DEV__ ? "getUserInfoWithFBIdDev" : "getUserInfoWithFBId";
    const callable = firebase.functions().httpsCallable(collection);
    const response = await callable({ fbIds, v2:'' });
    const { data } = response;
    //return Promise.resolve({ data });
    console.log("getUsersWithFbIdsCF:", data);
    return data;
  }
  catch(e) {
    //return Promise.reject(e);
    console.log("getUsersWithFbIdsCF errror:",e);
    return e;
  }
}

/**
 * Performs Firebase authentication using Facebook token.
 * @param {*} token - Facebook token.
 * @returns Promise
 */
export const signInWithFacebookCredential = async (token) => {
  try {
    console.log("signInWithFacebookCredential:", token);
    // Build Firebase credential with the Facebook access token.
    const fbCredential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    const result = await firebase.auth().signInWithCredential(fbCredential);
    return result;
  }
  catch (e) {
    // Handle Errors here. 
    return null;
  }
}
const userObserver = (emitter, userId) =>
  firestore
    .collection(USER)
    .doc(userId)
    .onSnapshot(docSnapshot => {
      if (docSnapshot.exists) {
        const gameId = docSnapshot.data().gameId
        if (gameId) {
          emitter(gameId)

          //remove gameId after
          removeGameIdFromUser(userId)
        }  

      }
    })

const removeGameIdFromUser = userId =>
  firestore
    .collection(USER)
    .doc(userId)
    .set({
      gameId: FieldValue.delete()
    }, { merge:true })

const voteRoundWinner = (gameId, currentRound, playerId) =>
  firestore
    .collection(`card_games/${gameId}/gameplay`)
    .doc(`round${currentRound}`)
    .set({
      voteCount: {
        [`${playerId}`]: FieldValue.increment(1)
      } 
    }, { merge: true })
    .then(() => Promise.resolve(Result.Ok()))

export default {
  signIn,
  createUserFromSpotifyAccount,
  findUserWithSpotifyId,

  addPlayerToOpenMatch,
  playerJoinObserver,
  removePlayerFromOpenMatch,

  getGameplayInfo,
  gameplayObserver,
  updateSongSelection,
  voteRoundWinner,

  userObserver,
  getUsersWithFbIdsCF,
}
