import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from 'material-table';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../Redux/action/QuanLyUserAction'
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN, STATUS_CODE } from '../../utils/setting';
import { styled } from '@material-ui/core';

export default function QuanLyNguoiDung() {

    // Lấy danhSachNguoiDungTuStore
    let danhSachNguoiDung = useSelector(state => state.QuanLyUserReducer.danhSachNguoiDung)

    console.log('danhSachNguoiDung', danhSachNguoiDung)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction())
    }, [])

    let columns = [
        { title: 'Tài khoản', field: 'taiKhoan', validate: rowData => rowData.taiKhoan === "" ? {isValid: false, helperText: "tài khoản không đước bỏ trống"} : true },
        { title: 'Mật khẩu', field: 'matKhau' },
        { title: 'Họ tên', field: 'hoTen' },
        { title: 'Email', field: 'email', },
        { title: 'SĐT', field: 'soDt', },
        {
            title: 'Loại người dùng',
            field: 'maLoaiNguoiDung',
            lookup: { "QuanTri": "Quản trị", "KhachHang": "Khách hàng" }
        },

    ]

    let data = danhSachNguoiDung

    // const [state, setState] = React.useState({
    //     columns: [
    //         { title: 'Tài khoản', field: 'taiKhoan' },
    //         { title: 'Mật khẩu', field: 'matKhau' },
    //         { title: 'Họ tên', field: 'hoTen' },
    //         { title: 'Email', field: 'email', },
    //         { title: 'Email', field: 'email', },
    //         { title: 'SĐT', field: 'soDt', },


    //     ],
    //     data: [
    //         { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //         {
    //             name: 'Zerya Betül',
    //             surname: 'Baran',
    //             birthYear: 2017,
    //             birthCity: 34,
    //         },
    //         {
    //             name: 'Adladin',
    //             surname: 'VietNam',
    //             birthYear: 2015,
    //             birthCity: 22,
    //         },

    //     ],

    // });
    return (
        <MaterialTable
            title="Quản Lý Người Dùng"
            
                
            
            columns={columns}
            data={data}
            options={{
                // filtering: true,
                headerStyle: {
                    fontWeight: 700,
                },
                addRowPosition: "first"
            }}
            localization={{
                
                header: {
                    actions: 'Chức năng'
                },
                body:{
                    editRow: {
                        deleteText:
                        "Bạn có chắc chắn muốn xóa ? Tài khoản xóa sẽ không thể khôi phục",
                        cancelTooltip: "Hủy",
                        saveTooltip: "Lưu",
                    },
                    addTooltip: "Thêm",
                    deleteTooltip: "Xóa",
                    editTooltip: "Chỉnh sửa",

                    
                }
                
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolse, reject) =>  {
                        
                        let accessToken = localStorage.getItem(ACCESS_TOKEN)

                        console.log('newData', newData)


                        let promise = axios({
                            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung`,
                            data: {...newData, maNhom: "GP03"},
                            method: "POST",
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        })
                        

                        promise.then((res) => {
                            console.log(res.data)
                            alert('Thêm người dùng thành công')
                            dispatch(layDanhSachNguoiDungAction()) 
                            resolse(res.data)
                        })
                        promise.catch((err) => {
                            console.log(err.response?.data)
                            alert("Thêm người dùng thất bại. " + err.response?.data)
                            reject(err)
                        })

                    })
                    .then((message) => {
                        console.log('thenPromise' + message)
                    })
                    .catch((message) => {
                        console.log("thenPromise" + message)
                    }),

                onRowUpdate: (newData, oldData) => 
                    new Promise((resolse, reject) => {

                        let accessToken = localStorage.getItem(ACCESS_TOKEN)

                        let promise = axios({
                            url: `${DOMAIN}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
                            method: "PUT",
                            data: {...newData, maNhom: 'GP03'},
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        })

                        promise.then((res) => {
                            console.log(res.data)
                            dispatch(layDanhSachNguoiDungAction())
                            alert(`Cập nhật người dùng ${newData.taiKhoan} thành công`)
                            resolse(res.data)
                        })
                        promise.catch((err) => {
                            console.log(err.response?.data)
                            alert(`Cập nhật người dùng thất bại. ` + err.response?.data)
                            reject(err.response?.data)
                        })

                    })
                ,

                onRowDelete: (oldData) => 
                    new Promise((resolse, reject) => {

                        let accessToken = localStorage.getItem(ACCESS_TOKEN)

                        let promise = axios({
                            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${oldData.taiKhoan}`,
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        })
                        

                        promise.then((res) =>{
                            console.log(res.data)
                            dispatch(layDanhSachNguoiDungAction())
                            alert(`Xóa người dùng ${oldData.taiKhoan} thành công`)
                            resolse(res.data)
                        })

                        promise.catch((err) => {
                            console.log(err)
                            alert(`Xóa người dùng ${oldData.taiKhoan} thất bại. ` + err.response?.data)
                            reject(err)
                        })
                    })
                    .then((message) => {
                        console.log('thenPromise' + message)
                    })
                    .catch((message) => {
                        console.log("thenPromise" + message)
                    }),
            }}
        />
    )
}
