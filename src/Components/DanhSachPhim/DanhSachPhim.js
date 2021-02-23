import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './DanhSachPhim.scss'

import '../../../node_modules/react-modal-video/scss/modal-video.scss';

// Install react-slick
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import PhimItem from '../PhimItem/PhimItem';
import PopupVideo from '../PopupVideo/PopupVideo';

export default function DanhSachPhim() {

    const dispatch = useDispatch()

    // Setting react-slick
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        rows: 2,
        slidesPerRow: 1,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 1,
                    dots: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                    dots: false,
                    infinite: false,
                }
            }
        ]
    };

    // setting Chọn loại phim
    let [loaiPhim, setLoaiPhim] = useState({
        type: "dangChieu",
        status: false
    })

    // console.log("loaiPhim", loaiPhim.type)
    let activeDangChieu = ""
    if (loaiPhim.type === "dangChieu") {
        activeDangChieu = "active"
    }

    let activeSapChieu = ""
    if (loaiPhim.type === "sapChieu") {
        activeSapChieu = "active"
    }

    // Lấy mảng phim từ store

    let mangPhim = useSelector(state => state.QuanLyPhimReducer.mangPhim)

    let mangPhimDangChieu = mangPhim.slice(0, 16);
    let mangPhimSapChieu = mangPhim.slice(18, 34);

    // console.log('mangPhimDangChieu', mangPhimDangChieu)
    // console.log('mangPhimSapChieu', mangPhimSapChieu)

    const renderPhimDangChieu = () => {
        return mangPhimDangChieu.map((phim, index) => {
            return (
                <PhimItem key={index} itemPhim={phim} ></PhimItem>
            )
        })
    }

    const renderPhimSapChieu = () => {
        return mangPhimSapChieu.map((phim, index) => {
            return (
                <div key={index}>
                    <PhimItem  itemPhim={phim} ></PhimItem>
                </div>
            )
        })
    }


    return (

        <div className="myListFilm">
            <div className="container" >
                <div className="row" >
                    <div className="col-12 text-center" >
                        <button onClick={() => {
                            setLoaiPhim({
                                ...loaiPhim,
                                type: "dangChieu",
                                status: true
                            })
                        }} className={` myListFilm_title ${activeDangChieu}`}>Đang Chiếu</button>
                        <button onClick={() => {
                            setLoaiPhim({
                                ...loaiPhim,
                                type: "sapChieu",
                                status: true
                            })
                        }} className={` myListFilm_title ${activeSapChieu}`}>Sắp Chiếu</button>
                    </div>
                </div>
                <PopupVideo></PopupVideo>
                <div className="myListFilm_content" >
                    <Slider {...settings}>
                        {loaiPhim.type == "dangChieu" ? renderPhimDangChieu() : renderPhimSapChieu()}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
