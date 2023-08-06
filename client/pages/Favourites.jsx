import React, {useState} from "react";
import { useSelector } from "react-redux";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'; 
import MovieCard from "../components/MovieCards";

function Favourites() {

    const favMovieList = useSelector((state) => state.addFavMovies)
    console.log(favMovieList)

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
        <div className="flex flex-row flex-wrap justify-center items-center">
            {
                favMovieList.favouriteMovies.map((movie) => (
                    <MovieCard key={movie.title} movie={movie}/>
                ))
            }
        </div>
        </div>
    )
}

export default Favourites;