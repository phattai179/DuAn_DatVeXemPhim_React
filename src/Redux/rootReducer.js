import {combineReducers, createStore, applyMiddleware} from 'redux'
import {QuanLyPhimReducer} from './reducer/QuanLyPhimReducer'
import reduxThunk from 'redux-thunk'
import { QuanLyModalReducer } from './reducer/QuanLyModalReducer'

const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyModalReducer,
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk))