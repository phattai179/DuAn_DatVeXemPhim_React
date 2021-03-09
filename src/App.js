import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import ChiTietPhim from './Page/TrangChiTietPhim/ChiTietPhim';
import TrangChu from './Page/TrangChu/TrangChu';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import BoxBooking from './Components/BoxBooking/BoxBooking';
import TrangDangKy from './Page/TrangDangKy/TrangDangKy';
import TrangDangNhap from './Page/TrangDangNhap/TrangDangNhap';

import {createBrowserHistory} from 'history'
import { USER_DANG_NHAP } from './utils/setting';
import { LAY_USER_DANG_NHAP } from './Redux/type/TypeQuanLyUser';
import TrangDatVe from './Page/TrangDatVe/TrangDatVe';

export const history = createBrowserHistory()

function App() {

  const dispatch = useDispatch()

  let usDangNhap = useSelector(state => state.QuanLyUserReducer.userDangNhap)

  useEffect(() => {
    checkLocalStorage()
  },[])

  const checkLocalStorage = () => {
    let userDangNhap = localStorage.getItem(USER_DANG_NHAP)

    if(userDangNhap){

      dispatch({
        type: LAY_USER_DANG_NHAP,
        data: JSON.parse(userDangNhap)
      })
    }

  }

  return (
    <Router history = {history}>
      <Switch>
        <Route exact path="/chitietphim/:maPhim" render={(propsRoute) => {
          return <div>
            <Header></Header>
            <ChiTietPhim {...propsRoute}></ChiTietPhim>
            <Footer></Footer>
          </div>
        }}></Route>
        <Route path="/dangky" render={(propsRoute) => {
          return <div>
            <Header></Header>
            <TrangDangKy {...propsRoute}></TrangDangKy>
            <Footer></Footer>
          </div>
        }}>
        </Route>

        <Route path="/dangnhap" render={(propsRoute) => {
          return <div>
            <Header></Header>
            <TrangDangNhap {...propsRoute}></TrangDangNhap>
            <Footer></Footer>
          </div>
        }}>
        </Route>

        <Route path="/datve/:maLichChieu" component={TrangDatVe}>

        </Route>


        <Route path="/" component={TrangChu}></Route>
      </Switch>
      {/* <TrangChu></TrangChu> */}
    </Router>

  );
}

export default App;
