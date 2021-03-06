import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video'

import './Carousel.scss'
import { DOMAIN } from '../../utils/setting';
import { LAY_DANH_SACH_PHIM } from '../../Redux/type/TypeQuanLyPhim';
import { layDanhSachPhimAction } from '../../Redux/action/QuanLyPhimAction';


export default function Carousel(props) {

    // Tạo danh sách mảng phim
    const danhSachPhim = [
        { hinhAnh: './img/can-phong-ma-am-16115699578033.jpg', trailer: "kEgUgrh2rdA" },
        { hinhAnh: './img/di-nguyen-bi-an-16119103023007.png', trailer: "FMb0QPgAzBs" },
        { hinhAnh: './img/em-la-cua-em-16106818552756.jpg', trailer: "kEgUgrh2rdA" },
        { hinhAnh: './img/tho-san-quai-vat-16094165971645.jpg', trailer: "puQyZsaTtqY" },
        { hinhAnh: './img/lua-deu-gap-lua-dao-16105107337344.jpg', trailer: "NWEe2BGhOUA" },

    ]

    // Set tắt mở popup
    const [isOpen, setOpen] = useState(false)

    // Dùng useSelector để lấy mảng phim có được từ redux
    let mangPhim = useSelector(state => state.QuanLyPhimReducer.mangPhim)

    // console.log('mangPhim', mangPhim)

    // Dùng useDispatch để dicpatch lên reducer
    const dispatch = useDispatch()

    const loadDanhSachPhim = async () => {
        try {
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP07`,
                method: 'GET'
            })

            dispatch({
                type: LAY_DANH_SACH_PHIM,
                dataFilm: result
            })

        } catch (err) {
            console.log(err)
            console.log(err.response?.data)
        }

        // const promise = Axios({
        //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP07`,
        //     method: 'GET'
        // })

        // promise.then((res) => {
        //     console.log(res)
        // })

        // promise.catch((err) => {
        //     console.log(err)
        // })

    }

    // Dùng useEffect thay thê cho các lifecycle (didMount, disUpdate, willUnmount)
    useEffect(() => {
        // loadDanhSachPhim()
        dispatch(layDanhSachPhimAction())
    }, [])


    const renderPhimCarousel = () => {
        return danhSachPhim.map((phim, index) => {
            // console.log('phim', phim)

            let active = ''
            if (index === 0) {
                active = "active";
            }

            return <div className={`carousel-item ${active}`} key={index}
                style={{
                    backgroundImage: `url(${phim.hinhAnh})`,
                    
                }}>
                    
                <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId={phim.trailer} onClose={() => setOpen(false)}></ModalVideo>
                <button className="btn-play" onClick={() => {
                    setOpen(true)
                }} >
                    <i className="fa fa-play"></i>
                </button>
            </div>
        })
    }

    return (
        <div className="myCarousel">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active carousel_dot" />
                    <li className="carousel_dot" data-target="#carouselExampleIndicators" data-slide-to={1} />
                    <li className="carousel_dot" data-target="#carouselExampleIndicators" data-slide-to={2} />
                    <li className="carousel_dot" data-target="#carouselExampleIndicators" data-slide-to={3} />
                    <li className="carousel_dot" data-target="#carouselExampleIndicators" data-slide-to={4} />
                </ol>
                <div className="carousel-inner">
                    {renderPhimCarousel()}
                    
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="myCarouselOverlay">

            </div>

        </div>
    )
}
