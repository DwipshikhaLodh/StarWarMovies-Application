export const addFav = (movie) => { 
    return {
        type : "ADD_FAVOURITES" ,
        payload : movie
    }
}