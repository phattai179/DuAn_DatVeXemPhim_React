import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuChiTietPhimAction } from '../../Redux/action/QuanLyPhimAction'
import moment from 'moment'
import './DropdownDatVe.scss'
import { NavLink } from 'react-router-dom'
import { SET_TEN_HE_THONG_RAP } from '../../Redux/type/TypeQuanLyPhim'

export default function DropdownDatVe() {

    let mangPhim = useSelector(state => state.QuanLyPhimReducer.mangPhim)
    // console.log('mangPhim', mangPhim)

    const thongTinPhim = useSelector(state => state.QuanLyPhimReducer.thongTinLichChieuChiTietPhim)
    // console.log('thongTinPhim', thongTinPhim)

    let [phim, setPhim] = useState({
        maPhim: 0,
        tenPhim: "Phim",
        cumRap: "Rạp",
        ngayXem: "Ngày xem",
        lichChieu: "Lịch chiếu",
        maLichChieu: 0,
    })
    // console.log('phim', phim)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (phim.maPhim !== 0) {
    //         dispatch(layThongTinLichChieuChiTietPhimAction(phim.maPhim))
    //     }

    // }, [])

    const renderPhim = () => {
        return mangPhim?.map((itemPhim, index) => {
            return (
                <p onClick={() => {
                    dispatch(layThongTinLichChieuChiTietPhimAction(itemPhim.maPhim))
                    setPhim({
                        ...phim,
                        maPhim: itemPhim.maPhim,
                        tenPhim: itemPhim.tenPhim,
                        cumRap: "Rạp", 
                        ngayXem: "Ngày xem",
                        lichChieu: "Lịch chiếu",
                        maLichChieu: 0
                    })
                }} className="dropdown-item" key={index}>{itemPhim.tenPhim}</p>
            )
        })
    }

    const renderCumRap = () => {
        return thongTinPhim?.heThongRapChieu?.map((heThongRap, index) => {
            return heThongRap?.cumRapChieu?.map((itemCumRap, index) => {
                return <p onClick={() => {
                    setPhim({
                        ...phim,
                        cumRap: itemCumRap.tenCumRap,
                        ngayXem: "Ngày xem",
                        lichChieu: "Lịch chiếu",
                        maLichChieu: 0,
                    })
                    dispatch({
                        type: SET_TEN_HE_THONG_RAP,
                        dataMaHeThongRap: heThongRap.maHeThongRap
                    })
                }} key={index} className="dropdown-item">
                    {itemCumRap.tenCumRap}
                </p>
            })
        })
    }

    const renderNgayChieu = () => {
        let ngayChieuDefault = ""
        // console.log('ngayChieuDefault', ngayChieuDefault)
        return thongTinPhim?.heThongRapChieu?.map((heThongRap, index) => {
            return heThongRap?.cumRapChieu?.map((itemCumRap, index) => {
                // console.log('cumRapChieu', itemCumRap.tenCumRap)
                if (phim.cumRap === itemCumRap.tenCumRap) {
                    return itemCumRap?.lichChieuPhim?.map((lichChieu, index) => {
                        // console.log('ngayChieuGioChieu', lichChieu.ngayChieuGioChieu)
                        if ((ngayChieuDefault !== moment(lichChieu.ngayChieuGioChieu).format("DD-MM"))) {
                            ngayChieuDefault = moment(lichChieu.ngayChieuGioChieu).format("DD-MM")
                            // console.log('ngayChieuDefault', ngayChieuDefault)
                            return <p onClick={() => {
                                setPhim({
                                    ...phim,
                                    ngayXem: moment(lichChieu.ngayChieuGioChieu).format("DD-MM"),
                                    lichChieu: "Lịch chiếu",
                                    maLichChieu: 0
                                })
                            }} key={index} className="dropdown-item">
                                {moment(lichChieu.ngayChieuGioChieu).format("DD-MM")}
                            </p>
                        } else {
                            return ""
                        }
                    })
                }
            })
        })
    }

    const renderLichChieu = () => {
        return thongTinPhim?.heThongRapChieu?.map((heThongRap, index) => {
            return heThongRap?.cumRapChieu?.map((itemCumRap, index) => {
                if (phim.cumRap === itemCumRap.tenCumRap) {

                    let mangLichChieuTheoNgay = itemCumRap?.lichChieuPhim?.filter(lichChieu => moment(lichChieu.ngayChieuGioChieu).format("DD-MM") === phim.ngayXem)

                    // console.log('mangLichChieuTheoNgay', mangLichChieuTheoNgay)

                    return mangLichChieuTheoNgay.map((lichChieu, index) => {
                        return (
                            <p onClick={() => {
                                setPhim({
                                    ...phim,
                                    lichChieu: moment(lichChieu.ngayChieuGioChieu).format("hh:mm A"),
                                    maLichChieu: lichChieu.maLichChieu
                                })
                            }} key={index} className="dropdown-item">
                                {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                            </p>
                        )
                    })
                }
            })
        })
    }

    const renderKhongHienThi = (tenHienThi, idDropdown) => {
        return (
            <div className="dropdown-menu" style={{ height: "50px", overflow: "unset" }} aria-labelledby={idDropdown}>
                <p className="dropdown-item">Bạn chưa chọn {tenHienThi}</p>
            </div>
        )
    }

    return (
        <div id="myDropdown" className="container d-none d-lg-block">
            <div className="row" style={{lineHeight: "1"}}>
                {/* DropdownPhim */}
                <div className="myDropdownPhim col-4 col-xl-4">
                    <button id="btnDropdownPhim" className="btn dropdown-toggle" type="button" id="dropdownMenuPhim" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {phim.tenPhim}
                    </button>
                    <div style={{marginLeft: "15px"}} className="dropdown-menu dropdownShowPhim" aria-labelledby="dropdownMenuPhim">
                        {renderPhim()}
                    </div>
                </div>


                {/* Dropdowm Cụm Rạp */}
                <div className="myDropdownCumRap col col-xl-2">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuCumRap" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {phim.cumRap.length > 17 ? phim.cumRap.substr(0,17) + "..." : phim.cumRap}
                    </button>

                    <Fragment>
                        {phim.maPhim !== 0 ?
                            <div className="dropdown-menu dropdownShowCumRap" aria-labelledby="dropdownMenuCumRap">
                                {renderCumRap()}
                            </div>
                            :
                            <Fragment>
                                {renderKhongHienThi("phim", "dropdownMenuCumRap")}
                            </Fragment>
                        }
                    </Fragment>
                </div>

                {/* Dropdowm Ngày chiếu */}
                <div className="myDropdownNgayChieu col col-xl-2">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuNgayChieu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {phim.ngayXem}
                    </button>

                    <Fragment>
                        {phim.cumRap !== "Rạp" ?
                            <div className="dropdown-menu dropdownShowNgayChieu" aria-labelledby="dropdownMenuNgayChieu">
                                {renderNgayChieu()}

                            </div> :
                            <Fragment>
                                {renderKhongHienThi("rạp", "dropdownMenuNgayChieu")}
                            </Fragment>
                        }
                    </Fragment>
                </div>

                {/* Dropdowm Lịch chiếu */}
                <div className="myDropdownLichChieu col col-xl-2">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuLichChieu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {phim.lichChieu}
                </button>

                    <Fragment>
                        {phim.ngayXem !== "Ngày xem" ?
                            <div className="dropdown-menu dropdownShowLichChieu" aria-labelledby="dropdownMenuLichChieu">
                                {renderLichChieu()}

                            </div> : 
                            <Fragment>
                                {renderKhongHienThi("ngày xem", "dropdownMenuLichChieu")}
                            </Fragment>
                        }
                    </Fragment>

                </div>

                {/* Btn Mua Vé */}
                <div className="muaVe col col-xl-2 pl-0">
                    <NavLink to={`/datve/${phim.maLichChieu}`} className="btnMuaVe btn">
                        MUA VÉ NGAY
                </NavLink>
                </div>

            </div>

        </div>
    )
}




