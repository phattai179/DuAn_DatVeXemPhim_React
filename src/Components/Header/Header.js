import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { alertDangXuat } from '../../Redux/action/QuanLyModalAlert'
import { DANG_XUAT, LAY_USER_DANG_NHAP } from '../../Redux/type/TypeQuanLyUser'
import { ACCESS_TOKEN, USER_DANG_NHAP } from '../../utils/setting'
import './Header.scss'

export default function Header() {

    // Lấy userDangNhap trên store để hiện thị khi có đăng nhập

    let userDangNhap = useSelector(state => state.QuanLyUserReducer.userDangNhap)

    // console.log('userDangNhap', userDangNhap.hoTen)

    const dispatch = useDispatch()

    let [isOpen, setOpen] = useState({
        isActive: true
    })


    const changeToggle = () => {
        setOpen({
            isActive: !isOpen.isActive
        })
    }

    // Xử lý ẩn hiện tên đăng nhập

    const checkLocalStorage = () => {
        let userDangNhap = localStorage.getItem(USER_DANG_NHAP)

        if (userDangNhap) {

            dispatch({
                type: LAY_USER_DANG_NHAP,
                data: JSON.parse(userDangNhap)
            })
        }

    }

    // Xử lý logic hiển thị ảnh
    let taiKhoanLuuAnh = "" 
    if(localStorage.getItem(USER_DANG_NHAP)){
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
    // console.log('taiKhoanAnh', imgSrc)

    let [avatar, setAvatar] = useState({
        img: imgSrc
    })


    useEffect(() => {
        checkLocalStorage()
    }, [])


    return (
        <div className="myHeader">
            <nav className="navbar navbar-expand-md py-0">
                <a className="navbar-brand" href="/trangchu">
                    <img src="/img/web-logo.png" style={{width: "50px", height: "50px"}} ></img>
                </a>    
                {/* Nút thu nhỏ khi reponsive */}
                <button onClick={changeToggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    {/* {icon.isOpen ? <i class="fa fa-bars"></i> : <i class="fa fa-times"></i> } */}
                    {isOpen.isActive ? <i className="fa fa-bars"></i> : <i className="fa fa-times"></i>}

                </button>
                <div className="navbar-collapse collapse myHeader_movie " id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item nav-itemUser d-md-none d-flex" style={{ justifyContent: "center" }}>
                            {userDangNhap?.hoTen ?
                                <div className="myHeader_content text-center mr-0">
                                    <div className="myHeader_dangNhap">
                                        <img src={avatar.img}></img>
                                        <a className="nav-link ml-2" href="#">{userDangNhap.taiKhoan}
                                        </a>
                                    </div>
                                    <div className="myHeader_dangNhapDetail">
                                        <NavLink to="/thongtin" className="thongTin" >Thông tin người dùng</NavLink>
                                        <p className="thongTin" onClick={() => {
                                            // localStorage.removeItem(ACCESS_TOKEN)
                                            // localStorage.removeItem(USER_DANG_NHAP)
                                            // dispatch({
                                            //     type: DANG_XUAT
                                            // })
                                            dispatch(alertDangXuat())
                                        }}>Đăng xuất</p>
                                    </div>

                                </div>

                                :
                                <NavLink to="/dangnhap" className="nav-link" href="#">Đăng Nhập</NavLink>
                            }

                        </li>
                        <li className="nav-item nav-itemUser">
                            {userDangNhap?.hoTen ? "" :
                                <NavLink to="/dangky" className="nav-link" href="#">Đăng Ký</NavLink>
                            }

                        </li>

                        {/* End userheader */}
                        <li className="nav-item">
                            <a className="nav-link" href="#lichChieu">Lịch Chiếu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#cumRap">Cụm Rạp</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tin Tức</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#ungDung">Ứng Dụng</a>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/phim" className="nav-link">Admin</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="myHeader_user d-md-flex d-none ">
                    <ul className="navbar-nav">
                        <li className="nav-item nav-itemUser">
                            {userDangNhap?.hoTen ?
                                <div className="myHeader_content">
                                    <div className="myHeader_dangNhap">
                                        <img src={avatar.img}></img>
                                        <a className="nav-link" href="#">{userDangNhap.hoTen}
                                        </a>
                                    </div>
                                    <div className="myHeader_dangNhapDetail">
                                        <NavLink className="thongTin" to="/thongtin">Thông tin người dùng</NavLink>
                                        <p className="thongTin" onClick={() => {
                                            // localStorage.removeItem(ACCESS_TOKEN)
                                            // localStorage.removeItem(USER_DANG_NHAP)
                                            // dispatch({
                                            //     type: DANG_XUAT
                                            // })
                                            dispatch(alertDangXuat())
                                        }}>Đăng xuất</p>
                                    </div>

                                </div>

                                :
                                <NavLink to="/dangnhap" className="nav-link" href="#">Đăng Nhập</NavLink>
                            }

                        </li>
                        <li className="nav-item nav-itemUser">
                            {userDangNhap?.hoTen ? "" :
                                <NavLink to="/dangky" className="nav-link" href="#">Đăng Ký</NavLink>
                            }

                        </li>
                    </ul>
                </div>

            </nav>

        </div>
    )
}
