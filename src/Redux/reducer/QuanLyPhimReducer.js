import { LAY_DANH_SACH_PHIM, LAY_DS_CUM_RAP_THEO_HE_THONG, LAY_MA_CUM_RAP, LAY_THONG_TIN_HE_THONG_RAP, LAY_THONG_TIN_LICH_CHIEU_THEO_RAP, SET_TEN_HE_THONG_RAP } from "../type/TypeQuanLyPhim";

const stateDefault = {
    mangPhim : [],

    heThongRap: [],
    maHeThongRap: "BHDStar",
    dsCumRap: [],
    numberActiveCumRap: 0,
    thongTinLichChieuCumRap: [],
    maCumRap: "bhd-star-cineplex-3-2",
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LAY_DANH_SACH_PHIM:
            return {...state.mangPhim, mangPhim : action.dataFilm }
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
        default:
            return {...state}
    }
}