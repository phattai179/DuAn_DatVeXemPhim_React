import { Fragment } from "react";

export const hienThiMauCumRapAction = (maHeThongRap) => {
    let objectCumRap = {
        numTrimHeThongRap: 0,
        colorTenHeThongRap: ""
    }

    switch (maHeThongRap) {
        case "BHDStar":
            objectCumRap.numTrimHeThongRap = 17;
            objectCumRap.colorTenHeThongRap = "#8bc541"
            return objectCumRap
            break;
        case "CGV":
            objectCumRap.numTrimHeThongRap = 3;
            objectCumRap.colorTenHeThongRap = "#ee2d24"
            return objectCumRap
            break;
        case "CineStar":
            objectCumRap.numTrimHeThongRap = 3;
            objectCumRap.colorTenHeThongRap = "#3372e2"
            return objectCumRap
            break;
        case "Galaxy":
            objectCumRap.numTrimHeThongRap = 3;
            objectCumRap.colorTenHeThongRap = "#ff8600"
            return objectCumRap
            break;
        case "LotteCinima":
            objectCumRap.numTrimHeThongRap = 5;
            objectCumRap.colorTenHeThongRap = "#ec2a5a"
            return objectCumRap
            break;
        case "MegaGS":
            objectCumRap.numTrimHeThongRap = 6;
            objectCumRap.colorTenHeThongRap = "#ebbb1f"
            return objectCumRap
            break;
        default:
            return objectCumRap
            break;
    }
}


export const hienThiNumberIconStart = (number, indexHalf) => {
    let n = parseInt(number)
    // console.log('n', n)

    let iconStar = <i className="fa fa-star"></i>
    let iconHalfStar = <i className="fa fa-star-half-alt"></i>

    let mangIcon = []
    for (let i = 0; i < n; i++) {
        if (i === n - 1 && indexHalf === 1) {
            mangIcon.push(iconHalfStar)
        } else {
            mangIcon.push(iconStar)
        }
    }
    // console.log('mangIcon', mangIcon)
    return mangIcon.map((item, index) => {
        return (
            <Fragment key={index}>
                {item}
            </Fragment>

        )
    })
}

