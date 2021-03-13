
const stateDefault = {
    mangDoUong: [
        { ten: "Pessi/Coca/Fanta (Cỡ lớn)", gia: 30000, soLuong: 0 },
        { ten: "Teppy Cam/ Nutri Boost (500ml)", gia: 20000, soLuong: 0 },
        { ten: "Nước suối Dasani (500ml)", gia: 15000, soLuong: 0 },
    ],

    mangDoAn: [
        { ten: "Bắp rang bơ lớn", gia: 50000, soLuong: 0 },
        { ten: "Bắp rang bơ nhỏ", gia: 30000, soLuong: 0 },
        { ten: "Snack khoai tây O'Star(48g)", gia: 30000, soLuong: 0 },
        { ten: "Đậu phộng Oishi ", gia: 25000, soLuong: 0 },
        { ten: "Kẹo MnM", gia: 20000, soLuong: 0 }
    ],

    tongGiaThucAn : 0,

    activeMenu: false
}

export const QuanLyMenuThucAnReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "TANG_GIAM_SO_LUONG_DO_AN":{

            console.log('action', action)
            let mangDoAnUpdate = [...state.mangDoAn]

            if(action.tangGiam){
                let index = mangDoAnUpdate.findIndex(item => item.ten === action.tenSP)

                if(index !== -1){
                    mangDoAnUpdate[index].soLuong += 1

                    state.tongGiaThucAn += mangDoAnUpdate[index].gia 
                }


            }else{
                let index = mangDoAnUpdate.findIndex(item => item.ten === action.tenSP)

                if(index !== -1 && mangDoAnUpdate[index].soLuong > 0){
                    mangDoAnUpdate[index].soLuong -= 1
                    state.tongGiaThucAn -= mangDoAnUpdate[index].gia
                }
            }

            state.mangDoAn = mangDoAnUpdate
            return {...state}

        }

        case "TANG_GIAM_SO_LUONG_DO_UONG":{

            console.log('action', action)
            let mangDoUongUpdate = [...state.mangDoUong]

            if(action.tangGiam){
                let index = mangDoUongUpdate.findIndex(item => item.ten === action.tenSP)

                if(index !== -1){
                    mangDoUongUpdate[index].soLuong += 1
                    state.tongGiaThucAn += mangDoUongUpdate[index].gia
                }
            }else{
                let index = mangDoUongUpdate.findIndex(item => item.ten === action.tenSP)

                if(index !== -1 && mangDoUongUpdate[index].soLuong > 0){
                    mangDoUongUpdate[index].soLuong -= 1
                    state.tongGiaThucAn -= mangDoUongUpdate[index].gia 
                }
            }

            return {...state, mangDoUong: mangDoUongUpdate}

        }

        case "XET_ACTIVE_MENU": {
            state.activeMenu = action.statusActive
            return {...state}
        }
        
                
        default:
            return {...state}
            break;
    }
    return {...state}
}