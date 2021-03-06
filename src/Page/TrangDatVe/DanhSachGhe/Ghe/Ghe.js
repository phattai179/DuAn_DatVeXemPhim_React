import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHON_GHE } from '../../../../Redux/type/TypeQuanLyPhim'
import { USER_DANG_NHAP } from '../../../../utils/setting'
import "./Ghe.scss"

export default function Ghe(props) {

    const ghe = props.ghe
    const maLichChieu = props.maLichChieu
    const dispatch = useDispatch()
    // Lấy danh Sách ghế đang chọn từ store
    let danhSachGheDangChon = useSelector(state => state.QuanLyPhimReducer.danhSachGheDangChon);

    // console.log('danhSachGheDangChon', danhSachGheDangChon)
    // Xử lý loại ghế
    let loaiGhe = ghe.loaiGhe === "Vip" ? "gheVip" : ""

    let gheDaDat = ghe.daDat === true ? "gheDaDat" : ""
    let disabled = ghe.daDat === true ? true : false

    let indexMaGheDangChon = danhSachGheDangChon?.findIndex(gheDangChon => gheDangChon.maGhe === ghe.maGhe)

    let gheDangChon = indexMaGheDangChon !== -1 ? "gheDangChon" : ""

    let activeGheDangChon = gheDangChon !== "" ? "activeGheDangChon" : ""

    // Sử dụng useState để thêm trước danh sách ghế đang chọn lên đặt vé
    let [dsGheDatVe, setDsGheDatVe] = useState()

    const hienThiHangGhe = () => {
        if (ghe.stt <= 16) {
            return "A"
        } else if (ghe.stt <= 32) {
            return "B"
        } else if (ghe.stt <= 48) {
            return "C"
        } else if (ghe.stt <= 64) {
            return "D"
        } else if (ghe.stt <= 80) {
            return "E"
        } else if (ghe.stt <= 96) {
            return "F"
        } else if (ghe.stt <= 112) {
            return "G"
        } else if (ghe.stt <= 128) {
            return "H"
        } else if (ghe.stt <= 144) {
            return "I"
        } else if (ghe.stt <= 160) {
            return "J"
        }
    }

    const hienThiSoGhe = () => {
        let soGhe = ghe.stt

        while (soGhe > 16) {
            soGhe -= 16
        }

        return soGhe
    }

    let hangGhe = hienThiHangGhe()
    let soGhe = hienThiSoGhe()

    return (
        <Fragment>
            <button disabled={disabled} onClick={() => {
    
                dispatch({
                    type: CHON_GHE,
                    dataGheDangChon: {
                        maGhe: ghe.maGhe,
                        giaVe: ghe.giaVe,
                        stt: ghe.stt,
                        hangGhe: hangGhe,
                        soGhe: soGhe
                    },
                })
            }} className={`ghe ${loaiGhe} ${gheDangChon} ${gheDaDat}`}>
                <span className={`gheContent ${activeGheDangChon}`}>
                    {soGhe}
                </span>
            </button>
        </Fragment>
    )
}
