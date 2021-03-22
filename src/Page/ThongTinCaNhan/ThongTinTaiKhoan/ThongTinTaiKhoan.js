import { Paper } from '@material-ui/core'
import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinCaNhanAction, layThongTinCaNhanAction } from '../../../Redux/action/QuanLyUserAction'
import { LAY_THONG_TIN_CA_NHAN, LAY_THONG_TIN_CAP_NHAT, CHANGE_THONG_TIN_CAP_NHAT, } from '../../../Redux/type/TypeQuanLyUser'
import { USER_DANG_NHAP } from '../../../utils/setting'
import './ThongTinTaiKhoan.scss'

function ThongTinTaiKhoan(props) {

    const dispatch = useDispatch()
    let thongTinCaNhan = props.thongTinCaNhan
    let thongTinCapNhat = useSelector(state => state.QuanLyUserReducer.userCapNhat)

    // Xử lý logic hiển thị ảnh
    let imgSrc = ""
    let taiKhoan = ""
    if(localStorage.getItem(USER_DANG_NHAP)){
        let userDangNhap = localStorage.getItem(USER_DANG_NHAP)
        taiKhoan = JSON.parse(userDangNhap).taiKhoan
    }
   
    let taiKhoanLuuAnh = localStorage.getItem(taiKhoan)

    if (taiKhoanLuuAnh) {
        imgSrc = JSON.parse(taiKhoanLuuAnh).img
    } else {
        imgSrc = "/img/avatar_example.png"
    }
    // console.log('taiKhoanAnh', imgSrc)

    let [avatar, setAvatar] = useState({
        img: imgSrc
    })

    // console.log('imgSetState', avatar.img)
    // console.log('thongTinCapNhat', thongTinCapNhat)

    // End xử lý logic hiển thị ảnh

    let [statusDisabled, setStatusDisabled] = useState(true)
    let disabled = statusDisabled ? true : false

    useEffect(() => {
        dispatch({
            type: LAY_THONG_TIN_CAP_NHAT,
            thongTinCaNhan
        })
    }, [thongTinCaNhan])


    // console.log('taiKhoan', userCapNhap.value.taiKhoan)

    const handleChangeInput = (e) => {
        let { value, name } = e.target

        let newValue = { ...thongTinCapNhat.value }
        newValue[name] = value

        let newError = { ...thongTinCapNhat.error }

        newError[name] = newValue[name] === "" ? "thông tin cập nhập không được bỏ trống" : ""

        if (name === "email" && value !== "") {
            const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (!regexEmail.test(value)) {
                newError[name] = "Email không đúng định dạng"
            }
        }

        if (name === "soDt" && value !== "") {
            const regexNumber = /^[0-9]+$/
            if (!regexNumber.test(value)) {
                newError[name] = "Số điện thoại phải là số"
            }
        }

        dispatch({
            type: CHANGE_THONG_TIN_CAP_NHAT,
            userCapNhat: {
                value: newValue,
                error: newError
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let valid = true

        for (let key in thongTinCapNhat.value) {
            if (thongTinCapNhat.value[key] === "") {
                valid = false
            }
        }

        for (let key in thongTinCapNhat.error) {
            if (thongTinCapNhat.error[key] !== "") {
                valid = false
            }
        }

        if (valid) {
            dispatch(capNhatThongTinCaNhanAction(thongTinCapNhat.value))
            setStatusDisabled(true)
        }

    }

    const handleChangeAvatar = (event) => {

        const file = event.target.files[0]

        const fileReader = new FileReader()

        fileReader.readAsDataURL(file)
        fileReader.onload = (evt) => {
            console.log('evt', evt)

            let object = {
                taiKhoan: thongTinCapNhat.value.taiKhoan,
                img: evt.target.result
            }

            localStorage.setItem(`${thongTinCapNhat.value.taiKhoan}`, JSON.stringify(object))

            setAvatar({
                img: evt.target.result
            })
        }

        console.log('file', file)
    }

    return (
        <div className="myAccount">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h4 className="text-center">Ảnh đại diện</h4>
                        <div className="avatarChange text-center">
                            <img src={avatar.img}></img>
                            <input id="uploadHinh" type="file" onChange={handleChangeAvatar} ></input>
                            <label htmlFor="uploadHinh">
                                <i className="fa fa-camera mr-2"></i>
                                Thay đổi ảnh đại diện
                            </label>
                        </div>
                        <button disabled={statusDisabled ? false : true} className="btn btnCapNhat" onClick={() => {
                            setStatusDisabled(false)
                        }}>Cập nhật thông tin</button>


                    </div>
                    <div className="col-9">
                        <h3 className="text-center">Thông Tin Tài Khoản</h3>
                        <form className="form_account" onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label>Tài khoản</label>
                                <div className="w-100">
                                    <input disabled={disabled} name="taiKhoan" className="form-control" value={thongTinCapNhat.value.taiKhoan} onChange={handleChangeInput} ></input>
                                    <p className="text-danger mb-0 mt-1">{thongTinCapNhat.error.taiKhoan}</p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <div className="w-100">
                                    <input disabled={disabled} name="matKhau" className="form-control" value={thongTinCapNhat.value.matKhau} onChange={handleChangeInput} ></input>
                                    <p className="text-danger mb-0 mt-1">{thongTinCapNhat.error.matKhau}</p>
                                </div>

                            </div>
                            <div className="form-group">
                                <label>Họ tên</label>
                                <div className="w-100">
                                    <input disabled={disabled} name="hoTen" className="form-control" value={thongTinCapNhat.value.hoTen} onChange={handleChangeInput} ></input>
                                    <p className="text-danger mt-1 mb-0">{thongTinCapNhat.error.hoTen}</p>
                                </div>

                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <div className="w-100">
                                    <input disabled={disabled} name="email" className="form-control" value={thongTinCapNhat.value.email} onChange={handleChangeInput} ></input>
                                    <p className="text-danger mt-1 mb-0">{thongTinCapNhat.error.email}</p>
                                </div>

                            </div>

                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <div className="w-100" >
                                    <input disabled={disabled} name="soDt" className="form-control" value={thongTinCapNhat.value.soDt} onChange={handleChangeInput} ></input>
                                    <p className="text-danger mt-1 mb-0">{thongTinCapNhat.error.soDt}</p>
                                </div>
                            </div>

                            <div className="text-center" style={{ display: statusDisabled ? "none" : "block" }} >
                                <button disabled={disabled} type="submit" className="btn btn-secondary" >Cập Nhật</button>
                            </div>

                        </form>

                    </div>
                </div>


            </div>


        </div>
    )
}

export default ThongTinTaiKhoan