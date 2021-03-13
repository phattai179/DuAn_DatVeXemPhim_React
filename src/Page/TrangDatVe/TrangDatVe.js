import React from 'react'
import ChiTietThanhToan from './ChiTietThanhToan/ChiTietThanhToan'
import DanhSachGhe from './DanhSachGhe/DanhSachGhe'
import HeaderDatVe from './HeaderDatVe/HeaderDatVe'
import './TrangDatVe.scss'

export default function TrangDatVe(props) {

    // console.log('props', props)
    const maLichChieu = props.match.params.maLichChieu

    return (
        <div className="datVe">
            <div className="container-fluid datVe_container">
                {/* Hiển thị màn hình destop */}
                <div className="row">
                    <div className="col-8 p-0 datVe_left">
                        <HeaderDatVe></HeaderDatVe>
                        <DanhSachGhe maLichChieu={maLichChieu} className="col-12"></DanhSachGhe>
                    </div>
                    <div className="col-4 p-0 chiTietThanhToan">
                        <ChiTietThanhToan maLichChieu={maLichChieu} ></ChiTietThanhToan>
                    </div>
                </div>
                {/* Hiển thị màn hình mobile */}
            </div>
            
            <div className="datVeMobile_container">
                <HeaderDatVe></HeaderDatVe>
                <DanhSachGhe maLichChieu={maLichChieu} ></DanhSachGhe>
                <ChiTietThanhToan maLichChieu={maLichChieu} ></ChiTietThanhToan>
            </div>
        </div>
    )
}
