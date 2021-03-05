import React from 'react'
import BoxBooking from '../../Components/BoxBooking/BoxBooking'
import Carousel from '../../Components/Carousel/Carousel'
import DanhSachPhim from '../../Components/DanhSachPhim/DanhSachPhim'
import DropdownDatVe from '../../Components/DropdownDatVe/DropdownDatVe'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import UngDung from '../../Components/UngDung/UngDung'

export default function TrangChu() {
    return (
        <div>
            <Header></Header>
            <Carousel></Carousel>
            <DropdownDatVe></DropdownDatVe>
            <DanhSachPhim></DanhSachPhim>
            <UngDung></UngDung>
            <BoxBooking></BoxBooking>
            <Footer></Footer>
        </div>
    )
}
