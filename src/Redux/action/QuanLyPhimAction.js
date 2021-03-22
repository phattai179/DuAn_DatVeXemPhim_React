import Axios from 'axios'
import { useSelector } from 'react-redux'
import { ACCESS_TOKEN, DOMAIN, STATUS_CODE } from '../../utils/setting'
import { LAY_DANH_SACH_PHIM, LAY_DS_CUM_RAP_THEO_HE_THONG, LAY_MA_CUM_RAP, LAY_THONG_TIN_LICH_CHIEU_CHI_TIET_PHIM, LAY_THONG_TIN_HE_THONG_RAP, LAY_THONG_TIN_LICH_CHIEU_THEO_RAP, SET_TEN_HE_THONG_RAP, LAY_THONG_TIN_PHONG_VE } from '../type/TypeQuanLyPhim'
import { alertThanhCongAction, alertThatBaiAction } from './QuanLyModalAlert'

export const layDanhSachPhimAction = () => {

    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`,
                method: "GET"
            })

            // console.log('result', result)

            dispatch({
                type: LAY_DANH_SACH_PHIM,
                dataFilm: result.data
            })

        } catch (err) {
            console.log(err)
            console.log(err.response?.data)
        }
    }


}

export const layThongTinHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyRap/LayThongTinHeThongRap`,
                method: "GET"
            })

            // console.log('result', result)
            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_THONG_TIN_HE_THONG_RAP,
                    mangHeThongRap: result.data
                })
            }
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }

    }
}

export const layThongTinCumRapTheoHeThongAction = (maHeThongRap) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
                method: "GET"
            })

            // Note
            // Gọi dispatch để set tenHeThongRap để sét lại màu css cho tên cụm rạp
            dispatch({
                type: SET_TEN_HE_THONG_RAP,
                dataMaHeThongRap: maHeThongRap
            })

            // Gọi dispatch để set lại index hiển thị active trên boxCumRap
            dispatch({
                type: 'SET_NUM_ACTIVE',
                dataNumActive: 0
            })

            // console.log('result2', result)
            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_DS_CUM_RAP_THEO_HE_THONG,
                    dataCumRap: result.data
                })
            }
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }
}

export const layThongTinLichChieuTheoCumRapAction = (maHeThongRap, maCumRap) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP03`,
                method: "GET"
            })

            // console.log('result', result)
            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_THONG_TIN_LICH_CHIEU_THEO_RAP,
                    data: result.data
                })
            }

            dispatch({
                type: LAY_MA_CUM_RAP,
                dataMaCumRap: maCumRap
            })

        } catch (err) {
            console.log(err)
            console.log(err.response?.data)
        }
    }
}



export const layThongTinLichChieuChiTietPhimAction = (maPhim) => {
    return async (dispatch) => {

        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
                method: "GET"
            })

            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_THONG_TIN_LICH_CHIEU_CHI_TIET_PHIM,
                    data: result.data
                })
            }

        } catch (err) {
            console.log(err)
            console.log(err.response?.data)
        }
    }
}

export const layThongTinPhongVeAction = (maLichChieu) => {
    console.log('maLichChieu', maLichChieu)
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
                method: "GET"
            })

            // console.log('result', result)

            if (result.status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_THONG_TIN_PHONG_VE,
                    data: result.data
                })
            }

        } catch (err) {
            console.log(err)
            console.log(err?.response?.data)
        }
    }
}


export const datVeAction = (objectDatVe) => {
    return async (dispatch) => {

        let accessToken = localStorage.getItem(ACCESS_TOKEN)

        console.log('ob', objectDatVe)
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyDatVe/DatVe`,
                method: 'POST',
                data: objectDatVe,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            // console.log('result', result)
            if (result.status === STATUS_CODE.SUCCESS) {
                // console.log('data', result.data)
                alertThanhCongAction("Đặt vé")
                dispatch(layThongTinPhongVeAction(objectDatVe.maLichChieu))
            }

        } catch (err) {
            console.log(err?.response)
            console.log(err?.response?.data)
            alertThatBaiAction("Dặt vé", err?.response?.data)
        }
    }
}

export const taoLichChieuAction = (objectLichChieu) => {
    return async (dispatch) => {
        let accessToken = localStorage.getItem(ACCESS_TOKEN)
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyDatVe/TaoLichChieu`,
                method: "POST",
                data: objectLichChieu,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            if(result.status === STATUS_CODE.SUCCESS){
                alertThanhCongAction("Thêm lịch chiếu")
            }


        } catch (err) {
                alertThatBaiAction("Thêm lịch chiếu", `${err.response?.data}`)
            // console.log(err.response?.data)
        }
    }
}