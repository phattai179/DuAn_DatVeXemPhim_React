import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import ChiTietPhim from './Page/TrangChiTietPhim/ChiTietPhim';
import TrangChu from './Page/TrangChu/TrangChu';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import BoxBooking from './Components/BoxBooking/BoxBooking';
import TrangDangKy from './Page/TrangDangKy/TrangDangKy';
import TrangDangNhap from './Page/TrangDangNhap/TrangDangNhap';

import { createBrowserHistory } from 'history'
import { USER_DANG_NHAP } from './utils/setting';
import { LAY_USER_DANG_NHAP } from './Redux/type/TypeQuanLyUser';
import TrangDatVe from './Page/TrangDatVe/TrangDatVe';
import { BookingTemplate } from './Templates/BookingTemplate';
import AdminTemplate from './Templates/AdminTemplate';
import QuanLyNguoiDung from './Page/QuanLyNguoiDung/QuanLyNguoiDung';
import QuanLyPhim from './Page/QuanLyPhim/QuanLyPhim';
import ThongTinCaNhan from './Page/ThongTinCaNhan/ThongTinCaNhan';
import Loading from './Components/Loading/Loading';
import { DISPLAY_LOADING, HIDE_LOADING } from './Redux/type/TypeLoading';
import QuanLyLichChieu from './Page/QuanLyLichChieu/QuanLyLichChieu';

export const history = createBrowserHistory()

function App() {

  const dispatch = useDispatch()

  let usDangNhap = useSelector(state => state.QuanLyUserReducer.userDangNhap)

  useEffect(() => {
    checkLocalStorage()
  }, [])

  const checkLocalStorage = () => {
    let userDangNhap = localStorage.getItem(USER_DANG_NHAP)

    if (userDangNhap) {

      dispatch({
        type: LAY_USER_DANG_NHAP,
        data: JSON.parse(userDangNhap)
      })
    }

  }

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

  return (
    <Router history={history}>
      <Loading></Loading>
      {renderLoading()}
      <Switch>
        <Route exact path="/chitietphim/:maPhim" render={(propsRoute) => {
          return <div>
            <Loading></Loading>
            {renderLoading()}
            <Header></Header>
            <ChiTietPhim {...propsRoute}></ChiTietPhim>
            <Footer></Footer>
          </div>
        }}></Route>
        <Route path="/dangky" render={(propsRoute) => {
          return <div>
            <Loading></Loading>
            {renderLoading()}
            <Header></Header>
            <TrangDangKy {...propsRoute}></TrangDangKy>
            <Footer></Footer>
          </div>
        }}>
        </Route>

        <Route path="/dangnhap" render={(propsRoute) => {
          return <div>
            <Loading></Loading>
            {renderLoading()}
            <Header></Header>
            <TrangDangNhap {...propsRoute}></TrangDangNhap>
            <Footer></Footer>
          </div>
        }}>
        </Route>

        <Route path="/thongtin" render={(propsRoute) => {
          return <div>
            <Loading></Loading>
            {renderLoading()}
            <Header></Header>
            <ThongTinCaNhan {...propsRoute} ></ThongTinCaNhan>
            <Footer></Footer>
          </div>
        }} ></Route>

        <BookingTemplate path="/datve/:maLichChieu" Component={TrangDatVe}></BookingTemplate>
        
        <AdminTemplate path="/admin/nguoidung" Component={QuanLyNguoiDung}></AdminTemplate>
        <AdminTemplate path="/admin/phim" Component={QuanLyPhim}></AdminTemplate>
        <AdminTemplate path="/admin/lichchieu" Component={QuanLyLichChieu} ></AdminTemplate>

        <Route path="/trangchu" component={TrangChu}></Route>
        <Route path="/" component={TrangChu}></Route>
      </Switch>
      {/* <TrangChu></TrangChu> */}
    </Router>

  );
}

export default App;
