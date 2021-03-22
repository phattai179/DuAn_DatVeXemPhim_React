import Axios from 'axios'
import { ACCESS_TOKEN, DOMAIN, STATUS_CODE, USER_DANG_NHAP } from '../../utils/setting'
import { alertThanhCongAction, alertThatBaiAction } from './QuanLyModalAlert'
import { history } from '../../App.js'
import { LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_CA_NHAN } from '../type/TypeQuanLyUser'
import { Typography } from '@material-ui/core'

export const dangKyAction = (userDangKy) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangKy`,
                method: "POST",
                data: userDangKy
            })

            console.log('result', result)

            if (result.status === STATUS_CODE.SUCCESS) {
                console.log('userDangKy', result.data)
                alertThanhCongAction("Đăng ký")
            }

        } catch (err) {
            console.log(err.response)
            console.log(err.response?.data)
            alertThatBaiAction("Đăng ký", err.response?.data)
        }
    }
}

export const dangNhapAction = (userDangNhap) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
                method: "POST",
                data: userDangNhap
            })

            console.log(result)
            if (result.status === STATUS_CODE.SUCCESS) {
                console.log('data', result.data)

                // Xử lý lưu trên localStorage
                localStorage.setItem(ACCESS_TOKEN, result.data.accessToken)
                localStorage.setItem(USER_DANG_NHAP, JSON.stringify(result.data))

                alertThanhCongAction("Đăng nhập")
                // history.push('/trangchu')
            }

        } catch (err) {
            console.log(err)
            console.log(err.response?.data)
            alertThatBaiAction("Đăng nhập", err.response?.data)
        }
    }
}

export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03`,
                method: "GET"
            })

            // console.log('result', result)
            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    dataDanhSachNguoiDung: result.data
                })
            }

        } catch (err) {
            console.log(err.response)
            console.log(err.response?.data)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {

    let accesstoKen = localStorage.getItem(ACCESS_TOKEN)

    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accesstoKen}`
                }
            })

            if (result.data === STATUS_CODE.SUCCESS) {
                alert("Xóa thành công")
                dispatch(layDanhSachNguoiDungAction())
            }

        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const layThongTinCaNhanAction = () => {

    let accessToken = localStorage.getItem(ACCESS_TOKEN)

    let userDangNhap = localStorage.getItem(USER_DANG_NHAP)

    userDangNhap = JSON.parse(userDangNhap)
    let taiKhoan = userDangNhap.taiKhoan

    // console.log('taiKhoan', taiKhoan)
    return async (dispatch) => {
        try {

            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
                method: "POST",
                data: {
                    'taiKhoan': taiKhoan
                },
                headers: {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            })

            // console.log('resule', result)
            if (result.status === STATUS_CODE.SUCCESS) {
                // console.log('data', result.data)
                dispatch({
                    type: LAY_THONG_TIN_CA_NHAN,
                    data: result.data
                })
            }

        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const capNhatThongTinCaNhanAction = (userCapNhat) => {
    return async (dispatch) => {
        console.log('dataaction', userCapNhat)
        let accessToken = localStorage.getItem(ACCESS_TOKEN)

        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
                method: "PUT",
                data: userCapNhat,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            if (result.status === STATUS_CODE.SUCCESS) {
                alertThanhCongAction("Cập nhật thông tin")
            }

        } catch (err) {
            console.log(err.response)
            console.log(err.response?.data)
        }

    }
}