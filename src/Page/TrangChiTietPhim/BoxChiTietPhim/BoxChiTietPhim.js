import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LichChieuChiTietPhim from './LichChieuChiTietPhim/LichChieuChiTietPhim'
import ThongTinChiTietPhim from './ThongTinChiTietPhim/ThongTinChiTietPhim'
import DanhGiaChiTietPhim from './DanhGiaChiTietPhim/DanhGiaChiTietPhim'
import './BoxChiTietPhim.scss'
import PopupComment from '../../../Components/PopupComent/PopupComment';

export default function BoxChiTietPhim(props) {

    let { thongTinPhim } = props

    let [display, setDisplay] = useState({
        contentDisplay: "lichChieu",
    })

    let activeLichChieu = (display.contentDisplay === "lichChieu") ? "active" : ""
    let activeThongTin = (display.contentDisplay === "thongTin") ? "active" : ""
    let activeDanhGia = (display.contentDisplay === "danhGia") ? "active" : ""

    let renderDisplay = () => {
        switch (display.contentDisplay) {
            case "lichChieu":
                return <div>
                    <LichChieuChiTietPhim thongTinPhim={thongTinPhim}></LichChieuChiTietPhim>
                </div>
                break;
            case "thongTin":
                return <div>
                    <ThongTinChiTietPhim thongTinPhim={thongTinPhim} ></ThongTinChiTietPhim>
                </div>
                break;
            case "danhGia":
                return <div>
                    <DanhGiaChiTietPhim></DanhGiaChiTietPhim>
                </div>
                break;
            default:
                return <div>
                    <LichChieuChiTietPhim></LichChieuChiTietPhim>
                </div>
                break;
        }
    }

    return (
        <div className="boxChiTietPhim">
            <div className="boxChiTietPhim_display text-center mb-5">
                <span className={activeLichChieu} onClick={() => {
                    setDisplay({
                        contentDisplay: "lichChieu"
                    })
                }}>Lịch Chiếu</span>
                <span className={activeThongTin} onClick={() => {
                    setDisplay({
                        contentDisplay: "thongTin"
                    })
                }}>Thông Tin</span>
                <span className={activeDanhGia} onClick={() => {
                    setDisplay({
                        contentDisplay: "danhGia"
                    })
                }}>Đánh Giá</span>
            </div>
            {renderDisplay()}
        </div>
    )
}
