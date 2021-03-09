import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { hienThiMauCumRapAction } from '../../../Redux/action/QuanLyHienThiLogicAction'
import {layThongTinPhongVeAction} from '../../../Redux/action/QuanLyPhimAction'
import './DanhSachGhe.scss'

export default function DanhSachGhe(props) {

    const dispatch = useDispatch()

    // Lấy mã lịch chiếu 
    const maLichChieu = props.maLichChieu
    console.log('maLichChieu', maLichChieu)

    // Lấy thông tin phòng vé từ store sau khi gọi thành công api

    let phongVe = useSelector(state => state.QuanLyPhimReducer.phongVe)

    console.log('phongVe', phongVe)

    // Xử lý logic hiện thị màu tên hệ thống rạp
    let maHeThongRap = useSelector(state => state.QuanLyPhimReducer.maHeThongRap)
    let objectCumRap = hienThiMauCumRapAction(maHeThongRap)

    console.log("objectCumRap", objectCumRap)

    useEffect(() => {
        dispatch(layThongTinPhongVeAction(maLichChieu))
    },[])

    return (
        <div className="datGhe_content">
            <div className="title_cumRap">
                <img src="/img/example_cumrap.jpg"></img>
                <div>
                    <p style={{color: `${objectCumRap.colorTenHeThongRap}`}}>
                        {phongVe?.thongTinPhim?.tenCumRap.substr(0,objectCumRap.numTrimHeThongRap)}  
                    <span style={{color: "black"}}>
                        {phongVe?.thongTinPhim?.tenCumRap.substr(objectCumRap.numTrimHeThongRap)} - 
                        {phongVe?.thongTinPhim?.tenRap}
                    </span>
                    </p>
                    <span className="title_diaChi">{phongVe?.thongTinPhim?.diaChi}</span>
                </div>
            </div>
            {/* <div className="screen">

            </div> */}
            <div className="screen">
                <div className="box-screen">
                    Màn hình
                </div>
                <div className="shadow_screen">

                </div>

            </div>

        </div>
    )
}
