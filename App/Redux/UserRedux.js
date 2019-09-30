import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userSuccess: ['data'],
  userFailure: ['error'],
  loadingRequest: null,
  
  //saga triggers
  userRequest: ['spotifyId'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: require('../Fixtures/user.json'),
  loading: false,
  error: null
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getName: state => state.user.data.name,
  selectUserMatchData: state => createMatchData(state.user.data)
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.LOADING_REQUEST]: loadingRequest,
})
