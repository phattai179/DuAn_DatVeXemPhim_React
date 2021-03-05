import React from 'react'
import './Footer.scss'

export default function Footer() {

    let mangPartner = [
        { src: "/img/partner1.png" },
        { src: "/img/partner2.png" },
        { src: "/img/partner3.png" },
        { src: "/img/partner4.png" },
        { src: "/img/partner5.png" },
        { src: "/img/partner6.png" },
        { src: "/img/partner7.png" },
        { src: "/img/partner8.jpg" },
        { src: "/img/partner9.jpg" },
        { src: "/img/partner10.png" },
        { src: "/img/partner11.png" },
        { src: "/img/partner12.png" },


    ]

    let renderMangRender = () => {
        return mangPartner.map((item, index) => {
            return <div className="col-3" key={index} >
                <img src={item.src}></img>
            </div>
        })
    }

    return (
        <div className="myFooter">
            <div className="container" >
                <div className="row" >
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="myFooter_company text-center text-md-left d-block d-md-flex" >
                            <img src="/img/Footer-logoCompany.jpg"></img>
                            <div className="myFooter_company_content">
                                <h4 className="myFooter_title">TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN CYBERSOFT</h4>
                                <p>Địa chỉ: 82 Ung Văn Khiêm, Quận Bình Thạnh,TP.Hồ Chí Minh</p>
                                <p>Số Điện Thoại (Hotline): 096.105.1014</p>
                                <p>Email: support@cyber.vn</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-flex" >
                        <div className="myFooter_partner" >
                            <h4>ĐỐI TÁC</h4>
                            <div className="row" >
                                {renderMangRender()}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="myFooter_contact text-center  text-md-left mt-3 mt-md-0">
                            <h4>LIỆN HỆ</h4>
                            <div className="d-flex d-md-block" style={{justifyContent: "space-around"}}>
                                <p>
                                    <i className="fab fa-facebook-square"></i>
                                    <span>Facebook</span>
                                </p>
                                <p>
                                    <i className="fab fa-github-square"></i>
                                    <span>GitHub</span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <hr style={{ borderTop: "1px solid #4a4a4a" }}></hr>
                <p className="text-center">© 2020. All Rights Reserved.</p>
            </div>
        </div>
    )
}
