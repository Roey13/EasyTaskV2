import { combineReducers } from 'redux'
import { boardReducer } from './boardReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer
})
