import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinCumRapTheoHeThongAction, layThongTinHeThongRapAction, layThongTinLichChieuTheoCumRapAction } from '../../../Redux/action/QuanLyPhimAction'
import { LAY_MA_CUM_RAP, SET_TEN_HE_THONG_RAP } from '../../../Redux/type/TypeQuanLyPhim'
import './BoxHeThongRap.scss'

export default function BoxHeThongRap() {

    // Lấy danh sách hệ thống rạp từ store xuống
    let heThongRap = useSelector(state => state.QuanLyPhimReducer.heThongRap)

    // console.log('heThongRap', heThongRap)

    const dispatch = useDispatch()

    // Tạo state active 
    let [active, setActive] = useState({
        status: false,
        number: 0
    })


    // Dùng useEffect thay thế cho lifecycle(didmount, didUpdate, willUnmount)
    useEffect(() => {
        // Gọi đến file action layThongTinHeThongRap
        dispatch(layThongTinHeThongRapAction())
    }, [])

    // render logo hệ thống rạp
    let renderHeThongRap = () => {
        return heThongRap?.map((item, index) => {

            // Tạo biến và xử lý logic hiển thị active
            let activeClass = "";
            if ((index === 0 && !active.status) || active && active.number === index) {
                activeClass = "active"
            }

            // Tạo biến cumRapDemo là cumRap ở vị trí đầu tiên. Tự xét cứng
            let maCumRapDemo = ""
            switch (item.maHeThongRap) {
                case "BHDStar":
                    maCumRapDemo = "bhd-star-cineplex-3-2";
                    break;
                case "CGV":
                    maCumRapDemo = "cgv-aeon-binh-tan";
                    break;
                case "CineStar":
                    maCumRapDemo = "cns-hai-ba-trung";
                    break;
                case "Galaxy":
                    maCumRapDemo = "glx-kinh-duong-vuong";
                    break;
                case "LotteCinima":
                    maCumRapDemo = "lotte-cantavil";
                    break;
                case "MegaGS":
                    maCumRapDemo = "megags-cao-thang";
                    break;
                default:
                    break;
            }
            return (
                <div key={index} className="text-center myBoxHeThongRap_content col-4 col-md-2 col-lg-12 p-0">
                    {/* khi onlick gọi dispatch Api lấy ds cum rap và lưu lên store */}
                    <a className={`${activeClass}`} onClick={() => {
                        dispatch(layThongTinCumRapTheoHeThongAction(item.maHeThongRap));
                        dispatch(layThongTinLichChieuTheoCumRapAction(item.maHeThongRap, maCumRapDemo))
                        setActive({
                            status: true,
                            number: index
                        })
                    }}>
                        <img src={item.logo}></img>
                    </a>
                </div>
            )
        })
    }

    return (
        <div className="myBoxHeThongRap row m-0">
                {renderHeThongRap()}
        </div>
    )
}
