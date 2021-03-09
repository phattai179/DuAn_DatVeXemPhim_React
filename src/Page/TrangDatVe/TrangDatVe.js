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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 p-0">
                        <HeaderDatVe className="col-12"></HeaderDatVe>
                        <DanhSachGhe maLichChieu = {maLichChieu} className="col-12"></DanhSachGhe>
                    </div>
                    <div className="col-4">
                        <ChiTietThanhToan></ChiTietThanhToan>
                    </div>
                </div>

            </div>
        </div>
    )
}
