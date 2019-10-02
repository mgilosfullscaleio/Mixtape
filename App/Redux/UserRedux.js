import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userSuccess: ['data'],
  userFailure: ['error'],
  createUserSuccess: ['user'],
  createUserFailure: ['error'],
  loadingRequest: null,
  
  //saga triggers
  userRequest: ['spotifyAcc'],
  createUser: ['spotifyAcc']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

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
export const INITIAL_STATE = Immutable({
  data: require('../Fixtures/user.json'),
  loading: false,
  error: null
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getName: state => state.user.data.name,
  selectUserMatchData: state => createMatchData(state.user.data),
  selectUserId: state => state.user.data.id
}

const createMatchData = userData => ({
  id: userData.id,
  name: userData.name,
  profileImage: userData.profileImage,
  tapes: userData.tapes
})

/* ------------- Reducers ------------- */

export const loadingRequest = (state) =>
  state.merge({ loading: true })

export const success = (state, { data }) =>
  state.merge({ loading: false, error: null, data })

export const failure = (state, { error }) =>
  state.merge({ loading: false, error })

export const createUserSuccess = (state, { data }) =>
  state.merge({ loading: false, error: null, data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.LOADING_REQUEST]: loadingRequest,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: failure,
})
