import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuChiTietPhimAction } from '../../Redux/action/QuanLyPhimAction'
import moment from 'moment'

import './ChiTietPhimItem.scss'
import { hienThiNumberIconStart } from '../../Redux/action/QuanLyHienThiLogicAction'
import PopupVideo from '../PopupVideo/PopupVideo'
import { OPEN_MODAL_VIDEO } from '../../Redux/type/TypePopupModal'

export default function ChiTietPhimItem(props) {

    let { thongTinPhim } = props
    // console.log('thongTinPhim', thongTinPhim)

    const dispatch = useDispatch()

    let mangDanhGia = useSelector(state => state.QuanLyDanhGiaReducer.mangDanhGia)

    // Lấy diểm từ mảng đánh giá trên store
    let diemMangDanhGia = mangDanhGia?.reduce((tongDiem, itemDanhGia, index) => {
        return tongDiem += itemDanhGia.diem
    }, 0)
    // Lấy điểm đánh giá từ bộ phim
    let diemPhim = thongTinPhim?.danhGia

    // Xử lý hiện thị góc xoay đánh giá điểm
    let degBorderCircle = ""

    let xuLyHienThiGocBorder = (diem) => {

        // console.log('diem', diem)
        let gocXoayBorder = ""

        if (diem === 5) {
            return gocXoayBorder = "180deg"
        }
        else if (diem > 5 && diem <= 6) {
            return gocXoayBorder = "225deg"
        }
        else if (diem > 6 && diem <= 7) {
            return gocXoayBorder = "250deg"
        }
        else if (diem > 7 && diem <= 7.5) {
            return gocXoayBorder = "275deg"
        }
        else if (diem > 7.5 && diem <= 8) {
            return gocXoayBorder = "290deg"
        }
        else if (diem > 8 && diem < 9) {
            return gocXoayBorder = "305deg"
        }
        else if (diem >= 9 && diem <= 9.9) {
            return gocXoayBorder = "340deg"
        }
        else if (diem > 9.9) {
            return gocXoayBorder = "360deg"
        }

    }

    if (diemPhim) {
        var tongDiemPhim = ((diemPhim + diemMangDanhGia) / (mangDanhGia.length + 1)).toFixed(1)

        // console.log('tongDiemPhim', tongDiemPhim)

        degBorderCircle = xuLyHienThiGocBorder(tongDiemPhim)
        // console.log('gocXoay', degBorderCircle)
    }

    // console.log('thongTinPhim', thongTinPhim)
    // console.log('tongDiem', diemMangDanhGia)
    // console.log('tongDiemPhim', tongDiemPhim)
    // console.log('diemPhim', diemPhim)

    return (
        <div className="chiTietPhimItem">
            <PopupVideo></PopupVideo>
            <img className="chiTietPhim_bgImage d-none d-md-block" src={thongTinPhim?.hinhAnh}></img>
            <div className="chiTietPhimItem_overlay">
            </div>

            <div className="chiTietPhimItem_contentMobile d-md-none d-block"
                style={{
                    backgroundImage: `url(${thongTinPhim?.hinhAnh})`
                }}>
                <div className="contentMobile_overlay">
                </div>
                <div className="chiTietPhim_infomationMobile">
                    <p className="chiTietPhimItem_ngayKhoiChieu">{moment(thongTinPhim?.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                    <p className="chiTietPhimItem_tenPhim">
                        {thongTinPhim?.tenPhim}
                    </p>

                    <p className="chiTietPhimItem_thoiLuong">120 Phút - IDM 8.5 - 2D/Digital</p>

                </div>
                <button onClick={() => {
                    let trailerPhimItem = thongTinPhim?.trailer.substr(30)
                    dispatch({
                        type: OPEN_MODAL_VIDEO,
                        trailerFilm: trailerPhimItem

                    })
                }} className="btn-play">
                    <i className="fa fa-play"></i>
                </button>
            </div>

            <div className=" chiTietPhimItem_content d-md-flex d-none">
                <div className="chiTietPhimItem_intro">
                    <div className="chiTietPhimItem_introImg">
                        <img src={thongTinPhim?.hinhAnh}></img>
                        <button onClick={() => {
                            let trailerPhimItem = thongTinPhim?.trailer.substr(30)
                            dispatch({
                                type: OPEN_MODAL_VIDEO,
                                trailerFilm: trailerPhimItem

                            })
                        }} className="btn-play">
                            <i className="fa fa-play"></i>
                        </button>
                    </div>
                    <div className="chiTietPhim_infomation">
                        <p className="chiTietPhimItem_ngayKhoiChieu">{moment(thongTinPhim?.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                        <p className="chiTietPhimItem_tenPhim">
                            <span>C16</span>
                            <span className="chiTietPhimItem_tenPhim">{thongTinPhim?.tenPhim}</span>
                        </p>

                        <p className="chiTietPhimItem_thoiLuong">120 Phút - IDM 8.5 - 2D/Digital</p>
                        <button className="btn btn_muaVe">Mua vé</button>
                    </div>
                </div>
                <div className="chiTietPhimItem_danhGia">
                    <div className="bgDanhGia">
                        <div className="bgCircle">
                        </div>
                        <div style={{ transform: `rotate(${degBorderCircle})` }} className="bgBorder bgBorderLeft">
                        </div>
                        <div className="bgBorder bgBorderRight">
                        </div>
                        <p className="diemDanhGia">{tongDiemPhim}</p>
                    </div>
                    <div className="bgIconStar">
                        <div className="d-flex">
                            {tongDiemPhim / 2 === parseInt(tongDiemPhim / 2) ? hienThiNumberIconStart(parseInt(tongDiemPhim / 2), 0) : hienThiNumberIconStart((parseInt(tongDiemPhim / 2) + 1), 1)}
                        </div>
                        <p>{mangDanhGia?.length} người đánh giá</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
