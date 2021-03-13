import React, { Fragment } from 'react'
import CountDown, { zeroPad } from 'react-countdown'
import { useDispatch } from 'react-redux'
import { alertCompletedTimeBooking } from '../../../Redux/action/QuanLyModalAlert'

import './TimeWaiting.scss'

export default function TimeWaiting() {

    const dispatch = useDispatch()

    const Completionist = () => (
        <span className="timeResult">00:00</span>
    )

    const renderer = ({ minutes, seconds, completed }) => {

        if (completed) {
            return Completionist()
        } else {
            return <span className="timeResult">{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        }
    }

    return (
        <Fragment>
            <CountDown
                date={Date.now() + 30000}
                renderer={renderer}
                onComplete={alertCompletedTimeBooking}
            >
            </CountDown>
        </Fragment >
    )
}
