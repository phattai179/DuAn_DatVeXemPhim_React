import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Button, TextField } from '@material-ui/core';
import { layDanhSachPhimAction, layThongTinCumRapTheoHeThongAction, layThongTinHeThongRapAction, taoLichChieuAction } from '../../Redux/action/QuanLyPhimAction';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: "50%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        width: "100%",
    },
}));

export default function QuanLyLichChieu() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        phim: "",
        maPhim: "",
        maHeThongRap: "",
        maCumRap: "",
        tenRap: "",
        maRap: "",
        ngayChieuGioChieu: "2021-02-05T10:30",
        giaVe: "",
        valid: false,
    });

    // console.log('state', state)

    const mangPhim = useSelector(state => state.QuanLyPhimReducer.mangPhim)
    // console.log('mangPhim', mangPhim)
    const heThongRap = useSelector(state => state.QuanLyPhimReducer.heThongRap)

    const dsCumRap = useSelector(state => state.QuanLyPhimReducer.dsCumRap)
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
        dispatch(layThongTinHeThongRapAction())

    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });

        if(name === "ngayChieuGioChieu"){
            setState({
                ...state,
                [name]: event.target.value,
                valid: true
            })
        }

    };

    // changeHeThongRap
    const handleChangeHeThongRap = (event) => {
        const name = event.target.name
        dispatch(layThongTinCumRapTheoHeThongAction(event.target.value))
        setState({
            ...state,
            [name]: event.target.value,
        });

    }



    // Render mảng phim
    const renderMangPhim = () => {
        return mangPhim?.map((phim, index) => {
            return (
                <option key={index} value={phim.maPhim}>{phim.tenPhim}</option>
            )
        })
    }

    // Render Hệ thống rạp
    const renderHeThongRap = () => {
        return heThongRap?.map((item, index) => {
            return (
                <option key={index} value={item.maHeThongRap}>{item.maHeThongRap}</option>
            )
        })
    }

    // Render Cụm rạp 

    const renderCumRap = () => {
        return dsCumRap?.map((item, index) => {
            return (
                <option key={index} value={item.maCumRap}>{item.maCumRap}</option>
            )
        })
    }

    // render tên rạp
    const renderTenRap = () => {

        let cumRapHienThi = dsCumRap?.find(cumRap => cumRap.maCumRap === state.maCumRap)
        return cumRapHienThi?.danhSachRap.map((rap, index) => {
            return (
                <option key={index} value={rap.maRap}>{rap.tenRap}</option>
            )
        })
    }

    // handleSubmit

    const handleSubmit = () => {

        let ngayChieuGioChieu = `${moment(state.ngayChieuGioChieu).format('DD/MM/yyyy HH:mm:ss')}`

        let objectLichChieu = {
            maPhim: state.maPhim,
            ngayChieuGioChieu,
            maRap: state.maRap,
            giaVe: state.giaVe,
        }

        console.log('objectLichChieu', objectLichChieu)
        dispatch(taoLichChieuAction(objectLichChieu))

    }

    return (
        <div>
            <h3>Thêm Lịch Chiếu</h3>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Chọn Phim</InputLabel>
                <Select
                    native
                    value={state.maPhim}
                    onChange={handleChange}
                    label="Chọn phim"
                    inputProps={{
                        name: 'maPhim',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {renderMangPhim()}
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Chọn hệ thống rạp</InputLabel>
                <Select
                    native
                    value={state.maHeThongRap}
                    onChange={handleChangeHeThongRap}
                    label="Chọn hệ thống rạp"
                    inputProps={{
                        name: 'maHeThongRap',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {renderHeThongRap()}
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Chọn cụm rạp</InputLabel>
                <Select
                    disabled={state.maHeThongRap === "" ? true : false}
                    native
                    value={state.maCumRap}
                    onChange={handleChange}
                    label="Chọn cụm rạp"
                    inputProps={{
                        name: 'maCumRap',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {renderCumRap()}

                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Chọn rạp</InputLabel>
                <Select
                    disabled={state.maCumRap === "" ? true : false}
                    native
                    value={state.maRap}
                    onChange={handleChange}
                    label="Chọn rạp"
                    inputProps={{
                        name: 'maRap',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {renderTenRap()}
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Chọn giá</InputLabel>
                <Select
                    native
                    value={state.giaVe}
                    onChange={handleChange}
                    label="Chọn giá"
                    inputProps={{
                        name: 'giaVe',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value="75000">75.000</option>
                    <option value="90000">90.000</option>
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                    disabled={state.maRap === "" ? true : false}
                    variant="outlined"
                    label="Chọn ngày giờ chiếu"
                    type="datetime-local"
                    id = "datetime-local"
                    value={state.ngayChieuGioChieu}
                    // defaultValue=""
                    className={classes.textField}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        name: "ngayChieuGioChieu",
                    }}
                />
            </FormControl>
            <div>
                {state.valid ?
                    <Button onClick={handleSubmit} type="button" className="w-50 my-3" variant="contained" color="primary">
                        Tạo lịch chiếu
                  </Button>
                    :
                    <Button className="w-50 my-3" variant="contained" disabled>
                        Tạo lịch chiếu
                    </Button>
                }

            </div>


        </div>
    )
}
