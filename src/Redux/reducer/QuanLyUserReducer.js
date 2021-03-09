import { DANG_XUAT, LAY_USER_DANG_NHAP } from "../type/TypeQuanLyUser";

const stateDefault = {
    userDangNhap : {}
}

export const QuanLyUserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LAY_USER_DANG_NHAP:{
            // console.log('data', action.data)
            return {...state, userDangNhap: action.data}
        }
        
        case DANG_XUAT:{
            return {...state, userDangNhap: {}}
        }
    
        default:
            return {...state}
            break;
    }
}