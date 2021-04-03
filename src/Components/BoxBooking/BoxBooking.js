import React from 'react'
import './BoxBooking.scss'
import BoxCumRap from './BoxCumRap/BoxCumRap'
import BoxHeThongRap from './BoxHeThongRap/BoxHeThongRap'
import BoxLichChieuCumRap from './BoxLichChieuCumRap/BoxLichChieuCumRap'

export default function BoxBooking() {
    return (
        <div className="myBoxBooking" id="cumRap">
            <div className="backgroupTopBoxBooking">

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-1 p-0" >
                        <BoxHeThongRap></BoxHeThongRap>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 p-0" >
                        <BoxCumRap></BoxCumRap>
                    </div>
                    <div className="col-12 col-md-7 col-lg-7 p-0" >
                        <BoxLichChieuCumRap></BoxLichChieuCumRap>
                    </div>
                </div>
            </div>
        </div>
    )
}
