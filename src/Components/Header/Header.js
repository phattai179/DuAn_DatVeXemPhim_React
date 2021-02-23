import React, {useState} from 'react'
import './Header.scss'

export default function Header() {

    let [isOpen, setOpen] = useState({
        isActive : true
    })


    const changeToggle = () => {
        setOpen({
            isActive: !isOpen.isActive
        })
    }

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
                    {isOpen.isActive ? <i className="fa fa-bars"></i> : <i className="fa fa-times"></i> }
                    
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
                            <a className="nav-link" href="#">Đăng Nhập</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Đăng Ký</a>
                        </li>
                    </ul>
                </div>

            </nav>

        </div>
    )
}
