import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import './ChiTietThanhToan.scss'
import { USER_DANG_NHAP } from '../../../utils/setting'
import { datVeAction } from '../../../Redux/action/QuanLyPhimAction'
import MenuCinema from '../MenuCinema/MenuCinema'

export default function ChiTietThanhToan(props) {

    const maLichChieu = props.maLichChieu

    const phongVe = useSelector(state => state.QuanLyPhimReducer.phongVe)

    const danhSachGheDangChon = useSelector(state => state.QuanLyPhimReducer.danhSachGheDangChon)

    let tienThucAn = useSelector(state => state.QuanLyMenuThucAnReducer.tongGiaThucAn)



    // Xứ lý logic để disabled nút thanh toán
    let disabled = danhSachGheDangChon.length === 0 ? true : false
    let typeCursor = danhSachGheDangChon.length === 0 ? "no-drop" : "pointer"

    const dispatch = useDispatch()
    // console.log('dsGheDangChon', danhSachGheDangChon)

    console.log('phongVe', phongVe)


    // Xử lý logic hiển thị combo truyền xuống con MenuCinema
    let activeMenu = useSelector(state => state.QuanLyMenuThucAnReducer.activeMenu)

    // Tạo hàm render soGheDangChon
    const renderSoGheDangChon = () => {
        return danhSachGheDangChon?.map((ghe, index) => {
            return <span key={index} className="ml-2 text-success">
                {ghe.tenSoGhe}
            </span>
        })
    }

    // Tiền khi đặt ghế
    let tienGhe = danhSachGheDangChon?.reduce((tongTienGhe, ghe, index) => {
        return tongTienGhe += ghe.giaVe
    }, 0)

    // Tính tổng tiến thanh toán
    let tongTienThanhToan = tienGhe + tienThucAn

    return (
        <Fragment>
            <div className="booking_payment">
                <p className="total_payment">{tongTienThanhToan.toLocaleString()} vnđ</p>
                <p className="nameFilm">
                    {phongVe?.thongTinPhim?.tenPhim}
                </p>
                <div className="payment_detail">
                    <p>Ngày chiếu giờ chiếu</p>
                    <p className="text-success">{phongVe?.thongTinPhim?.ngayChieu} - {phongVe?.thongTinPhim?.gioChieu}</p>
                </div>
                <div className="payment_detail">
                    <p>Rạp</p>
                    <p className="text-success">{phongVe?.thongTinPhim?.tenRap}</p>
                </div>
                <div className="payment_detail">
                    <p>
                        Ghế:
                        {renderSoGheDangChon()}
                    </p>
                    <p className="text-success">{tienGhe ? `${tienGhe.toLocaleString()} vnd` : "0 vnd"}</p>
                </div>
                <div className="payment_detail">
                    <p onClick={() => {
                        dispatch({
                            type: "XET_ACTIVE_MENU",
                            statusActive: !activeMenu
                        })
                    }} style={{ cursor: "pointer" }}>Chọn combo</p>
                    <p className="text-success">{tienThucAn.toLocaleString()} vnđ</p>
                </div>
                <div className="method_payment text-left">
                    <div className="method_detail">
                        <input type="radio" name="payment" value="ATM" id="ATM"></input>
                        <img src="/img/ATMNoiDia.png"></img>
                        <label htmlFor="ATM">Thẻ ATM nội địa</label>
                    </div>

                    <div className="method_detail my-2">
                        <input type="radio" name="payment" value="visa" id="visa"></input>
                        <img src="/img/visa.png"></img>
                        <label htmlFor="visa">Thẻ Visa, Master, JCB</label>
                    </div>


                    <div className="method_detail">
                        <input type="radio" name="payment" value="tienmat" id="tiemmat"></input>
                        <img src="/img/tienmat.png"></img>
                        <label htmlFor="tienmat">Thanh toán tiền mặt</label>
                    </div>

                </div>
                <button onClick={() => {

                    let userLogin = JSON.parse(localStorage.getItem(USER_DANG_NHAP))
                    let objectDatVe = {
                        maLichChieu: maLichChieu,
                        danhSachVe: danhSachGheDangChon,
                        taiKhoanNguoiDung: userLogin.taiKhoan
                    }

                    dispatch(datVeAction(objectDatVe))


                }} disabled={disabled} className="btn btn-payment" style={{ cursor: `${typeCursor}` }}>
                    THANH TOÁN
            </button>
            </div>

            <div className="btnPayment_mobile">
                <button className="btn btn_GheDat">
                    GHẾ ĐANG CHỌN
                </button>
                <button onClick={() => {

                    let userLogin = JSON.parse(localStorage.getItem(USER_DANG_NHAP))
                    let objectDatVe = {
                        maLichChieu: maLichChieu,
                        danhSachVe: danhSachGheDangChon,
                        taiKhoanNguoiDung: userLogin.taiKhoan
                    }

                    dispatch(datVeAction(objectDatVe))


                }} disabled={disabled} className="btn btnDatVe_mobile" style={{ cursor: `${typeCursor}` }}>
                    THANH TOÁN
                </button>

            </div>

            <MenuCinema></MenuCinema>
        </Fragment>

    )
}
