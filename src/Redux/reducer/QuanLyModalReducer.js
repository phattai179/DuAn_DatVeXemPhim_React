import { CLOSE_MODAL_VIDEO, OPEN_MODAL_VIDEO } from "../type/TypePopupModal";

const stateDefault = {
    isOpenModal: false,
    trailer: ""
}

export const QuanLyModalReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case OPEN_MODAL_VIDEO:
            state.isOpenModal = true;
            state.trailer = action.trailerFilm
            return {...state}
            break;
        case CLOSE_MODAL_VIDEO : {
            state.isOpenModal = false;
            state.trailer = ""
            return{...state}
        }
        default:
            return {...state}
    }
}