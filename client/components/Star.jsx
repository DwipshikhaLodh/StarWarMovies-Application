import React from "react";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'

function Star({rating}) {

    
    const star = Array.from({ length: 5 }, (ele, index) => {
        return (
            rating >= index + 1 ? <BsStarFill/> : rating >= index + 0.5 ? <BsStarHalf/> : <BsStar/> 
        )
    })

    return (
        <span className="flex flex-row text-yellow-500">{rating === 0? `No Stars` : star}</span>
    )
}

export default Star;