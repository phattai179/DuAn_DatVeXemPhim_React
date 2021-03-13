import { CHON_GHE, LAY_DANH_SACH_PHIM, LAY_DS_CUM_RAP_THEO_HE_THONG, LAY_MA_CUM_RAP, LAY_THONG_TIN_HE_THONG_RAP, LAY_THONG_TIN_LICH_CHIEU_CHI_TIET_PHIM, LAY_THONG_TIN_LICH_CHIEU_THEO_RAP, LAY_THONG_TIN_PHONG_VE, SET_TEN_HE_THONG_RAP } from "../type/TypeQuanLyPhim";

const stateDefault = {
    mangPhim : [],

    // Xử lý phần boxBooking 
    heThongRap: [],
    maHeThongRap: "BHDStar",
    dsCumRap: [],
    numberActiveCumRap: 0,
    thongTinLichChieuCumRap: [],
    maCumRap: "bhd-star-cineplex-3-2",

    // Xử lý phần trangChiTietPhim
    thongTinLichChieuChiTietPhim : {},

    // Xử lý đặt vé
    phongVe : {},
    danhSachGheDangChon: [],

}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LAY_DANH_SACH_PHIM:
            return {...state, mangPhim : action.dataFilm }
            break;
    
        case LAY_THONG_TIN_HE_THONG_RAP: {
            state.heThongRap = action.mangHeThongRap;
            return {...state}
        }

        case LAY_DS_CUM_RAP_THEO_HE_THONG: {
            state.dsCumRap = action.dataCumRap;
            return {...state}
        }

        case SET_TEN_HE_THONG_RAP: {

            // console.log('action', action.dataMaHeThongRap)

            state.maHeThongRap = action.dataMaHeThongRap
            return {...state,}
        }

        case 'SET_NUM_ACTIVE': {
            state.numberActiveCumRap = action.dataNumActive;
            return {...state}
        }

        case LAY_THONG_TIN_LICH_CHIEU_THEO_RAP: {
            state.thongTinLichChieuCumRap = action.data
            return{...state}
        }

        case LAY_MA_CUM_RAP:{
            state.maCumRap = action.dataMaCumRap
            return {...state}
        }

        // Xử lý logic trang chi tiết phim 
        case LAY_THONG_TIN_LICH_CHIEU_CHI_TIET_PHIM: {
            state.thongTinLichChieuChiTietPhim = action.data
        }

        // Xử lý logic đặt vé

        case LAY_THONG_TIN_PHONG_VE : {
            return {...state, phongVe: action.data}
        }

        // Vừa chọn ghế vừa tạo 1 object đặt vé để lưu trên store
        case CHON_GHE : {
            let danhSachGheDangChonUpdate = [...state.danhSachGheDangChon]

            let gheDangChon = state.danhSachGheDangChon.find(ghe => ghe.maGhe === action.dataGheDangChon.maGhe)

            if(gheDangChon){
                danhSachGheDangChonUpdate = danhSachGheDangChonUpdate.filter(ghe => ghe.maGhe !== gheDangChon.maGhe)
            }else{
                danhSachGheDangChonUpdate.push(action.dataGheDangChon)
            }
            
            return {...state, danhSachGheDangChon : danhSachGheDangChonUpdate}
        }

        default:
            return {...state}
    }
}