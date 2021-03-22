import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChiTietPhimItem from '../../Components/ChiTietPhimItem/ChiTietPhimItem'
import Loading from '../../Components/Loading/Loading'
import PopupComment from '../../Components/PopupComent/PopupComment'
import { layThongTinLichChieuChiTietPhimAction } from '../../Redux/action/QuanLyPhimAction'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../Redux/type/TypeLoading'
import BoxChiTietPhim from './BoxChiTietPhim/BoxChiTietPhim';
import './ChiTietPhim.scss'

export default function ChiTietPhim(props) {

    // console.log('props', props)
    const maPhim = props.match.params.maPhim

    // Liên kết lên store lấy dữ liệu về sau khi gọi API thành công
    const thongTinPhim = useSelector(state => state.QuanLyPhimReducer.thongTinLichChieuChiTietPhim)

    // console.log('thongTinChiTietPhim', thongTinPhim)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinLichChieuChiTietPhimAction(maPhim)) 
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
        <div className="myFilmDetail">
            <PopupComment></PopupComment>
            <ChiTietPhimItem thongTinPhim={thongTinPhim} ></ChiTietPhimItem>
            <BoxChiTietPhim thongTinPhim={thongTinPhim}></BoxChiTietPhim>
        </div>
    )
}
