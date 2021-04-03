import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuTheoCumRapAction } from '../../../Redux/action/QuanLyPhimAction'
import { LAY_MA_CUM_RAP } from '../../../Redux/type/TypeQuanLyPhim'
import './BoxLichChieuCumRap.scss'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

export default function BoxLichChieuCumRap(props) {

    // Lấy thông tin lịch chiếu cụm rạp từ store
    let thongTinLichChieuCumRap = useSelector(state => state.QuanLyPhimReducer.thongTinLichChieuCumRap)

    // console.log('thongTinLichChieu', thongTinLichChieuCumRap)

    // Lấy mã cụm rạp từ store khi người dùng click vào cụm rap
    let maCumRapStore = useSelector(state => state.QuanLyPhimReducer.maCumRap)
    // console.log('maCumRap', maCumRapStore)


    // Lấy mã hệ thống rạp từ store
    let maHeThongRap = useSelector(state => state.QuanLyPhimReducer.maHeThongRap)

    // console.log('maHeThongRap', maHeThongRap)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinLichChieuTheoCumRapAction(maHeThongRap, maCumRapStore))
    }, [])

    return (
        <div className="myBoxLichChieu">
            {thongTinLichChieuCumRap?.map((item, index) => {
                // console.log('cumrap1', cumRap)
                // console.log('maCumRap1', cumRap.maCumRap)
                let cumRapHienThi = item?.lstCumRap?.find(cumRapHienThi => cumRapHienThi.maCumRap === maCumRapStore)
                //maCumRapStore === cumRap.maCumRap
                if (cumRapHienThi) {
                    // console.log('cumRapHienThi', cumRapHienThi)
                    return <Fragment key={index}>
                        {cumRapHienThi?.danhSachPhim?.map((phim, index) => {
                            return (
                            <div key={index} className="myBoxLichChieu_item">
                                <div className="myBoxLichChieu_intro d-flex" data-toggle="collapse" data-target={`#showLichChieu${index}`} aria-expanded="false" aria-controls={`showLichChieu${index}`}>
                                    <img src={phim.hinhAnh} style={{ width: "60px", height: "70px" }}></img>
                                    <div className="myBoxLichChieu_info">
                                        <p> <span>C16</span>- {phim.tenPhim}</p>
                                        <p>120 phút - IMDb 0</p>
                                    </div>
                                    <div className="myBoxLichChieu_icon">
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                                </div>
                                <div className="myBoxLichChieu_lichChieu row collapse" id={`showLichChieu${index}`}>
                                    {phim?.lstLichChieuTheoPhim?.map((lichChieu, index) => {
                                        return <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                                            <NavLink className="btn" to={`datve/${lichChieu.maLichChieu}`}>
                                                <span className="myBoxLichChieu_gio">
                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}
                                                </span>
                                                <span className="myBoxLichChieu_ngay">
                                                    ~{moment(lichChieu.ngayChieuGioChieu).format('DD-MM')}
                                                </span>
                                            </NavLink>
                                        </div>
                                    })}
                                </div>
                            </div>
                            )
                        })}
                    </Fragment>
                } else {
                    return <p key={index} className="notData_LichChieu">Không có suất chiếu</p>;
                }
            })}

        </div>
    )
}
