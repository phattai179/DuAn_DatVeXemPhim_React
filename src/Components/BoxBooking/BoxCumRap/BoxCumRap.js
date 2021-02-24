import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinCumRapTheoHeThongAction } from '../../../Redux/action/QuanLyPhimAction'
import { LAY_MA_CUM_RAP } from '../../../Redux/type/TypeQuanLyPhim'
import './BoxCumRap.scss'

export default function BoxCumRap() {

    // Liên kết lên store lấy ds CumRap để render
    let dsCumRap = useSelector(state => state.QuanLyPhimReducer.dsCumRap)
    // console.log('cumRap', dsCumRap)

    // Lấy mã hệ thống rạp trên store
    let maHeThongRap = useSelector(state => state.QuanLyPhimReducer.maHeThongRap)
    

    // Dùng useState để xét active class
    let [active, setActive] = useState({
        status: false,
    })

    // Dùng useState để lấy numberActiveCumRap trên store
    let numberActive = useSelector(state => state.QuanLyPhimReducer.numberActiveCumRap);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layThongTinCumRapTheoHeThongAction("BHDStar"))
    }, [])
    let renderDanhSachCumRap = () => {
        return dsCumRap?.map((item, index) => {
            
            let activeClass = ""
            if((index === 0 && !active.status) || (numberActive === index && active.status)){
                activeClass = "active"
            }
            
            let numTrimTenHeThongRap = ""
            let corlorTenHeThongRap = ""

            switch (maHeThongRap) {
                case "BHDStar":
                    numTrimTenHeThongRap = 17;
                    corlorTenHeThongRap = "#8bc541"
                    break;
                case "CGV":
                    numTrimTenHeThongRap = 3;
                    corlorTenHeThongRap = "#ee2d24"
                    break;
                case "CineStar":
                    numTrimTenHeThongRap = 3;
                    corlorTenHeThongRap = "#3372e2"
                    break;
                case "Galaxy":
                    numTrimTenHeThongRap = 3;
                    corlorTenHeThongRap = "#ff8600"
                    break;
                case "LotteCinima":
                    numTrimTenHeThongRap = 5;
                    corlorTenHeThongRap = "#ec2a5a"
                    break;
                case "MegaGS":
                    numTrimTenHeThongRap = 6;
                    corlorTenHeThongRap = "#ebbb1f"
                    break;
                default:
                    break;
            }


            return (
                <div onClick={()=> {
                    setActive({
                        status: true,
                    })
                    dispatch({
                        type: "SET_NUM_ACTIVE",
                        dataNumActive: index
                    })
                    // Có vấn đề
                    dispatch({
                        type: LAY_MA_CUM_RAP,
                        dataMaCumRap: item.maCumRap
                    })   
                }}

                className={`d-flex myBoxCumRap_item ${activeClass}`} key={index}>
                    <img src="./img/example_cumrap.jpg"></img>
                    <div className="myBoxCumRap_intro">
                        <p className="m-0">
                            <span style={{color: corlorTenHeThongRap}}>{item.tenCumRap.substr(0,numTrimTenHeThongRap)}
                            </span>
                            {item.tenCumRap.substr(numTrimTenHeThongRap)}
                        </p>
                        <p className="m-0">{item.diaChi.length > 45 ? item.diaChi.substr(0, 45) + "..." : item.diaChi}</p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div id="myBoxCumRap">
            {renderDanhSachCumRap()}
        </div>
    )
}
