import React from 'react'
import './BoxBooking.scss'
import BoxCumRap from './BoxCumRap/BoxCumRap'
import BoxHeThongRap from './BoxHeThongRap/BoxHeThongRap'
import BoxLichChieuCumRap from './BoxLichChieuCumRap/BoxLichChieuCumRap'

export default function BoxBooking() {
    return (
        <div className="myBoxBooking">
            <div className="container">
                <div className="row">
                    <div className="col-1 p-0" >
                        <BoxHeThongRap></BoxHeThongRap>
                    </div>
                    <div className="col-4 p-0" >
                        <BoxCumRap></BoxCumRap>
                    </div>
                    <div className="col-7 p-0" >
                        <BoxLichChieuCumRap></BoxLichChieuCumRap>
                    </div>
                </div>
            </div>
        </div>
    )
}
