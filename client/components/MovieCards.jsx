import React from "react";
import { NavLink } from "react-router-dom";
import Star from "../components/Star";
import { useDispatch, useSelector } from "react-redux";
import { addFav } from "../redux/actions";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

function MovieCard({movie}) {

    const dispatch = useDispatch();
    const favMovieList = useSelector((state) => state.addFavMovies)

    return (
        <div className="flex flex-col flex-wrap justify-between items-start w-full lg:w-1/5 border border-sky-950 rounded-2xl bg-poster bg-cover text-white h-80 mb-10 lg:m-16 p-2 ">
                    
                    <div className="flex flex-col justify-start items-start w-full">
                        <p className="w-5/6 font-semibold text-lg ">{movie.title}</p>
                        <p className="w-5/6 text-sm text-black font-semibold">Episode {movie.episode_id}</p>

                    </div>
                    <div className="flex flex-col justify-evenly items-start w-full">
                        <div className="w-5/6  flex flex-col">
                            <p className="text-sm">Released on </p>
                            <p className="text-black font-semibold"> {movie.release_date}</p>
                        </div>
                        <div className="flex flex-col w-5/6 ">
                            <p>Review</p>
                            <Star rating={movie.review}/>
                        </div>
                        <NavLink className="text-white bg-indigo-950 border-2 border-indigo-950 flex flex-col justify-center items-center rounded-xl pb-1 px-2 mt-2 w-1/3 font-bold" to={`/movie/${movie.episode_id}`}>more</NavLink>
                        <div className={favMovieList.favouriteMovies.some((favmovie) => favmovie.title == movie.title) ? "flex flex-col justify-center items-end w-11/12 py-2 translate-x-2 text-2xl text-red-600" : "flex flex-col justify-center items-end w-11/12 py-2 translate-x-2 text-2xl"} >
                            <button onClick={() => dispatch(addFav(movie))}>
                                { favMovieList.favouriteMovies.some((favmovie) => favmovie.title == movie.title) ? <AiFillHeart/> : <AiOutlineHeart/>}
                            </button>
                        </div>
                    </div> 
                    </div>
    )
}

export default MovieCard;