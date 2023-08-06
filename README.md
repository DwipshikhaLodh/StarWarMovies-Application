# Star War Movies Application

### Preview of the Application 
#### Header

![z-header](https://github.com/DwipshikhaLodh/StarWarMovies-Application/assets/83503257/b2f675d9-0b49-40e1-a2ee-9357f8b1d010)

#### Home Page

![z-home](https://github.com/DwipshikhaLodh/StarWarMovies-Application/assets/83503257/b5bea0aa-eb9d-497a-8f65-52e4dabb87f0)

#### Favourite Page

![z-fav](https://github.com/DwipshikhaLodh/StarWarMovies-Application/assets/83503257/b6a84902-f693-46b6-bc2e-16d8c5b6e27f)

#### Movie Page (Dark Mode)

![z-desc-dark](https://github.com/DwipshikhaLodh/StarWarMovies-Application/assets/83503257/f16d3f49-17f8-44e3-8c8a-e7b00182adcd)

#### Movie Page (Light Mode)

![z-desc-light](https://github.com/DwipshikhaLodh/StarWarMovies-Application/assets/83503257/344cea7f-daaa-4c7a-8c47-052403bad495)


### Features of the Application
- View all the movies in the *Home* section
- Can Favourite any of the movies from *Home* section and view them on the *Favourite* page
- Can remove the movies according to our desire from the *Favourite* page which we don't want to keep
- Can view the movie details by clicking on the *more* button on the Movie Cards
- Can change the mode *Dark Mode* <> *Light Mode*

But we can see the details of the movie when we hardcode the episode_id of the movie in the query inside gql template literal in the Query file as the line ($episode_id: ID!) isn't working for now, but I'm working on it. Will update it as soon as it works.
 

### Steps to run the application locally:
- open the main folder
- go to folder **graphql** in the terminal
  > cd graphql
- use the script
  > npm run devStart
- open chrome/a browser & search for
  > http://localhost:5000/graphql
- we'll have our playground
- go back to vs code & open another terminal
- go to folder **client** in the terminal
  > cd client
- use the script
  > npm run dev
- We'll get the port through which we'll get directed to our application

We have our application ready.

### I had to install these:

#### for folder *client*
- create project folder
  > npm create vite@latest *folder*
- install tailwind
  > npm install -D tailwindcss postcss autoprefixer
- nodemon 
  > npm i --save nodemon
- created a new script
  > "devStart" : "nodemon server.js"
- Few other were:
  > npm i redux react-redux

  > npm i react-icons

  > npm i @apollo/client

#### for folder *graphql*
- initiate a node folder
  > npm init
- install below mentioned:
  > npm i express express-graphql

  > npm i graphql

  > npm i cors





