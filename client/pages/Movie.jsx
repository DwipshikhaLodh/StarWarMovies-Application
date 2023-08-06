import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_MOVIE_DESC } from "../Graphql/Query";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'; 
import Star from "../components/Star";
import { useDispatch, useSelector } from "react-redux";
import { addFav } from "../redux/actions";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useParams } from "react-router-dom";

function Movie() {

    const { episode_id } = useParams();
    console.log(` id is ${episode_id}`)
    const {loading, error, data} = useQuery(GET_MOVIE_DESC, { 
        variables: { episode_id },
    });
    console.log(data?.movie)
    
    const dispatch = useDispatch();
    const favMovieList = useSelector((state) => state.addFavMovies)
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

            <div className="flex flex-col justify-around items-center w-full mt-20">
                <div className="flex flex-row flex-wrap justify-center items-center w-full">
                    <img className="h-96 border-2 rounded-xl border-indigo-950 mb-5" src="/images/cardPoster.png" alt="cardPhoto"></img>
                    <div className={ darkTheme === true ? "flex flex-col justify-between h-96 items-start text-white w-3/3 ml-4 " : "flex flex-col justify-between h-96 items-start text-black w-3/3 ml-4"}>
                        <div className="flex flex-col items-start justify-start w-full">
                            <div className="flex flex-row w-full">
                                <h1 className="text-2xl font-bold w-5/6">{data?.movie?.title}</h1>
                                <div className={favMovieList.favouriteMovies.some((favmovie) => favmovie.title == data?.movie?.title) ? "flex flex-col justify-center items-end w-1/6 py-2 translate-x-2 text-2xl text-red-600" : "flex flex-col justify-center items-end w-1/6 py-2 translate-x-2 text-2xl"} >
                                    <button onClick={() => dispatch(addFav(data?.movie))}>
                                        { favMovieList.favouriteMovies.some((favmovie) => favmovie.title == data?.movie?.title) ? <AiFillHeart/> : <AiOutlineHeart/>}
                                    </button>
                                </div>    
                            </div>
                            <p className="text-slate-500">Episode {data?.movie?.episode_id}</p>
                        </div>
                        <div className="flex flex-col justify-center items-start -mt-24">
                            <p>Review</p>
                            <Star rating={data?.movie?.review}/>
                        </div>
                        <div className="-mb-16">
                            <div className="flex flex-col justify-center items-start mb-4">
                                <p className="text-slate-500">Directed by</p>
                                <p>{data?.movie?.director}</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-slate-500">Produced by</p>
                                <p>{data?.movie?.producer}</p>
                            </div>
                        </div>
                        <p className="text-slate-500">Released on {data?.movie?.release_date}</p>
                    </div>
                </div>

                <div className={darkTheme === true ? "flex flex-col justify-center items-center bg-white p-10 border-2 border-white rounded-xl m-10 font-mono" : "flex flex-col justify-center items-center bg-black text-white p-10 border-2 border-black rounded-xl m-10 font-mono"}>
                    {data?.movie?.opening_crawl}
                </div>

                <div className="mt-20">
                    <p className={darkTheme === true? "text-3xl text-white font-bold" : "text-3xl text-black font-bold"}>Characters</p>
                </div>

                <div className="flex flex-row flex-wrap justify-around items-center w-full pt-8 border-t-2 border-slate-500">
                    {
                        data?.movie?.characters?.map(actor => (
                            <div className={darkTheme === true? "flex flex-col bg-white border-2 rounded-xl w-full lg:w-4/12 p-2 m-2 font-mono" : "flex flex-col bg-black text-white border-2 rounded-xl w-full lg:w-4/12 p-2 m-2 font-mono"} key={actor.name}>
                                <p className="font-semibold">{actor.name}</p>
                                <p className="text-sm -mt-1 text-slate-600">{actor.gender}</p>
                                <div className="flex flex-row justify-start items-start mt-5">
                                    <div className="flex flex-row">
                                        <p className="text-sm">Weight: </p>
                                        <p className="text-sm font-semibold ml-2">{actor.mass}</p>
                                    </div>    
                                    <div className="flex flex-row ml-10">
                                        <p className="text-sm">Height:</p>
                                        <p className="text-sm font-semibold ml-2">{actor.height}</p>
                                    </div>
                                </div>    
                                <div className="flex flex-row">
                                    <p className="text-sm">Birth year: </p>
                                    <p className="text-sm font-semibold ml-2">{actor.birth_year}</p>
                                </div>    
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    
    )
}

export default Movie;