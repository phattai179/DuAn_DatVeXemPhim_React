import {combineReducers, createStore, applyMiddleware} from 'redux'
import {QuanLyPhimReducer} from './reducer/QuanLyPhimReducer'
import reduxThunk from 'redux-thunk'
import { QuanLyModalReducer } from './reducer/QuanLyModalReducer'
import { QuanLyDanhGiaReducer } from './reducer/QuanLyDanhGiaReducer'
import { QuanLyUserReducer } from './reducer/QuanLyUserReducer'

const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyModalReducer,
    QuanLyDanhGiaReducer,
    QuanLyUserReducer
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk))