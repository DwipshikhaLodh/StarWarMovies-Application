import addFavMovies from "./addFavMovieReducer";
import { combineReducers } from "redux";

const singleRootReducer = combineReducers({
    addFavMovies
})

export default singleRootReducer;