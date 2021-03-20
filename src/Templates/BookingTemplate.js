import {useDispatch} from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Loading from '../Components/Loading/Loading'
import { alertCanhBaoDangNhap } from '../Redux/action/QuanLyModalAlert'
import { DISPLAY_LOADING, HIDE_LOADING } from '../Redux/type/TypeLoading'
import { USER_DANG_NHAP } from '../utils/setting'

export const BookingTemplate = (props) => {

    const dispatch = useDispatch()

    let renderLoading = () => {
        dispatch({
          type: DISPLAY_LOADING
        })
    
        setTimeout(() => {
          dispatch({
            type: HIDE_LOADING
          })
        }, 2000)
      }


    if (localStorage.getItem(USER_DANG_NHAP)) {
        return <Route path={props.path} exact render={(propsRouter) => {
            return (
                <div>
                    <Loading></Loading>
                    {renderLoading()}
                    <props.Component {...propsRouter} />
                </div>
            )
        }} >

        </Route>
    } else {
        alertCanhBaoDangNhap()
        return <Redirect to='/dangnhap' />
    }

}
