const initialState = {
    favouriteMovies : []
}

const addFavMovies = (state = initialState, action) => {
    switch(action.type){
        case "ADD_FAVOURITES":
            if(state.favouriteMovies.some(favmovie => favmovie === action.payload)){
                const updatedmovielist = state.favouriteMovies.filter(movie => {
                    if(movie !== action.payload){
                        return movie
                    }
                })
                return {
                    ...state,
                    favouriteMovies: updatedmovielist
                } 
            }else{
            return {
                ...state, 
                favouriteMovies: [
                    ...state.favouriteMovies, action.payload
                ]
            }}
        default: return state;
    }
}

export default addFavMovies;