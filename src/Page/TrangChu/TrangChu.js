import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import BoxBooking from '../../Components/BoxBooking/BoxBooking'
import Carousel from '../../Components/Carousel/Carousel'
import DanhSachPhim from '../../Components/DanhSachPhim/DanhSachPhim'
import DropdownDatVe from '../../Components/DropdownDatVe/DropdownDatVe'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Loading from '../../Components/Loading/Loading'
import TinTuc from '../../Components/TinTuc/TinTuc'
import UngDung from '../../Components/UngDung/UngDung'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../Redux/type/TypeLoading'

export default function TrangChu() {

    const dispatch = useDispatch()


    useEffect(() => {
        renderLoading()
    },[])


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
            {/* <Loading/> */}
            <Header></Header>
            <Carousel></Carousel>
            <DropdownDatVe></DropdownDatVe>
            <DanhSachPhim></DanhSachPhim>
            <BoxBooking></BoxBooking>
            <TinTuc></TinTuc>
            <UngDung></UngDung>
            <Footer></Footer>
        </div>
    )
}
