import Swal from 'sweetalert2'

export const alertThanhCongAction = (title) => {
    Swal.fire({
        icon: 'success',
        title: `${title} thành công`
        }
    )
}

export const alertThatBaiAction = (title, textThatBai) => {
    Swal.fire({
        icon: 'error',
        title: `${title} thất bại`,
        text: textThatBai
    })
}