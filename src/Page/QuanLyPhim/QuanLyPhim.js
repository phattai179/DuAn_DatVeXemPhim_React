import React, { useEffect } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import './QuanTriPhim.scss'
import MaterialTable from 'material-table';
import { KeyboardDatePicker } from '@material-ui/pickers'
import { layDanhSachPhimAction } from '../../Redux/action/QuanLyPhimAction';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/setting';
import Axios from 'axios'


export default function QuanLyPhim() {


    const dispatch = useDispatch()
    let mangPhim = useSelector(state => state.QuanLyPhimReducer.mangPhim)

    let accessToken = localStorage.getItem(ACCESS_TOKEN)

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])

    const columns = [
        { title: 'Tên phim', field: 'tenPhim' },
        { title: 'Mã phim', field: 'maPhim' },
        { title: 'Bí danh', field: 'biDanh' },
        {
            title: 'Trailer', field: 'trailer',
            render: rowData => <span>{rowData.trailer.substr(0, 15)}</span>

        },
        {
            title: 'Hình ảnh', field: 'hinhAnh',
            render: rowData => <img src={rowData.hinhAnh} style={{ width: "80px", height: "120px" }} ></img>,
            editComponent: props => 
                (
                    <div>
                        <input name="hinhAnh" type="file" onChange={e =>
                            props.onChange(e.target.files[0])} ></input>
                        <img src={props.value} style={{ width: "80px", height: "120px" }} ></img>
                    </div>

                )
        },

        {
            title: 'Mô tả', field: 'moTa', width: "100%",
            cellStyle: {
                width: "100%"
            },
            render: rowData => <div style={{ width: "100%", minWidth: "300px" }}>{rowData.moTa.length > 150 ? rowData.moTa.substr(0, 150) : rowData.moTa}</div>,
            editComponent: props => (
                <textarea
                    style={{ width: "100%", height: "150px" }}
                    row="10"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                >
                </textarea>
            )
        },

        {
            title: 'Ngày khởi chiếu', field: 'ngayKhoiChieu',
            type: "date",
            initialEditValue: new Date(),
            cellStyle: {
                whiteSpace: "nowrap"

            },
            render: rowData => <span>{moment(rowData.ngayKhoiChieu).format('DD-MM-yyyy')}</span>,
            // editComponent: props => (
            //     <input name="ngayKhoiChieu" type="date" value={props.value} onChange={e => props.onChange(e.target.value)}></input>
            // )
        },
        { title: 'Đánh Giá', field: 'danhGia' },

    ]

    let data = mangPhim

    return (
        <MaterialTable
            title="Quản lý phim"
            columns={columns}
            data={data}

            options={{
                maxBodyHeight: "500px",
                draggable: false,
                headerStyle: {
                    fontWeight: "600"
                },
                addRowPosition: "first",
            }}
            localization={{
                header: {
                    actions: 'Chức năng'
                }

            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {

                        console.log('newData', newData)

                        let ngayKhoiChieuNew = new Date(newData.ngayKhoiChieu).toLocaleDateString("en-GB")

                        let newDataUpdate = { ...newData, ngayKhoiChieu: ngayKhoiChieuNew, maNhom: "GP03" }

                        const formData = new FormData()

                        for (let item in newDataUpdate) {
                            formData.append(item, newDataUpdate[item])
                        }

                        let promise = Axios({
                            url: `${DOMAIN}/api/QuanLyPhim/ThemPhimUploadHinh`,
                            method: "POST",
                            data: formData,
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        })

                        promise.then((res) => {
                            alert(`Thêm phim ${newDataUpdate.tenPhim} thành công`)
                            // console.log('result', res.data)
                            dispatch(layDanhSachPhimAction())
                            resolve(res.data)
                        })
                        promise.catch((err) => {
                            console.log(err.response?.data)
                            alert(`Thêm phim thất bại. ` + err.response?.data)
                            reject(err)
                        })

                    })
                        .then((message) => {
                            console.log(message)
                        })
                        .catch((message) => {
                            console.log(message)
                        }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {

                        console.log('newData', newData)



                        let ngayKhoiChieuNew = new Date(newData.ngayKhoiChieu).toLocaleDateString("en-GB")

                        let newDataUpdate = { ...newData, maNhom: "GP03", ngayKhoiChieu: ngayKhoiChieuNew }

                        const formData = new FormData()

                        for (let item in newDataUpdate) {
                            formData.append(item, newDataUpdate[item])
                        }

                        let promise = Axios({
                            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload`,
                            method: "POST",
                            data: formData,
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        })

                        promise.then((res) => {
                            alert(`Cập nhật phim ${newData.tenPhim} thành công`)
                            console.log(res.data)
                            dispatch(layDanhSachPhimAction())
                            resolve(res.data)
                        })
                        promise.catch((err) => {
                            alert(`Cập nhật phim thất bại. ` + err.response?.data)
                            reject(err)
                        })
                    })
                        .then((message) => {
                            console.log(message)
                        })
                        .catch((message) => {
                            console.log(message)
                        }),

                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {

                        let promise = Axios({
                            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${oldData.maPhim}`,
                            method: "DELETE",
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        })

                        promise.then((res) => {
                            alert(`Xóa ${oldData.tenPhim} thành công`)
                            resolve(res.data)
                        })
                        promise.catch((err) => {
                            console.log(err.response?.data)
                            alert(`Xóa phim thất bại. ` + err.response?.data)
                            reject(err)
                        })

                    })
                        .then((message) => {
                            console.log(message)
                        })
                        .catch((message) => {
                            console.log(message)
                        })
            }}
        />
    )
}
