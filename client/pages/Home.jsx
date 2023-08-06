import React, { useEffect, useState} from "react";
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../Graphql/Query';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'; 
import MovieCard from "../components/MovieCards";

function Home() {

    const {error, loading, data} = useQuery(GET_MOVIES);
    const [ darkTheme, setDarkTheme ] = useState(true);

    function setTheme(){
        if(darkTheme){
            setDarkTheme(false)
        }else{
            setDarkTheme(true)
        }
    }

    useEffect(() => {
        console.log(`${data ? data : "no data"}`)
    },[data])


    return (
        <div className={ darkTheme === true? "bg-gradient-to-br from-blue-950 to-black p-16" : " bg-gradient-to-br from-white to-sky-200 p-16"}>
        <div className="flex flex-col justify-start items-end">
            <button className={darkTheme === true? "text-xl text-white" : "text-xl text-black"} onClick={setTheme}>{darkTheme === true? <FaToggleOn/> : <FaToggleOff/> }</button>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center w-full mt-10">
            {
                data?.movies.map((movie) => (
                    <MovieCard key={movie.title} movie={movie}/>
                ))
            }
        </div>
        </div>
    )
}

export default Home;