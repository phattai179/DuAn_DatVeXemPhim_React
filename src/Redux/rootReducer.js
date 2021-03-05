import {combineReducers, createStore, applyMiddleware} from 'redux'
import {QuanLyPhimReducer} from './reducer/QuanLyPhimReducer'
import reduxThunk from 'redux-thunk'
import { QuanLyModalReducer } from './reducer/QuanLyModalReducer'
import { QuanLyDanhGiaReducer } from './reducer/QuanLyDanhGiaReducer'

const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyModalReducer,
    QuanLyDanhGiaReducer
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk))