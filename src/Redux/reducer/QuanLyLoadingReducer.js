import { DISPLAY_LOADING, HIDE_LOADING } from "../type/TypeLoading";

const stateDefault = {
    isLoading: true
}

export const QuanLyLoadingReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case DISPLAY_LOADING:{
            state.isLoading = true
            return {...state}
        }

        case HIDE_LOADING : {
            state.isLoading = false
            return {...state}
        }
            
            break;
    
        default:
            return {...state}
            break;
    }
    
}