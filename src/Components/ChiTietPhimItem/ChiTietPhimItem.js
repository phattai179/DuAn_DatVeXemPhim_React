import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './ChiTietPhimItem.scss'

export default function ChiTietPhimItem() {
    return (
        <div className="chiTietPhimItem">
            <div className="chiTietPhimItem_content d-flex">
                <div className="chiTietPhimItem_intro">
                    <img src="https://picsum.photos/200/200"></img>
                    <div>
                        <p>19/02/2020</p>
                        <p>Tên Phim</p>
                        <p>Thời lượng</p>
                        <button className="btn btn-warning">Mua vé</button>
                    </div>
                </div>
                <div className="chiTietPhimItem_danhGia">
                    <img src="https://picsum.photos/100/100"></img>
                </div>
            </div>
        </div>
    )
}
