import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChiTietPhimItem from '../../Components/ChiTietPhimItem/ChiTietPhimItem'
import PopupComment from '../../Components/PopupComent/PopupComment'
import { layThongTinLichChieuChiTietPhimAction } from '../../Redux/action/QuanLyPhimAction'
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
    }, [])

    return (
        <div className="myFilmDetail">
            <PopupComment></PopupComment>
            <ChiTietPhimItem thongTinPhim={thongTinPhim} ></ChiTietPhimItem>
            <BoxChiTietPhim thongTinPhim={thongTinPhim}></BoxChiTietPhim>
        </div>
    )
}
