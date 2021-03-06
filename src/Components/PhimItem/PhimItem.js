import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './PhimItem.scss'
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

import PopupVideo from '../PopupVideo/PopupVideo';
import { OPEN_MODAL_VIDEO } from '../../Redux/type/TypePopupModal';
import { NavLink } from 'react-router-dom';


export default function PhimItem(props) {

    const { itemPhim } = props
    const dispatch = useDispatch()

    // Lấy trailerPhim và cắt lại theo yêu cầu 
    // console.log(itemPhim.trailer)
    let trailerPhimItem = itemPhim.trailer.substr(30)
    // console.log('trailerPhim', trailerPhimItem)

    return (
        <div  className="myListFilm_item" >
            <div className="card m-3">
                <div className="card_header" >
                    <img className="card-img-top" src={itemPhim.hinhAnh} style={{ height: "330px", width: "100%" }} />
                    <div className="myListFilm_item_overlay" >
                        <button className="btn-play" onClick={() => {
                            dispatch({
                                type: OPEN_MODAL_VIDEO,
                                trailerFilm: trailerPhimItem

                            })
                        }} >
                            <i className="fa fa-play"></i>
                        </button>
                    </div>

                </div>
                <div className="card-body">
                    <div className="card-title pd-0">
                        <span>C16</span>
                        <p>{itemPhim.tenPhim}</p>
                    </div>
                </div>
                <div className="card-ratting" >
                    <p>10</p>
                    <span>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </span>
                </div>
                <NavLink to={`/chitietphim/${itemPhim.maPhim}`} className="card-button" >
                    <button >Mua Vé</button>
                </NavLink>

            </div>

        </div>
    )
}
