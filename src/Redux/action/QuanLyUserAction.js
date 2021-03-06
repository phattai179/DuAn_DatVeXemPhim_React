import Axios from 'axios'
import { DOMAIN, STATUS_CODE } from '../../utils/setting'
import { alertThanhCongAction, alertThatBaiAction } from './QuanLyModalAlert'

export const dangKyAction = (userDangKy) => {
    return async (dispatch) => {
        try{
            let result = await Axios({
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangKy`,
                method: "POST",
                data: userDangKy
            })

            console.log('result', result)

            if(result.status === STATUS_CODE.SUCCESS){
                console.log('userDangKy', result.data)
                alertThanhCongAction("Đăng ký")
            }

        }catch(err){
            console.log(err.response)
            console.log(err.response?.data)
            alertThatBaiAction("Đăng ký", err.response?.data)
        }
    }
}