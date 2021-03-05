import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import './LichChieuChiTietPhim.scss'
import { SET_TEN_HE_THONG_RAP } from '../../../../Redux/type/TypeQuanLyPhim'
import { hienThiMauCumRapAction } from '../../../../Redux/action/QuanLyHienThiLogicAction'

export default function LichChieuChiTietPhim(props) {

    // Lấy thongTinPhim từ props cha truyền xuống
    let { thongTinPhim } = props
    // console.log('thongTinPhimChild', thongTinPhim)

    // Xử lý logic xét index
    let [indexActive, setIndexActive] = useState({
        activeHeThongRap: 0,
        activeNgayChieu: 0,
    })

    // Xử lý logic xét hệ thống rạp

    let [maHeThongRapHienThi, setMaHeThongRapHienThi] = useState({
        maHeThongRap: "CGV"
    })


    // console.log('maHeThongRapState', maHeThongRapHienThi.maHeThongRap)

    // Xử lý logic ngayChieu
    let [ngayChieuHienThi, setNgayChieuHienThi] = useState({
        ngayChieu: "01-01"
    })

    const dispatch = useDispatch()

    useEffect(() => {
        let maHeThongRapBegin = ""
        let arrayHeThongRap = thongTinPhim?.heThongRapChieu?.map((heThongRap, index) => {
            return heThongRap.maHeThongRap
        })
        if (arrayHeThongRap) {
            maHeThongRapBegin = arrayHeThongRap[0]
            // console.log('arrHeThongRap', arrayHeThongRap)
            // console.log('maHeThongRapBegin', maHeThongRapBegin)
        }
        setMaHeThongRapHienThi({
            maHeThongRap: maHeThongRapBegin
        })
    }, [thongTinPhim])

    // Tạo cố định mảng ngày chiếu tại để click
    let mangNgayChieu = [
        {
            thu: "Thứ 2",
            ngayChieu: "01-01",
        },
        {
            thu: "Thứ 3",
            ngayChieu: "02-01",
        },
        {
            thu: "Thứ 4",
            ngayChieu: "03-01",
        },
        {
            thu: "Thứ 5",
            ngayChieu: "04-01",
        },
        {
            thu: "Thứ 6",
            ngayChieu: "05-01",
        },
        {
            thu: "Thứ 7",
            ngayChieu: "06-01",
        },
        {
            thu: "Chủ Nhật",
            ngayChieu: "07-01",
        },
        {
            thu: "Thứ 2",
            ngayChieu: "08-01",
        },

        {
            thu: "Thứ 3",
            ngayChieu: "09-01",
        },
        {
            thu: "Thứ 4",
            ngayChieu: "10-01",
        },
        {
            thu: "Thứ 5",
            ngayChieu: "11-01",
        },
        {
            thu: "Thứ 6",
            ngayChieu: "12-01",
        },
        {
            thu: "Thứ 7",
            ngayChieu: "13-01",
        },

    ]

    let renderNgayChieuLocal = () => {
        return mangNgayChieu.map((item, index) => {

            let active = index === indexActive.activeNgayChieu ? "active" : ""

            return <div onClick={() => {
                setIndexActive({ ...indexActive, activeNgayChieu: index })
                setNgayChieuHienThi({
                    ngayChieu: item.ngayChieu
                })
            }} key={index} className={`ngayChieu_item ${active}`}>
                <p>{item.thu}</p>
                <p>{item.ngayChieu.substr(0, 2)}</p>
            </div>
        })
    }

    let renderLichChieu = () => {
        let heThongRap = thongTinPhim?.heThongRapChieu?.find(htRap => htRap.maHeThongRap === maHeThongRapHienThi.maHeThongRap)

        // console.log('heThongRap', heThongRap)

        if (heThongRap) {
            let mangCumRap = heThongRap?.cumRapChieu?.map((cumRap, index) => {
                return cumRap?.lichChieuPhim
            })

            return heThongRap?.cumRapChieu?.map((cumRap, index) => {
                let indexStatusNgayChieu = 0;
                let ArrLichChieuTheoNgay = cumRap?.lichChieuPhim.filter(itemCumRap => moment(itemCumRap.ngayChieuGioChieu).format("DD-MM") === ngayChieuHienThi.ngayChieu)

                // console.log('arrLichChieuTheoNgay', ArrLichChieuTheoNgay)

                let objectCumRap = hienThiMauCumRapAction(heThongRap.maHeThongRap)
                // console.log('obCumRap', objectCumRap)

                if (ArrLichChieuTheoNgay.length !== 0) {
                    return <div key={index}>
                        {/* Render cụm rạp */}
                        <div className="cumRap_item"
                            data-toggle="collapse" data-target={`#lichChieu_item${index}`} aria-expanded="false" aria-controls={`lichChieu_item${index}`}

                        >
                            <img src="/img/example_cumrap.jpg" style={{ width: "50px", height: "50px" }}></img>
                            <p>
                                <span style={{ color: objectCumRap.colorTenHeThongRap }}>{cumRap.tenCumRap.substr(0, objectCumRap.numTrimHeThongRap)}</span>
                                <span>{cumRap.tenCumRap.substr(objectCumRap.numTrimHeThongRap)}</span>
                                <i className="fa fa-angle-down"></i>
                            </p>

                        </div>
                        {/* Render lịch chiếu */}
                        <div className="row lichChieu_item collapse" id={`lichChieu_item${index}`}>
                            <p className="col-12 mb-0 font-weight-bold">2D Digital</p>
                            {ArrLichChieuTheoNgay.map((lichChieu, index) => {
                                return <div key={index} className="col-4 col-md-3 lichChieu_detail">
                                    <button>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}</button>
                                </div>
                            })}
                        </div>
                    </div>
                }
                else {
                    indexStatusNgayChieu += 1;
                    if (indexStatusNgayChieu !== mangCumRap.length) {
                        return ""
                    } else {
                        return <p className="notData_LichChieu" key={index}>
                            Ngày không có suất chiếu
                        </p>
                    }
                }
            })
        } else {
            return <p className="notData_LichChieu">
                Không có suất chiếu
            </p>
        }
    }

    return (
        <div className="myLichChieuChiTietPhim container">
            <div className="row">
                <div className="col-12 col-md-3 myLichChieuChiTietPhim_heThongRap">
                    {thongTinPhim?.heThongRapChieu?.map((heThongRap, index) => {

                        let active = indexActive.activeHeThongRap === index ? "active" : ""

                        return <div onClick={() => {
                            setIndexActive({ ...indexActive, activeHeThongRap: index })
                            setMaHeThongRapHienThi({
                                maHeThongRap: heThongRap.maHeThongRap
                            })
                        }} key={index} className={`d-flex heThongRap_item ${active}`}>
                            <img src={heThongRap?.logo}></img>
                            <p>{heThongRap.tenHeThongRap}</p>
                        </div>
                    })}
                </div>
                <div className="col-12 col-md-9 myLichChieuChiTietPhim_detail">
                    <div className="myLichChieuChiTietPhim_ngayChieu">
                        {renderNgayChieuLocal()}
                    </div>
                    <div className="myLichChieuChiTietPhim_lichChieu">
                        {renderLichChieu()}
                    </div>
                </div>
            </div>

        </div>
    )
}
