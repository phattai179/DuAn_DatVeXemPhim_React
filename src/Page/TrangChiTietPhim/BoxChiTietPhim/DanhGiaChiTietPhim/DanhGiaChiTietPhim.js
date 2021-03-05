import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopupComment from '../../../../Components/PopupComent/PopupComment'
import { ADD_LIKE_COMMENT_MODAL } from '../../../../Redux/type/TypePopupModal'
import './DanhGiaChiTietPhim.scss'

export default function DanhGiaChiTietPhim() {

    const mangDanhGia = useSelector(state => state.QuanLyDanhGiaReducer.mangDanhGia)

    console.log('mangDanhGia', mangDanhGia)

    const dispatch = useDispatch()

    const renderIconStar = (number, indexHalf) => {
        let n = parseInt(number)
        // console.log('n', n)

        let iconStar = <i className="fa fa-star"></i>
        let iconHalfStar = <i className="fa fa-star-half-alt"></i>

        let mangIcon = []
        for (let i = 0; i < n; i++) {
            if (i === n - 1 && indexHalf === 1) {
                mangIcon.push(iconHalfStar)
            } else {
                mangIcon.push(iconStar)
            }
        }
        // console.log('mangIcon', mangIcon)
        return mangIcon.map((item, index) => {
            return (
                <Fragment key={index}>
                    {item}
                </Fragment>

            )
        })
    }

    const renderMangDanhGia = () => {
        return mangDanhGia?.map((item, index) => {
            let n = item.diem / 2
            return (
                <div className="commentChiTietPhim_item mb-3" key={index}>
                    <div className="commentChiTietPhim_itemHeader">
                        <img src={item.avatar}></img>
                        <span>{item.name}</span>
                        <div className="commentChiTietPhim_danhGia">
                            <h4>{item.diem}</h4>
                            <p>
                                {n === parseInt(n) ? renderIconStar(parseInt(n), 0) : renderIconStar(parseInt(n + 1), 1)}
                            </p>
                        </div>

                    </div>
                    <p className="commentChiTietPhim_content">
                        {item.content}
                    </p>
                    <div className="commentChiTietPhim_footer">
                        <i onClick={() => {
                            dispatch({
                                type: ADD_LIKE_COMMENT_MODAL,
                                nameUser: item.name
                            })
                        }} className="fa fa-thumbs-up"></i>
                        <span >{item.like} Thích</span>
                    </div>

                </div>
            )
        })
    }

    return (
        <div className="commentChiTietPhim">
            <div className="commentChiTietPhim_input d-flex" data-toggle="modal" data-target="#modalComment">
                <img src="/img/avatar_img.png"></img>
                <span>Bạn nghĩ gì về phim này ?</span>
                <div>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
            </div>
            <div className="commentChiTietPhim_list my-5">
                {renderMangDanhGia()}
            </div>
        </div>

    )
}
