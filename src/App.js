import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ChiTietPhim from './Page/TrangChiTietPhim/ChiTietPhim';
import TrangChu from './Page/TrangChu/TrangChu';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import BoxBooking from './Components/BoxBooking/BoxBooking';
import TrangDangKy from './Page/TrangDangKy/TrangDangKy';

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/" component={TrangChu}></Route>
      </Switch>
      {/* <TrangChu></TrangChu> */}
    </BrowserRouter>

  );
}

export default App;
