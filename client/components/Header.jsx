import React from 'react'
import HeadSec from './HeadSec';
import NavBar from './NavBar';


function Header() {
    return (
        <div className='flex flex-col justify-center items-center bg-gradient-to-r from-blue-950 to-black '>
            <HeadSec/>
            <NavBar/>
        </div>
    )
}

export default Header;