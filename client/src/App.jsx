import React, { useEffect, useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Home from '../pages/Home'
import Favourites from '../pages/Favourites'
import Error from '../pages/Error'
import Movie from '../pages/Movie'



const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql err ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:5000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: link
})

function App() {
  
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/movie/:episode_id' element={ <Movie/> } ></Route>
          <Route path='/favourites' element={<Favourites/>} ></Route>
          <Route path='*' element={<Error/> } ></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
