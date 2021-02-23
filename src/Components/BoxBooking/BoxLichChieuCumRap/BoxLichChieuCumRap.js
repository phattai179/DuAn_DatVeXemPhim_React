import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuTheoCumRapAction } from '../../../Redux/action/QuanLyPhimAction'
import { LAY_MA_CUM_RAP } from '../../../Redux/type/TypeQuanLyPhim'
import './BoxLichChieuCumRap.scss'
import moment from 'moment'

export default function BoxLichChieuCumRap() {

    // Lấy thông tin lịch chiếu cụm rạp từ store
    let thongTinLichChieuCumRap = useSelector(state => state.QuanLyPhimReducer.thongTinLichChieuCumRap)

    console.log('thongTinLichChieu', thongTinLichChieuCumRap)

    // Lấy mã cụm rạp từ store khi người dùng click vào cụm rap
    let maCumRapStore = useSelector(state => state.QuanLyPhimReducer.maCumRap)
    console.log('maCumRap', maCumRapStore)


    // Lấy mã hệ thống rạp từ store
    let maHeThongRap = useSelector(state => state.QuanLyPhimReducer.maHeThongRap)

    console.log('maHeThongRap', maHeThongRap)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinLichChieuTheoCumRapAction(maHeThongRap, maCumRapStore))
    }, [])

    return (
        <div className="myBoxLichChieu">
            {thongTinLichChieuCumRap?.map((item, index) => {

                return <Fragment key={index}>
                    {item?.lstCumRap?.map((cumRap, index) => {
                        // console.log('cumrap1', cumRap)
                        // console.log('maCumRap1', cumRap.maCumRap)
                        if (maCumRapStore === cumRap.maCumRap) {
                            // console.log('cumRap2', cumRap.maCumRap)
                            return <Fragment key={index}>
                                {cumRap?.danhSachPhim?.map((phim, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="myBoxLichChieu_itemPhim d-flex" >
                                                <img src={phim.hinhAnh} style={{ width: "100px", height: "110px" }}></img>
                                                <div className="myBoxLichChieu_intro">
                                                    <p>{phim.tenPhim}</p>
                                                    <p>120 phút</p>
                                                </div>
                                                <div className="myBoxLichChieu_icon">
                                                    <i className="fa fa-angle-down"></i>
                                                </div>
                                            </div>
                                            <div className="myBoxLichChieu_lichChieu row">
                                                {phim?.lstLichChieuTheoPhim?.map((lichChieu, index) => {
                                                    return <div key={index} className="col-3">
                                                        <button>
                                                            <a>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm') }
                                                            </a>
                                                            <span>
                                                                ~ {moment(lichChieu.ngayChieuGioChieu).format('DD-MM')}
                                                            </span>
                                                        </button>

                                                    </div>
                                                })}
                                            </div>
                                        </Fragment>

                                    )
                                })}
                            </Fragment>
                        } else {
                            return ""
                        }

                    })}
                </Fragment>
            })}

        </div>
    )
}
