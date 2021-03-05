import { ADD_COMMENT_MODAL, ADD_LIKE_COMMENT_MODAL } from "../type/TypePopupModal"

const stateDefault = {
    mangDanhGia : [
        {name: "Tài", content: "Phim hay quá", diem: 5, like: 1, avatar: "/img/avatar_img.png" },
        {name: "Linh", content: "Phim như củ lạc giò tan", diem: 9, like: 2, avatar: "/img/avatar_img.png" },
        {name: "My My", content: "Main mạnh phết", diem: 9, like: 2, avatar: "/img/avatar_img.png" },

    ]
}

export const QuanLyDanhGiaReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_COMMENT_MODAL:
            console.log('actionComment', action.dataComment)

            state.mangDanhGia = [...state.mangDanhGia, action.dataComment]

            return {...state}
            break;
        
        case ADD_LIKE_COMMENT_MODAL : {
            const mangDanhGiaUpdata = [...state.mangDanhGia]

            let index = mangDanhGiaUpdata.findIndex(item => item.name === action.nameUser)

            if(index !== -1){
                mangDanhGiaUpdata[index].like += 1;
            }

            state.mangDanhGia = mangDanhGiaUpdata
            return {...state}
        }

        default:
            return {...state}
            break;
    }
}