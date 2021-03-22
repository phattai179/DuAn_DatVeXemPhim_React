import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../Components/Loading/Loading'
import { layThongTinCaNhanAction } from '../../Redux/action/QuanLyUserAction'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../Redux/type/TypeLoading'
import './ThongTinCaNhan.scss'
import ThongTinDatVe from './ThongTinDatVe/ThongTinDatVe'
import ThongTinTaiKhoan from './ThongTinTaiKhoan/ThongTinTaiKhoan'

export default function ThongTinCaNhan() {

    let [component, setComponent] = useState({
        name: "user",
    })

    let activeUser = component.name === "user" ? "active" : ""
    let activeBooking = component.name === "booking" ? "active" : ""

    // Xử lý gọi api lấy thông tin cá nhân
    const dispatch = useDispatch()

    let thongTinCaNhan = useSelector(state => state.QuanLyUserReducer.thongTinCaNhan)

    // console.log('thongTinTaiKhoan', thongTinCaNhan)

    useEffect(() => {
        dispatch(layThongTinCaNhanAction())
        renderLoading()
    }, [])

    let renderLoading = () => {
        dispatch({
            type: DISPLAY_LOADING
        })

        setTimeout(() => {
            dispatch({
                type: HIDE_LOADING
            })
        }, 2000)
    }

    return (
        <div>
            <Loading />
            <div className="thongTinCaNhan">
                <div className="myThongTin container">
                    <div className="thongTin_box">
                        <div className="box_header">
                            <a className={`${activeUser}`} onClick={() => {
                                setComponent({ name: "user" })
                            }
                            }>THÔNG TIN CÁ NHÂN</a>
                            <a className={`${activeBooking}`} onClick={() => {
                                setComponent({ name: "booking" })
                            }
                            } >LỊCH SỬ ĐẶT VÉ</a>
                        </div>
                        <div className="box_body">
                            {component.name === "user" ?
                                <ThongTinTaiKhoan thongTinCaNhan={thongTinCaNhan}></ThongTinTaiKhoan>
                                :
                                <ThongTinDatVe thongTinCaNhan={thongTinCaNhan}></ThongTinDatVe>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}
