import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query GetMovies{
      movies{
        title
        episode_id
        review
        release_date
      }
    }    
      
`

export const GET_MOVIE_DESC = gql`
    query GetMovieDesc{
      movie(episode_id: 3){
        title
        episode_id
        director
        producer
        release_date
        created
        edited
        opening_crawl
        review
        characters{
          name
          height
          mass
          gender
          birth_year
        }
      }
    
    }
`


 