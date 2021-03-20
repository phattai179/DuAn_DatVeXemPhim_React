import {combineReducers, createStore, applyMiddleware} from 'redux'
import {QuanLyPhimReducer} from './reducer/QuanLyPhimReducer'
import reduxThunk from 'redux-thunk'
import { QuanLyModalReducer } from './reducer/QuanLyModalReducer'
import { QuanLyDanhGiaReducer } from './reducer/QuanLyDanhGiaReducer'
import { QuanLyUserReducer } from './reducer/QuanLyUserReducer'
import { QuanLyMenuThucAnReducer } from './reducer/QuanLyMenuThucAnReducer'
import { QuanLyLoadingReducer } from './reducer/QuanLyLoadingReducer'

const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyModalReducer,
    QuanLyDanhGiaReducer,
    QuanLyUserReducer,
    QuanLyMenuThucAnReducer,
    QuanLyLoadingReducer,
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk))