import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { dangKyAction } from '../../Redux/action/QuanLyUserAction'
import './TrangDangKy.scss';

export default function TrangDangKy(props) {


    const dispatch = useDispatch()

    let [user, setUser] = useState({
        value: {
            taiKhoan: "",
            matKhau: "",
            nhapLaiMatKhau: "",
            hoTen: "",
            email: "",
            soDt: "",
            maNhom: "GP03",
            maLoaiNguoiDung: "KhachHang"
        },

        error: {
            taiKhoan: "",
            matKhau: "",
            nhapLaiMatKhau: "",
            hoTen: "",
            email: "",
            soDt: "",
        }
        
    })

    console.log('userDangKy', user)

    const handleChangeInput = (event) => {
        let {value, name} = event.target
        let typeInput = event.target.getAttribute('typeinput')
        

        // Sao chép lại mảng giá trị mới và mảng lỗi mới để cập nhật
        let newValue = {...user.value}
        newValue[name] = value

        let newError = {...user.error}

        // Lỗi không điền thông tin
        newError[name] = newValue[name] === "" ? "thông tin không được bỏ trống" : ""
        
        // Lỗi định dạng email
        if(typeInput === "email" && value !== ""){
            const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if(!regexEmail.test(value)){
                newError[name] = "Email không đúng định dạng"
            }

        }

        // Lỗi số điện thoại
        if(typeInput === "soDt" && value !== ""){
            const regexNumber = /^[0-9]+$/
            if(!regexNumber.test(value)){
                newError[name] = "Số điện thoại phải là số"
            }
        }

        // Lỗi nhập mật khẩu
        if(name === "nhapLaiMatKhau" && value !== ""){

            if(newValue.matKhau === ""){
                newError[name] = "Bạn chưa nhập mật khẩu"
            }else if (value !== newValue.matKhau){
                newError[name] = "Mật khẩu không trùng khớp"
            }
        }

        // Lỗi họ tên
        if(name === "taiKhoan" && value !== ""){
            if(value.length < 5 || value.length > 20){
                newError[name] = "Tài khoản phải từ 5 đến 20 ký tự"
            }
        }

        setUser({
            ...user,
            value : newValue,
            error: newError
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let userDangKy = user.value
        let valid = true

        for (let key in user.value){
            if(user.value[key].trim() === ""){
                valid = false
            }
        }

        for (let key in user.error){
            if(user.error[key].trim() !== ""){
                valid = false
            }
        }

        if(valid){
            dispatch(dangKyAction(userDangKy))
        }


    }

    return (
        <div className="dangKy">
            <div className="bgOverlay">
            </div>
            <div className="dangKy_content">
                <form onSubmit={handleSubmit} className="text-center">
                    <div>
                        <h2 className="my-3">ĐĂNG KÝ</h2>
                    </div>
                    <div className="group">
                        <input className="input_form" maxLength="20" value={user.value.taiKhoan} onBlur={handleChangeInput} onChange={handleChangeInput} name="taiKhoan" required/>
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="label_form">Tài khoản</label>
                        <p className="text-danger text_error">{user.error.taiKhoan}</p>
                    </div>

                    <div className="group">
                        <input className="input_form" value={user.value.matKhau} onChange={handleChangeInput} name="matKhau" onBlur={handleChangeInput} required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="label_form">Mật khẩu</label>
                        <p className="text-danger text_error">{user.error.matKhau}</p>
                    </div>

                    <div className="group">
                        <input className="input_form" value={user.value.nhapLaiMatKhau} onChange={handleChangeInput} name="nhapLaiMatKhau" onBlur={handleChangeInput} required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="label_form">Nhập lại mật khẩu</label>
                        <p className="text-danger text_error">{user.error.nhapLaiMatKhau}</p>
                    </div>

                    <div className="group">
                        <input className="input_form" value={user.value.hoTen} onChange={handleChangeInput} name="hoTen" onBlur={handleChangeInput} required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="label_form">Họ tên</label>
                        <p className="text-danger text_error">{user.error.hoTen}</p>
                    </div>

                    <div className="group">
                        <input className="input_form" value={user.value.email} typeinput="email" onChange={handleChangeInput} onBlur={handleChangeInput} name="email" required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="label_form">Email</label>
                        <p className="text-danger text_error">{user.error.email}</p>

                    </div>

                    <div className="group">
                        <input className="input_form" value={user.value.soDt} typeinput="soDt" onChange={handleChangeInput} onBlur={handleChangeInput} name="soDt" required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="label_form">Số điện thoại</label>
                        <p className="text-danger text_error">{user.error.soDt}</p>
                    </div>

                    <button type="submit" className="btn btn-success mb-3">
                        ĐĂNG KÝ 
                    </button>

                </form>

            </div>
            
        </div>
    )
}
