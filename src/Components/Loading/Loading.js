import React from 'react'
import { useSelector } from 'react-redux'
import style from './Loading.module.scss'

export default function Loading() {

    const isLoading = useSelector(state => state.QuanLyLoadingReducer.isLoading)

    

    if (isLoading) {
        return (
            <div className={style.bgLoading}>
                <div className={style.loader}>
                    <div className={style.l_main}>
                        <div className={style.l_square}><span></span><span></span><span></span></div>
                        <div className={style.l_square}><span></span><span></span><span></span></div>
                        <div className={style.l_square}><span></span><span></span><span></span></div>
                        <div className={style.l_square}><span></span><span></span><span></span></div>
                    </div>
                </div>
            </div>
        )
    }else{
        return ""
    }

}
