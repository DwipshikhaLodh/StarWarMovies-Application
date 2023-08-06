import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

    const [ homeActive, sethomeActive ] = useState(true)

    return (
            <ul className="flex flex-row justify-center items-center w-full bg-gradient-to-r from-blue-950 to-black text-white p-2 mt-2 pb-4">
                <li className={homeActive === true? " cursor-pointer border-slate-800 border-2 rounded-lg w-1/2 bg-slate-700 text-white font-semibold text-lg text-center" : " cursor-pointer w-1/2 text-center"}><NavLink to='/' onClick={() => sethomeActive(true)}>Home</NavLink></li>
                <li className={homeActive === false? " cursor-pointer border-slate-800 border-2 rounded-lg w-1/2 bg-slate-700 text-white font-semibold text-lg text-center" : "cursor-pointer w-1/2 text-center"}><NavLink to='/favourites' onClick={() => sethomeActive(false)}>Favourites</NavLink></li>
            </ul>
    )
}

export default NavBar;