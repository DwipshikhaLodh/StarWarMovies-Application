import React, {useState} from "react";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'; 
import { NavLink } from "react-router-dom";

function Error() {

    const [ darkTheme, setDarkTheme ] = useState(true);

    function setTheme(){
        if(darkTheme){
            setDarkTheme(false)
        }else{
            setDarkTheme(true)
        }
    }

    return (
        <div className={ darkTheme === true? "bg-gradient-to-br from-blue-950 to-black p-16" : " bg-gradient-to-br from-white to-sky-200 p-16"}>
            <div className="flex flex-col justify-start items-end">
                <button className={darkTheme === true? "text-xl text-white" : "text-xl text-black"} onClick={setTheme}>{darkTheme === true? <FaToggleOn/> : <FaToggleOff/> }</button>
            </div>
            <div className={darkTheme === true? "flex flex-col justify-center items-center text-white mt-20 mb-40" : "flex flex-col justify-center items-center text-black mt-20 mb-40"}>
                <p className="text-3xl font-bold">ERROR!!!</p>
                <p className="text-slate-500 font-serif">May be you came a wrong way...</p>
                <div className="flex flex-row justify-center items-center mt-10">
                    <p>It's ok you can go back to </p>
                    <button className="ml-2 mr-2 border-2 rounded-lg pr-3 pl-3 bg-white text-black font-bold font-mono"><NavLink to={`/`}> Home </NavLink></button>
                    <p>page</p>
                </div>
            </div>
        </div>
    )
}

export default Error;