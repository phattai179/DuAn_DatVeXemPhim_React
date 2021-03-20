import { CHANGE_THONG_TIN_CAP_NHAT, DANG_XUAT, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_CAP_NHAT, LAY_THONG_TIN_CA_NHAN, LAY_USER_DANG_NHAP } from "../type/TypeQuanLyUser";

const stateDefault = {
    userDangNhap: {},

    thongTinCaNhan: {},

    danhSachNguoiDung: [],

    // Xử lý logic cập nhập lại thông tin cá nhân

    userCapNhat: {
        value: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            email: "",
            soDt: "",
            // hinhAnh: thongTinCaNhan?.hinhAnh ? thongTinCaNhan.hinhAnh : "avatar_example.png",
            maLoaiNguoiDung: "KhachHang",
            maNhom: ""
        },
        error: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            email: "",
            soDienThoai: "",
        }

    }
}

export const QuanLyUserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LAY_USER_DANG_NHAP: {
            // console.log('data', action.data)
            return { ...state, userDangNhap: action.data }
        }

        case DANG_XUAT: {
            return { ...state, userDangNhap: {} }
        }

        case LAY_DANH_SACH_NGUOI_DUNG: {

            state.danhSachNguoiDung = action.dataDanhSachNguoiDung

            return { ...state }
        }

        case LAY_THONG_TIN_CA_NHAN: {
            state.thongTinCaNhan = action.data
            return { ...state }
        }

        case LAY_THONG_TIN_CAP_NHAT: {

            console.log('try', action.thongTinCaNhan)
            let newValueUser = {
                taiKhoan: action.thongTinCaNhan.taiKhoan,
                matKhau: action.thongTinCaNhan.matKhau,
                hoTen: action.thongTinCaNhan.hoTen,
                soDt: action.thongTinCaNhan.soDT,
                email: action.thongTinCaNhan.email,
                maLoaiNguoiDung: "KhachHang",
                maNhom: action.thongTinCaNhan.maNhom
            }

            let newUserCapNhat = {...state.userCapNhat, value: newValueUser}

            state.userCapNhat = newUserCapNhat

            return{...state}
        }

        case CHANGE_THONG_TIN_CAP_NHAT: {

            // state.userCapNhat = action.userCapNhat
            return {...state, userCapNhat: action.userCapNhat}
        }

        default:
            return { ...state }
            break;
    }
}