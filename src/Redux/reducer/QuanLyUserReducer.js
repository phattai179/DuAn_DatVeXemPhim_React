import { DANG_XUAT, LAY_DANH_SACH_NGUOI_DUNG, LAY_USER_DANG_NHAP } from "../type/TypeQuanLyUser";

const stateDefault = {
    userDangNhap : {},

    danhSachNguoiDung: []
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

        case LAY_DANH_SACH_NGUOI_DUNG : {
            
            state.danhSachNguoiDung = action.dataDanhSachNguoiDung
            
            return {...state}
        }
    
        default:
            return {...state}
            break;
    }
}