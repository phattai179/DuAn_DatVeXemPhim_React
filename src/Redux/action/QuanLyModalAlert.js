import Swal from 'sweetalert2'
import { history } from '../../App.js'
import { Redirect } from 'react-router-dom'
import { DANG_XUAT } from '../type/TypeQuanLyUser.js'
import { ACCESS_TOKEN, USER_DANG_NHAP } from '../../utils/setting.js'


export const alertThanhCongAction = (title) => {
    Swal.fire({
        icon: 'success',
        title: `${title} thành công`
    }
    ).then(() => {
        if (title === "Đăng ký") {
            history.push('/dangnhap')
        } else if (title === "Đăng nhập") {
            history.push('/trangchu')
        }
    })

}

export const alertThatBaiAction = (title, textThatBai) => {
    Swal.fire({
        icon: 'error',
        title: `${title} thất bại`,
        text: textThatBai
    })
}

export const alertDangNhapQuanTriAction = (title, textThatBai) => {
    Swal.fire({
        icon: 'error',
        title: `${title} thất bại`,
        text: textThatBai
    })

}

export const alertCompletedTimeBooking = () => {
    Swal.fire({
        icon: 'error',
        title: `Hết thời gian đặt vé`,
        text: `Bạn có muốn đặt vé lại`,
        showDenyButton: true,
        confirmButtonText: 'Đồng ý',
        denyButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload()
        } else if (result.isDenied) {
            history.push('/trangchu')
        }
    })

}

export const alertCanhBaoDangNhap = () => {
    Swal.fire({
        icon: 'info',
        title: `ĐĂNG NHẬP`,
        text: 'Vui lòng đăng nhập đặt vé'
    })
}

export const alertDangXuat = () => {
    return (dispatch) => {
        Swal.fire({
            icon: "question",
            title: `Bạn có chắc chắn muốn đăng xuất`,
            showDenyButton: true,
            confirmButtonText: "Đồng ý",
            denyButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem(ACCESS_TOKEN)
                localStorage.removeItem(USER_DANG_NHAP)
                dispatch({
                    type: DANG_XUAT
                })
                history.push('/trangchu')
            }else{
                window.location.reload()
            }
        })
    }

}