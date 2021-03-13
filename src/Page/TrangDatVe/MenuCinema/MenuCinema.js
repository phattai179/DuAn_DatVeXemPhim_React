import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './MenuCinema.scss'
export default function MenuCinema(props) {

    let activeMenu = useSelector(state => state.QuanLyMenuThucAnReducer.activeMenu)

    let bgMenu = activeMenu ? "rgba(0,0,0,0.6)" : "transparent"
    let indexActive = activeMenu ? "5" : "0"
    let positionCombo = activeMenu ? "positionCombo" : ""
    let activeVisible = activeMenu ? "visible" : "hidden"

    let mangDoAn = useSelector(state => state.QuanLyMenuThucAnReducer.mangDoAn)

    let mangDoUong = useSelector(state => state.QuanLyMenuThucAnReducer.mangDoUong)

    let tongGiaThucAn = useSelector(state => state.QuanLyMenuThucAnReducer.tongGiaThucAn)

    // console.log('tongGiaThucAn', tongGiaThucAn)



    const dispatch = useDispatch()


    const renderDoUong = () => {
        return mangDoUong.map((item, index) => {
            return (
                <div className="menuItem" key={index}>
                    <img src="/img/menuCinema.jpg"></img>
                    <div className="menuName">
                        <p>{item.ten}</p>
                        <p className="text-success">{item.gia.toLocaleString()} đ</p>
                    </div>
                    <div className="menuAmount">
                        <button onClick={() => {
                            dispatch({
                                type: "TANG_GIAM_SO_LUONG_DO_UONG",
                                tenSP: item.ten,
                                tangGiam: false
                            })
                        }} className="btn btnTangGiam">-</button>

                        <button className="btn btnHienThi">{item.soLuong}</button>

                        <button onClick={() => {
                            dispatch({
                                type: "TANG_GIAM_SO_LUONG_DO_UONG",
                                tenSP: item.ten,
                                tangGiam: true
                            })
                        }} className="btn btnTangGiam">+</button>
                    </div>
                </div>
            )
        })
    }

    const renderDoAn = () => {
        return mangDoAn.map((item, index) => {
            return (
                <div className="menuItem" key={index}>
                    <img src="/img/menuCinema.jpg"></img>
                    <div className="menuName">
                        <p>{item.ten}</p>
                        <p className="text-success">{item.gia.toLocaleString()} đ</p>
                    </div>
                    <div className="menuAmount">
                        <button onClick={() => {
                            dispatch({
                                type: "TANG_GIAM_SO_LUONG_DO_AN",
                                tenSP: item.ten,
                                tangGiam: false
                            })
                        }} className="btn btnTangGiam">-</button>

                        <button className="btn btnHienThi">{item.soLuong}</button>

                        <button onClick={() => {
                            dispatch({
                                type: "TANG_GIAM_SO_LUONG_DO_AN",
                                tenSP: item.ten,
                                tangGiam: true
                            })
                        }} className="btn btnTangGiam">+</button>
                    </div>
                </div>
            )
        })
    }



    return (
        <div className="menubg" style={{ backgroundColor: `${bgMenu}`, zIndex: `${indexActive}`, visibility: `${activeVisible}` }} >
            <img onClick={() => {
                dispatch({
                    type: "XET_ACTIVE_MENU",
                    statusActive: false
                })
            }} className="button_close" src='/img/button_close.png'></img>

            <div className={`menuCinema ${positionCombo}`}>

                <div className="menuTitle">
                    <h3>THỨC UỐNG</h3>
                    {renderDoUong()}
                </div>
                <div className="menuTitle">
                    <h3>THỨC ĂN</h3>
                    {renderDoAn()}
                </div>
            </div>

        </div>

    )
}
