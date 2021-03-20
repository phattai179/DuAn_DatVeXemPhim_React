import React from 'react'
import './ThongTinDatVe.scss'
import moment from 'moment'

export default function ThongTinDatVe(props) {

    let thongTinCaNhan = props.thongTinCaNhan

    const renderBookingHistory = () => {
        return thongTinCaNhan?.thongTinDatVe.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.tenPhim}</td>
                    <td>{moment(item.ngayDat).format("DD/MM/yyyy ~ hh:mmA")}</td>
                    <td>{item.maVe}</td>
                    <td>
                        {item.danhSachGhe.map((ghe, index) => {
                            return <span key={index}>
                                {ghe.tenGhe}
                                {index === item.danhSachGhe.length - 1 ? " " : ", "} 
                            </span>
                        })}
                    </td>
                    <td>{(item.giaVe * item.danhSachGhe.length).toLocaleString() + " vnd"}</td>
                </tr>
            )
        })
    }

    return (
        <div className="historyBooking px-4 pb-5">
            <h3 className="text-center my-4">Lịch sử đặt vé</h3>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <td>Tên phim</td>
                        <td>Ngày đặt</td>
                        <td>Mã Vé</td>
                        <td>Số ghế</td>
                        <td>Giá vé</td>
                    </tr>
                </thead>
                <tbody className="table-striped">
                    {/* <tr>
                        <td>Aronman</td>
                        <td>23/12/2020</td>
                        <td>44435</td>
                        <td>1 2</td>
                        <td>75000</td>
                    </tr> */}
                    {renderBookingHistory()}
                </tbody>
            </table>

        </div>
    )
}
