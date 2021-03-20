import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './HeaderDatVe.scss'
import '../../../Components/Header/Header.scss'
import { ACCESS_TOKEN, USER_DANG_NHAP } from '../../../utils/setting'
import { DANG_XUAT } from '../../../Redux/type/TypeQuanLyUser'
import { alertDangXuat } from '../../../Redux/action/QuanLyModalAlert'

export default function HeaderDatVe() {

    const dispatch = useDispatch()

    const userDangNhap = useSelector(state => state.QuanLyUserReducer.userDangNhap)

    // Xử lý logic hiện thẻ li khi active
    let activeDanhSachGhe = useSelector(state => state.QuanLyPhimReducer.activeDanhSachGheMobile)

    let activeChiTietThanhToan = useSelector(state => state.QuanLyPhimReducer.activeChiTietThanhToanMobile)

    let statusChonGhe = activeDanhSachGhe ? "flex" : "none"
    let statusThanhToan = activeChiTietThanhToan ? "flex" : "none"
    let activeChonGhe = activeDanhSachGhe ? "active" : ""
    let activeThanhToan = activeChiTietThanhToan ? "active" : ""

    // Xử lý logic hiện thị logo
    let activeMenu = useSelector(state => state.QuanLyMenuThucAnReducer.activeMenu)

    // Xử lý logic hiển thị ảnh avatar trên header
    // Xử lý logic hiển thị ảnh
    let taiKhoanLuuAnh = ""
    if (localStorage.getItem(USER_DANG_NHAP)) {
        let userDangNhap = localStorage.getItem(USER_DANG_NHAP)
        let taiKhoan = JSON.parse(userDangNhap).taiKhoan
        taiKhoanLuuAnh = localStorage.getItem(taiKhoan)
    }

    let imgSrc = ""

    if (taiKhoanLuuAnh) {
        imgSrc = JSON.parse(taiKhoanLuuAnh).img
    } else {
        imgSrc = "/img/avatar_example.png"
    }
    console.log('taiKhoanAnh', imgSrc)

    let [avatar, setAvatar] = useState({
        img: imgSrc
    })


    return (
        <div className="headerDatVe">
            <Fragment>
                {activeDanhSachGhe ?
                    <NavLink to="/trangchu">
                        <img className="ml-3" src='/img/partner4.png' style={{ width: "40px", height: "40px" }}></img>
                    </NavLink>

                    :
                    <img
                        className="ml-3"
                        src='/img/logo_back.png'
                        style={{ width: "40px", height: "40px", cursor: "pointer" }}
                        onClick={() => {
                            if (activeMenu) {
                                dispatch({
                                    type: "XET_ACTIVE_MENU",
                                    statusActive: false
                                })
                            } else {
                                dispatch({
                                    type: "ACTIVE_TRANG_DAT_VE_MOBILE",
                                    statusDanhSachGheMobile: true,
                                    statusChiTietThanhToanMobile: false
                                })
                            }
                        }}></img>
                }
            </Fragment>

            <ul className="booking_step">
                <li className="active">
                    <span>01</span>
                    <a>{`CHỌN GHẾ & THANH TOÁN`}</a>
                </li>
                <li>
                    <span>02</span>
                    <a>{`KẾT QUẢ ĐẶT VÉ`}</a>
                </li>
            </ul>

            {/* Màn hỉnh booking_step mobile */}
            <ul className="booking_step" id="booking_stepMobile">
                <li className={`${activeChonGhe}`} style={{ display: `${statusChonGhe}` }}>
                    <span>01</span>
                    <a>{`CHỌN GHẾ`}</a>
                </li>
                <li className={`${activeThanhToan}`} style={{ display: `${statusThanhToan}` }}>
                    <span>02</span>
                    <a>{`THANH TOÁN`}</a>
                </li>
            </ul>

            {/* End màn hình booking_step mobile */}
            <div className="booking_user myHeader_content">
                {/* <img src='/img/avatar_example.png' style={{ width: "30px", height: "30px" }} ></img>
                <p>{userDangNhap.hoTen}</p> */}
                <div className="myHeader_dangNhap">
                    <img src={avatar.img}></img>
                    <a className="nav-link text-dark px-1" href="#">{userDangNhap.hoTen}
                    </a>
                </div>
                <div className="myHeader_dangNhapDetail">
                    <NavLink to="/thongtin" className="thongTin" >Thông tin người dùng</NavLink>
                    <p className="thongTin mx-0" onClick={() => {
                        dispatch(alertDangXuat())
                        // localStorage.removeItem(ACCESS_TOKEN)
                        // localStorage.removeItem(USER_DANG_NHAP)
                        // dispatch({
                        //     type: DANG_XUAT
                        // })
                    }}>Đăng xuất</p>
                </div>

            </div>
        </div>
    )
}
