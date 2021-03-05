import React from 'react'
import './ThongTinChiTietPhim.scss'
import moment from 'moment'

export default function ThongTinChiTietPhim(props) {

    let { thongTinPhim } = props

    console.log('thongTin', thongTinPhim)

    return (
        <div className="container thongTinPhim">
            <div className="row">
                <div className="col-12 col-md-6 thongTinPhim_list">
                    <div className="thongTinPhim_detail">
                        <p>Ngày công chiếu</p>
                        <p>{thongTinPhim?.ngayKhoiChieu}</p>
                    </div>

                    <div className="thongTinPhim_detail">
                        <p>Đạo diễn</p>
                        <p>....................</p>
                    </div>

                    <div className="thongTinPhim_detail">
                        <p>Diễn viên</p>
                        <p>....................</p>
                    </div>

                    <div className="thongTinPhim_detail">
                        <p>Thể loại</p>
                        <p>Hành Động, Phiêu Lưu, Hài Hước</p>
                    </div>

                    <div className="thongTinPhim_detail">
                        <p>Định dạng</p>
                        <p>2D/Digital</p>
                    </div>

                    <div className="thongTinPhim_detail">
                        <p>Quốc Gia SX</p>
                        <p>Mỹ, Việt Nam</p>
                    </div>

                </div>

                <div className="col-12 col-md-6 thongTinPhim_content">
                    <p>Nội dung</p>
                    <p>{thongTinPhim?.moTa}</p>
                </div>
            </div>
        </div>
    )
}
