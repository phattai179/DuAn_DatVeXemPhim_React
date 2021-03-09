import Swal from 'sweetalert2'
import {history} from '../../App.js'

export const alertThanhCongAction = (title) => {
    Swal.fire({
        icon: 'success',
        title: `${title} thành công`
        }
    ).then(() => {
        if(title === "Đăng ký"){
            history.push('/dangnhap')
        }else if (title === "Đăng nhập"){
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