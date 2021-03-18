import Axios from 'axios'
import { ACCESS_TOKEN, DOMAIN, STATUS_CODE, USER_DANG_NHAP } from '../../utils/setting'
import { alertThanhCongAction, alertThatBaiAction } from './QuanLyModalAlert'
import {history} from '../../App.js'
import { LAY_DANH_SACH_NGUOI_DUNG } from '../type/TypeQuanLyUser'

export const dangKyAction = (userDangKy) => {
    return async (dispatch) => {
        try{
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangKy`,
                method: "POST",
                data: userDangKy
            })

            console.log('result', result)

            if(result.status === STATUS_CODE.SUCCESS){
                console.log('userDangKy', result.data)
                alertThanhCongAction("Đăng ký")
            }

        }catch(err){
            console.log(err.response)
            console.log(err.response?.data)
            alertThatBaiAction("Đăng ký", err.response?.data)
        }
    }
}

export const dangNhapAction = (userDangNhap) => {
    return async (dispatch) => {
        try{
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
                method: "POST",
                data: userDangNhap
            })

            console.log(result)
            if(result.status === STATUS_CODE.SUCCESS){
                console.log('data', result.data)

                // Xử lý lưu trên localStorage
                localStorage.setItem(ACCESS_TOKEN, result.data.accessToken)
                localStorage.setItem(USER_DANG_NHAP, JSON.stringify(result.data))

                alertThanhCongAction("Đăng nhập")
                // history.push('/trangchu')
            }

        }catch(err){
            console.log(err)
            console.log(err.response?.data)
            alertThatBaiAction("Đăng nhập", err.response?.data)
        }
    }
}

export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try{
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03`,
                method: "GET"
            })

            // console.log('result', result)
            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    dataDanhSachNguoiDung: result.data
                })
            }

        }catch(err){
            console.log(err.response)
            console.log(err.response?.data)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {

    let accesstoKen = localStorage.getItem(ACCESS_TOKEN)

    return async (dispatch) => {
        try{
            let result = await Axios({
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${accesstoKen}`
                }
            })

            if(result.data === STATUS_CODE.SUCCESS){
                alert("Xóa thành công")
                dispatch(layDanhSachNguoiDungAction())
            }
            
        }catch(err){
            console.log(err.response?.data)
        }
    }
}