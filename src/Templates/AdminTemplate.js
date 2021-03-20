import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { USER_DANG_NHAP } from '../utils/setting';
import { alertDangNhapQuanTriAction, alertThatBaiAction } from '../Redux/action/QuanLyModalAlert';
import { Container, Grid, Paper } from '@material-ui/core';
import Loading from '../Components/Loading/Loading';
import { DISPLAY_LOADING, HIDE_LOADING } from '../Redux/type/TypeLoading';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        overflow: "auto"
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column"
    },
}));

export default function AdminTemplate(props) {

    const taiKhoanDangNhap = useSelector( state => state.QuanLyUserReducer.userDangNhap)

    // console.log('userDangNhap', userDangNhap)

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Xử lý loading
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
        let userDangNhap = localStorage.getItem(USER_DANG_NHAP)
        let loaiNguoiDung = JSON.parse(userDangNhap)

        if (loaiNguoiDung.maLoaiNguoiDung === "QuanTri") {
            return (
                <Route path={props.path} exact render={(propsRoute) => {
                    return (
                        <div>
                            <Loading></Loading>
                            {renderLoading()}
                            <div className={classes.root} >
                                <CssBaseline />
                                <AppBar
                                    position="fixed"
                                    className={clsx(classes.appBar, {
                                        [classes.appBarShift]: open,
                                    })}
                                >
                                    <Toolbar>
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={handleDrawerOpen}
                                            edge="start"
                                            className={clsx(classes.menuButton, open && classes.hide)}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <div className="d-flex w-100" style={{justifyContent: "space-between"}}>
                                            <Typography variant="h6" noWrap>
                                                QUẢN TRỊ HỆ THỐNG
                                            </Typography>
                                            <div className="d-flex" style={{alignItems: "center"}}>
                                                <img src={"/img/avatar_example.png"} style={{width: "30px", height: "30px", borderRadius: "50%"}} ></img>
                                                <h6 className="ml-2 mb-0" >{taiKhoanDangNhap.taiKhoan}</h6>
                                            </div>
                                        </div>

                                    </Toolbar>
                                </AppBar>
                                <Drawer
                                    className={classes.drawer}
                                    variant="persistent"
                                    anchor="left"
                                    open={open}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >

                                    <div className={classes.drawerHeader} style={{ justifyContent: "space-between" }}>
                                        <Fragment>
                                            <Typography style={{ color: "#3f51b5", textAlign: "left", fontWeight: "600", fontSize: "20px", marginLeft: "5px" }}>CYBERSOFT</Typography>
                                        </Fragment>
                                        <IconButton onClick={handleDrawerClose} >
                                            {theme.direction === 'ltr' ?
                                                <ChevronLeftIcon />
                                                : <ChevronRightIcon />}
                                        </IconButton>

                                    </div>
                                    <Divider />
                                    <List>
                                        {['Quản lý phim', 'Quản lý người dùng'].map((text, index) => {
                                            let iconElement = ""
                                            let url = ""
                                            if (index === 0) {
                                                iconElement = <MovieIcon />
                                                url = "/admin/phim"
                                            } else if (index === 1) {
                                                iconElement = <PersonIcon />
                                                url = "/admin/nguoidung"
                                            }
                                            return <NavLink to={url} style={{ listStyle: "none", color: "black" }} activeStyle={{ color: "#3f51b5" }} key={index}>
                                                <ListItem button key={text}>
                                                    <ListItemIcon style={{ color: "unset" }}>
                                                        {iconElement}
                                                    </ListItemIcon>
                                                    <ListItemText primary={text} />
                                                </ListItem>
                                            </NavLink>
                                        })}
                                    </List>
                                    <Divider />
                                    <List>
                                        {['Quay lại trang chủ', 'Đăng xuất'].map((text, index) => {

                                            let url = index === 0 ? "/trangchu" : "/dangnhap"
                                            return <NavLink to={url} style={{ listStyle: "none", color: "black" }} activeStyle={{ color: "#3f51b5" }} key={index} >
                                                <ListItem button key={text}>
                                                    <ListItemIcon style={{ color: "unset" }}>
                                                        {index === 0 ? <HomeIcon /> : <PowerSettingsNewIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={text} />
                                                </ListItem>
                                            </NavLink>

                                        })}
                                    </List>
                                </Drawer>
                                <main
                                    className={clsx(classes.content, {
                                        [classes.contentShift]: open,
                                    })}

                                >
                                    <div className={classes.drawerHeader} />

                                    <Grid container spacing={3} >
                                        <Grid item xs={12}>
                                            <Paper className={classes.paper} >
                                                <props.Component {...propsRoute} ></props.Component>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                </main>
                            </div>
                        </div>
                    )
                }} ></Route>



            )
        } else {
            alertDangNhapQuanTriAction("Truy cập", "Bạn không phải là quản trị")
            return <Redirect to="/dangnhap" />

        }
    } else {
        alertDangNhapQuanTriAction("Truy cập", "Bạn chưa đăng nhập")
        return <Redirect to="/dangnhap" />
    }

}
