import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { dangNhapAction } from '../../Redux/action/QuanLyUserAction'
import './TrangDangNhap.scss'


export default function TrangDangNhap(props) {

    const [user, setUser] = useState({

        value: {
            taiKhoan: "",
            matKhau: "",
        },
        error: {
            taiKhoan: "",
            matKhau: ""
        }
    })

    const dispatch = useDispatch()

    console.log('userDangNhap', user.value)

    const handleChangeInput = (event) => {
        let {value, name} = event.target

        let newValue = {...user.value}
        newValue[name] = value

        let newError = {...user.error}
        
        newError[name] = newValue[name] === "" ? "Thông tin không được bỏ trống" : ""
        
        console.log('error', newError[name])

        setUser({
            value: newValue,
            error: newError
        })
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let valid = true 
        let userDangNhap = user.value

        for(let key in user.value){
            if(user.value[key].trim() === ""){
                valid = false
            }
        }
        
        for (let key in user.error){
            if(user.error[key] !== ""){
                valid = false
            }
        }

        if(valid){
            dispatch(dangNhapAction(userDangNhap))
            // alert('Đăng nhập thành công')
            // props.history.push('/trangchu')
        }

    }


    return (
        <div className="dangNhap">
            <div className="bgOverlay">

            </div>
            <div className="dangNhap_content">
                <form onSubmit={handleSubmit}>
                    <h2 className="my-3">ĐĂNG NHẬP</h2>

                    <div>
                        <div className="group">
                            <input className="input_form" value={user.value.taiKhoan} onChange={handleChangeInput} onBlur={handleChangeInput} name="taiKhoan" required />
                            <span className="highlight" />
                            <span className="bar" />
                            <label className="label_form">Tài khoản</label>
                            <p className="text_error">{user.error.taiKhoan}</p>
                        </div>

                        <div className="group">
                            <input className="input_form" value={user.value.matKhau}  onChange={handleChangeInput} onBlur={handleChangeInput} name="matKhau" required />
                            <span className="highlight" />
                            <span className="bar" />
                            <label className="label_form">Mật khẩu</label>
                            <p className="text_error">{user.error.matKhau}</p>
                        </div>

                        <button type="submit" className="btn mb-3">
                            ĐĂNG NHẬP
                        </button>

                        <p className="dangNhap_other">
                            Bạn chưa có tài khoản ? <span>Đăng ký ngay</span>
                            
                        </p>

                    </div>


                </form>

            </div>
        </div>
    )
}
