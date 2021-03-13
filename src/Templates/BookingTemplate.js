import { Route, Redirect } from 'react-router-dom'
import { alertCanhBaoDangNhap } from '../Redux/action/QuanLyModalAlert'
import { USER_DANG_NHAP } from '../utils/setting'

export const BookingTemplate = (props) => {

    if (localStorage.getItem(USER_DANG_NHAP)) {
        return <Route path={props.path} exact render={(propsRouter) => {
            return <props.Component {...propsRouter} />
        }} >

        </Route>
    } else {
        alertCanhBaoDangNhap()
        return <Redirect to='/dangnhap' />
    }

}
