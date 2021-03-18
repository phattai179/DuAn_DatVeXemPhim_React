import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hienThiMauCumRapAction } from '../../../Redux/action/QuanLyHienThiLogicAction'
import { layThongTinPhongVeAction } from '../../../Redux/action/QuanLyPhimAction'
import TimeWaiting from '../TimeWaiting/TimeWaiting'
import './DanhSachGhe.scss'
import './../ChiTietThanhToan/ChiTietThanhToan.scss'
import Ghe from './Ghe/Ghe'

export default function DanhSachGhe(props) {

    const dispatch = useDispatch()

    // Lấy mã lịch chiếu 
    const maLichChieu = props.maLichChieu
    // console.log('maLichChieu', maLichChieu)

    // Lấy thông tin phòng vé từ store sau khi gọi thành công api
    let phongVe = useSelector(state => state.QuanLyPhimReducer.phongVe)

        // console.log('phongVe', phongVe)

    // Xử lý logic hiển thị activeDanhSachGheMobile
    let activeDanhSachGheMobile = useSelector(state => state.QuanLyPhimReducer.activeDanhSachGheMobile)

    let danhSachGheMobile = activeDanhSachGheMobile ? "danhSachGheMobile" : ""

    // Lấy danh sách ghế đã đặt render
    const danhSachGheDangChon = useSelector(state => state.QuanLyPhimReducer.danhSachGheDangChon)

    // Tạo biến disabled khi nhấn
    let disabled = danhSachGheDangChon.length === 0 ? true : false

    

    // Xử lý logic hiện thị màu tên hệ thống rạp
    let maHeThongRap = useSelector(state => state.QuanLyPhimReducer.maHeThongRap)
    let objectCumRap = hienThiMauCumRapAction(maHeThongRap)

    // console.log("objectCumRap", objectCumRap)

    useEffect(() => {
        dispatch(layThongTinPhongVeAction(maLichChieu))
    }, [])


    let tenHangGhe = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
    ]

    const renderTenHangGhe = () => {
        return tenHangGhe.map((item, index) => {

            return <Fragment key={index}>
                <button className="ghe hangGhe" style={{backgroundColor: "transparent", fontWeight: "600", cursor: "none"}}>
                    {item}
                </button>
                <br></br>
            </Fragment>

        })

    }

    const renderGhe = () => {
        return phongVe?.danhSachGhe?.map((ghe, index) => {
            return <Fragment key={index}>
                <Ghe ghe={ghe} maLichChieu = {maLichChieu}></Ghe>
                {(index + 1) % 16 === 0 ? <br></br> : ""}
            </Fragment>
        })
    }

    const renderDanhSachGheDangChon = () => {
        return danhSachGheDangChon?.map((gheDangChon, index) => {
            return (
            <span key={index}>
                {gheDangChon.hangGhe}{gheDangChon.soGhe}
                {index === danhSachGheDangChon.length ? "." : ", "}
            </span>
                
            )
        })
    }

    return (
        <div id={danhSachGheMobile} className="datGhe_content">
            <div className="title_cumRap">
                <img src="/img/example_cumrap.jpg"></img>
                <div>
                    <p style={{ color: `${objectCumRap.colorTenHeThongRap}` }}>
                        {phongVe?.thongTinPhim?.tenCumRap.substr(0, objectCumRap.numTrimHeThongRap)}
                        <span style={{ color: "black" }}>
                            {phongVe?.thongTinPhim?.tenCumRap.substr(objectCumRap.numTrimHeThongRap)} -
                        {phongVe?.thongTinPhim?.tenRap}
                        </span>
                    </p>
                    <span className="title_diaChi">{phongVe?.thongTinPhim?.diaChi}</span>
                </div>
                <div className="boxTimeWaiting">
                    <p>thời gian giữ ghế</p>
                    <TimeWaiting></TimeWaiting>
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
            <div className="seat_position">
                <div className="seat_nameList">
                    {renderTenHangGhe()}
                </div>
                <div className="seat_list">
                    {renderGhe()}
                </div>
            </div>
            <div className="seat_note d-flex">
                <div className="seat_basic">
                    <button className="gheNote"></button>
                    <p>Ghế thường</p>
                </div>
                <div className="seat_vip">
                    <button className="gheNote gheVip"></button>
                    <p>Ghế Vip</p>
                </div>
                <div className="seat_available">
                    <button className="gheNote gheDangChon"></button>
                    <p>Ghế đang chọn</p>
                </div>
                <div className="seat_disable">
                    <button className="gheNote gheDaDat"></button>
                    <p>Ghế đã có người chọn</p>
                </div> 
            </div>
            
            {/* Hiển thị ở màn hình mobile */}
            <div className="btnPayment_mobile">
                <button className="btn btn_GheDat">
                    {danhSachGheDangChon.length !== 0 ?
                        renderDanhSachGheDangChon() : 
                        "VUI LÒNG CHỌN GHẾ"
                    }
                </button>
                <button onClick={() => {
                    dispatch({
                        type: 'ACTIVE_TRANG_DAT_VE_MOBILE',
                        statusDanhSachGheMobile: false,
                        statusChiTietThanhToanMobile: true
                    })
                }}  disabled={disabled} className="btn btnDatVe_mobile">TIẾP TỤC</button>
            </div>


        </div>
    )
}
