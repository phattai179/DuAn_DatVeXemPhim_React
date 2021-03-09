import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DANG_XUAT, LAY_USER_DANG_NHAP } from '../../Redux/type/TypeQuanLyUser'
import { USER_DANG_NHAP } from '../../utils/setting'
import './Header.scss'

export default function Header() {

    // Lấy userDangNhap trên store để hiện thị khi có đăng nhập

    let userDangNhap = useSelector(state => state.QuanLyUserReducer.userDangNhap)

    console.log('userDangNhap', userDangNhap.hoTen)

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


    useEffect(() => {
        checkLocalStorage()
    }, [])

    // const [icon, setIcon] = useState({
    //     isOpen: true
    // })


    // const changeToggle = () => {

    //     setIcon({
    //         isOpen : !icon.isOpen

    //     })
    // }

    return (
        <div className="myHeader">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                {/* Nút thu nhỏ khi reponsive */}
                <button onClick={changeToggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    {/* {icon.isOpen ? <i class="fa fa-bars"></i> : <i class="fa fa-times"></i> } */}
                    {isOpen.isActive ? <i className="fa fa-bars"></i> : <i className="fa fa-times"></i>}

                </button>
                <div className="navbar-collapse collapse myHeader_movie " id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item header_signin_collapse">
                            <a className="nav-link" href="#">Đăng Nhập</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Lịch Chiếu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cụm Rạp</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tin Tức</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ứng Dụng</a>
                        </li>
                    </ul>
                </div>
                <div className="myHeader_user">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {userDangNhap?.hoTen ?
                            <div className="myHeader_content">
                                <div className="myHeader_dangNhap">
                                    <img src="./img/avatar_example.png"></img>
                                    <a className="nav-link" href="#">{userDangNhap.hoTen}
                                    </a>
                                </div>
                                <div className="myHeader_dangNhapDetail">
                                    <p>Thông tin người dùng</p>
                                    <p onClick={() => {
                                        localStorage.clear()
                                        dispatch({
                                            type: DANG_XUAT
                                        })
                                    }}>Đăng xuất</p>
                                </div>

                            </div>
                                
                                :
                                <NavLink to="/dangnhap" className="nav-link" href="#">Đăng Nhập</NavLink>
                            }

                        </li>
                        <li className="nav-item">
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
