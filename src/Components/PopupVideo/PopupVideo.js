import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import '../../scss/main.scss'
import './PopupVideo'
import { CLOSE_MODAL_VIDEO } from '../../Redux/type/TypePopupModal';

export default function PopupVideo(props) {

    // Tạo các biến để lấy dữ liệu từ ModalStore
    // Set tắt mở popup
    const trailer = useSelector(state => state.QuanLyModalReducer.trailer)
    const isOpenModal = useSelector(state => state.QuanLyModalReducer.isOpenModal)

    // Tạo dispatch để liên gọi hàm thực thi trên store
    const dispatch = useDispatch()


    return (
        <div className="myPopupVideo">
            <ModalVideo channel="youtube" autoplay isOpen={isOpenModal} videoId={trailer} onClose={() =>
                dispatch({
                    type: CLOSE_MODAL_VIDEO
                })

            }></ModalVideo>

        </div>
    )
}
