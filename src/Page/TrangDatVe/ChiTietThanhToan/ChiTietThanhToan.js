import React from 'react'
import './ChiTietThanhToan.scss'

export default function ChiTietThanhToan() {
    return (
        <div className="booking_payment">
            <p className="total_payment">76.000</p>
            <p className="nameFilm">
                Thanh Gương Diệt Quỷ
            </p>
            <div className="payment_detail">
                <p>Ngày chiếu giờ chiếu</p>
                <p>05/02/2020 - 04:01</p>
            </div>
            <div className="payment_detail">
                <p>Rạp</p>
                <p>Rạp 1</p>
            </div>
            <div className="payment_detail">
                <p>
                    Ghế:
                        <span className="ml-2">A1,</span>
                    <span className="ml-2">A2,</span>
                    <span className="ml-2">A3,</span>
                </p>
                <span>0d</span>
            </div>
            <div className="payment_detail">
                <p>Chọn combo</p>
                <p>46.000</p>
            </div>
            <div className="method_payment text-left">
                <div className="method_detail">
                    <input type="radio" name="payment" value="ATM" id="ATM"></input>
                    <img src="/img/ATMNoiDia.png"></img>
                    <label htmlFor="ATM">Thẻ ATM nội địa</label>
                </div>

                <div className="method_detail my-2">
                    <input type="radio" name="payment" value="visa" id="visa"></input>
                    <img src="/img/visa.png"></img>
                    <label htmlFor="visa">Thẻ Visa, Master, JCB</label>
                </div>


                <div className="method_detail">
                    <input type="radio" name="payment" value="tienmat" id="tiemmat"></input>
                    <img src="/img/tienmat.png"></img>
                    <label htmlFor="tienmat">Thanh toán tiền mặt</label>
                </div>


            </div>
            <button className="btn btn-success btn-payment">
                THANH TOÁN
            </button>
        </div>
    )
}
