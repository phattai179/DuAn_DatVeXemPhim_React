import React from 'react'
import './UngDung.scss'

// Install react-slick
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export default function UngDung() {

    // Setting react-slick
    const settings = {
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,

    };

    return (
        <div className="myApplication" id="ungDung" >
            <div className="container mx-auto" >
                <div className="row myApplication_content">
                    <div className="col-12 col-lg-7 myApplication_right">
                        <div>
                            <h4>Ứng dụng tiện lợi dàng cho</h4>
                            <h4>người yêu điện ảnh</h4>
                            <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn</p>
                            <button className="btn btn-app">App miễn phí - Tải về ngay!</button>
                            <p>Tix có hai phiên bản <span>IOS</span> & <span>Android</span> </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 myApplication_left" >
                        <img src="./img/mobile_new.png" className="img_phone"></img>
                        <Slider {...settings} className="img_slick">
                            <div>
                                <img src="./img/slide1.jpg" className="img-slider"></img>
                            </div>
                            <div>
                                <img src="./img/slide2.jpg" className="img-slider"></img>
                            </div>
                            <div>
                                <img src="./img/slide3.jpg" className="img-slider"></img>
                            </div>
                            <div>
                                <img src="./img/slide4.jpg" className="img-slider"></img>
                            </div>
                            <div>
                                <img src="./img/slide5.jpg" className="img-slider"></img>
                            </div>
                            <div>
                                <img src="./img/slide6.jpg" className="img-slider"></img>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
