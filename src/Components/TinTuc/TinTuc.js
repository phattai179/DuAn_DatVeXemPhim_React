import React, { useEffect, useState } from 'react'
import './TinTuc.scss'

export default function TinTuc() {

    let [obWindow, setObWindow] = useState({
        innerWidth: window.innerWidth,
    })


    let {innerWidth} = obWindow

    useEffect(() => {
        window.onresize = () => {
            let newWidth = window.innerWidth

            setObWindow({
                innerWidth: newWidth
            })
        }
    })

    let mangTinTuc = [
        {
            id: 1,
            danhSachTinTuc: [
                {
                    img: "/img/tintuc2.png",
                    title: 'Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất',
                    text: 'Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ'
                },
                {
                    img: `/img/tintuc3.png`,
                    title: 'MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] -  GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI TIẾNG ĐƯỢC CHUYỂN THỂ TỪ CÁC TỰA GAME ĐÌNH ĐÁM',
                    text: 'Bên cạnh những kịch bản gốc mới mẻ và đầy bất ngờ, Hollywood cũng không thiếu những tác phẩm đình đám được chuyển thể từ tiểu thuyết, phim hoạt hình, hay thậm chí là cả trò chơi điện tử.'
                },
                {
                    img: `/img/tintuc4.png`,
                    title: 'PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù đàn ông để đời',
                    text: 'Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim'
                },
                {
                    img: `/img/tintuc5.png`,
                    title: 'VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ” ĐẢM BẢO ĐỐN TIM HỘI CHỊ EM',
                    text: 'Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành'
                },
            ]
        }
    ]

    let mangTinTucMin = [
        {
            img: `/img/tintuc6.jpg`,
            title: 'Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn',
            text: ''
        },
        {
            img: `/img/tintuc7.png`,
            title: 'Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành',
            text: ''
        },
        {
            img: `/img/tintuc8.png`,
            title: 'Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công chiếu ',
            text: ''
        },
        {
            img: `/img/tintuc9.jpg`,
            title: 'NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ TRANG PHỤC CHO SIÊU ANH HÙNG ĐẦU TIÊN CỦA VIỆT NAM – VINAMAN',
            text: ''
        },
    ]

    const renderTinTuc = () => {
        return mangTinTuc.map((item, index) => {
            return item.danhSachTinTuc.map((tintuc, index) => {
                if (index === 0 || index === 1) {
                    return <div className=" col-12 col-sm-6 tinTuc_item" key={index}>
                        <img src={tintuc.img} className="imgTinTuc" style={{ width: "100%", height: "250px" }}></img>

                        <h4 className="tinTuc_title">{tintuc.title.length > 80 ? tintuc.title.substr(0, 80) + "..." : tintuc.title}</h4>

                        <p className="tinTuc_text" >{tintuc.text.length > 120 ? tintuc.text.substr(0, 120) + "..." : tintuc.text}</p>
                    </div>
                }
                else if (index === 2 || index === 3) {
                    return <div className="col-12 col-sm-4 tinTuc_item" key={index}>
                        <img src={tintuc.img} className="imgTinTuc" style={{ width: "100%", height: "140px" }}></img>

                        <h4 className="tinTuc_title">{tintuc.title.length > 50 ? tintuc.title.substr(0, 50) + "..." : tintuc.title}</h4>

                        <p className="tinTuc_text" >{tintuc.text.length > 80 ? tintuc.text.substr(0, 80) + "..." : tintuc.text}</p>
                    </div>
                }
            })
        })
    }

    let renderTinTucMin = () => {
        return mangTinTucMin.map((tintuc, index) => {
            return <div className="tinTuc_item d-flex mb-3" key={index}>
                <img src={tintuc.img}  style={{ width: "50px", height: "50px", marginRight: "15px"}}></img>

                {innerWidth > "576" ? 
                <h4 className="tinTuc_title my-0" style={{color: "#737576", fontSize: "15px"}} >{tintuc.title.length > 50 ? tintuc.title.substr(0, 50) + "..." : tintuc.title}</h4>
                : 
                <h4 className="tinTuc_title my-0" style={{color: "#737576", fontSize: "15px"}} >{tintuc.title}</h4>
                }
                
            </div>
        })
    }


    return (
        <div className="myTinTuc" id="tinTuc">
            <div className="bgTinTuc">

            </div>
            <div className="container">
                <h3 className="text-center mt-3 mb-4" style={{ color: "#fb4226" }}>TIN TỨC</h3>
                <div className="row">
                    {renderTinTuc()}
                    <div className="col-12 col-sm-4">
                        {renderTinTucMin()}
                    </div>

                </div>
            </div>
        </div>
    )
}
