import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_COMMENT_MODAL } from '../../Redux/type/TypePopupModal'
import './PopupComment.scss'

export default function PopupComment() {


    let [commentNguoiDung, setCommentNguoiDung] = useState({
        name: "Hatake Kakashi",
        content: "",
        diem: 0,
        like: 0,
        avatar: "/img/avatar_img.png",
    })

    const dispatch = useDispatch()

    let handChangeInput = (e) => {
        let { value, name } = e.target;

        setCommentNguoiDung({
            ...commentNguoiDung,
            [name]: value
        })

        console.log('commentNguoiDung', commentNguoiDung)
    }

    const closeComment = () => {
        document.getElementById("formChecked").reset()
        setCommentNguoiDung({
            ...commentNguoiDung,
            diem: 0,
            content: ""
        })

    }

    const handleAddComment = (e) => {
        e.preventDefault() // Chặn browser reload

        if (commentNguoiDung.content === "" || commentNguoiDung.diem === 0) {
            alert('Bạn chưa đánh giá điểm và nội dung')
            return ""
        }

        let userComment = commentNguoiDung

        dispatch({
            type: ADD_COMMENT_MODAL,
            dataComment: userComment
        })

        
        
        closeComment()
        
    }

    return (
        <div className="myModal">
            {/* Button trigger modal */}
            {/* Modal */}
            <div className="modal fade" id="modalComment" tabIndex={-1} aria-labelledby="modalCommentLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modalComment_rate">
                                <h3 className="text-center">{commentNguoiDung.diem}</h3>
                                <form id="formChecked" className="modalComment_rating">
                                    <input type="radio" id="star10" name="rating" value="10" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 10
                                        })
                                    }} htmlFor="star10" className="px-2">
                                        <i className="fa fa-star"></i>
                                    </label>

                                    <input type="radio" id="star9" name="rating" value="9" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 9
                                        })
                                    }} htmlFor="star9" className="half" >
                                        <i className="fa fa-star-half"></i>
                                    </label>

                                    <input type="radio" id="star8" name="rating" value="8" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 8
                                        })
                                    }} htmlFor="star8" className="px-2">
                                        <i className="fa fa-star"></i>
                                    </label>

                                    <input type="radio" id="star7" name="rating" value="7" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 7
                                        })
                                    }} htmlFor="star7" className="half" >
                                        <i className="fa fa-star-half"></i>
                                    </label>

                                    <input type="radio" id="star6" name="rating" value="6" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 6
                                        })
                                    }} htmlFor="star6" className="px-2">
                                        <i className="fa fa-star"></i>
                                    </label>

                                    <input type="radio" id="star5" name="rating" value="5"></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 5
                                        })
                                    }} htmlFor="star5" className="half" >
                                        <i className="fa fa-star-half"></i>
                                    </label>

                                    <input type="radio" id="star4" name="rating" value="4" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 4
                                        })
                                    }} htmlFor="star4" className="px-2">
                                        <i className="fa fa-star"></i>
                                    </label>

                                    <input type="radio" id="star3" name="rating" value="3" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 3
                                        })
                                    }} htmlFor="star3" className="half" >
                                        <i className="fa fa-star-half"></i>
                                    </label>

                                    <input type="radio" id="star2" name="rating" value="2"  ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 2
                                        })
                                    }} htmlFor="star2" className="px-2">
                                        <i className="fa fa-star"></i>
                                    </label>

                                    <input type="radio" id="star1" name="rating" value="1" ></input>
                                    <label onClick={() => {
                                        setCommentNguoiDung({
                                            ...commentNguoiDung,
                                            diem: 1
                                        })
                                    }} htmlFor="star1" className="half" >
                                        <i className="fa fa-star-half"></i>
                                    </label>

                                </form>

                            </div>

                            <button onClick={closeComment} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <textarea placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này" className="form-control" name="content" rows="5" onChange={handChangeInput} value={commentNguoiDung.content} ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleAddComment} onLoad={closeComment} type="submit" className="btn" data-dismiss="modal">Đăng</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}
