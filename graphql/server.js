const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GrapgQLList, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLFloat } = require('graphql')
const  GraphQLDate  = require('graphql-date')
const fetch = require('cross-fetch')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.use(cors())
const Port = 5000;

const movies = [
    { 
        title: 'A New Hope', episode_id: 4, 
        opening_crawl: 'It is a period of civil war.\r\n' +
    'Rebel spaceships, striking\r\n' +
    'from a hidden base, have won\r\n' +
    'their first victory against\r\n' +
    'the evil Galactic Empire.\r\n' +
    '\r\n' +
    'During the battle, Rebel\r\n' +
    'spies managed to steal secret\r\n' +
    "plans to the Empire's\r\n" +
    'ultimate weapon, the DEATH\r\n' +
    'STAR, an armored space\r\n' +
    'station with enough power\r\n' +
    'to destroy an entire planet.\r\n' +
    '\r\n' +
    "Pursued by the Empire's\r\n" +
    'sinister agents, Princess\r\n' +
    'Leia races home aboard her\r\n' +
    'starship, custodian of the\r\n' +
    'stolen plans that can save her\r\n' +
    'people and restore\r\n' +
    'freedom to the galaxy....',
        director: 'George Lucas',
        review: 4.6,
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters:  [
            "https://swapi.dev/api/people/1/", 
            "https://swapi.dev/api/people/2/", 
            "https://swapi.dev/api/people/6/", 
            "https://swapi.dev/api/people/7/", 
            "https://swapi.dev/api/people/8/", 
            "https://swapi.dev/api/people/9/",
            "https://swapi.dev/api/people/12/", 
            "https://swapi.dev/api/people/15/", 
            "https://swapi.dev/api/people/16/", 
            "https://swapi.dev/api/people/18/", 
            "https://swapi.dev/api/people/19/", 
            "https://swapi.dev/api/people/81/"
        ],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/1/',
        image: 'https://cdn.kobo.com/book-images/538b1473-6d45-47f4-b16e-32a0a6ba7f9a/1200/1200/False/star-wars-episode-iv-a-new-hope-3.jpg'
    },
    { 
        title: "The Empire Strikes Back", 
        episode_id: 5, 
        opening_crawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....", 
        director: "Irvin Kershner", 
        review: 4.8,
        producer: "Gary Kurtz, Rick McCallum", 
        release_date: "1980-05-17", 
        characters: [
            "https://swapi.dev/api/people/3/", 
            "https://swapi.dev/api/people/4/", 
            "https://swapi.dev/api/people/5/", 
            "https://swapi.dev/api/people/10/", 
            "https://swapi.dev/api/people/20/", 
            "https://swapi.dev/api/people/22/", 
            "https://swapi.dev/api/people/23/", 
            "https://swapi.dev/api/people/26/"
        ], 
        created: '2014-12-12T11:26:24.656000Z',
        edited: '2014-12-15T13:07:53.386000Z',
        url: 'https://swapi.dev/api/films/2/',
        image: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR70,0,630,1200_AL_.jpg'
    },
    {
        title: "Return of the Jedi", 
        episode_id: 6, 
        opening_crawl: "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...", 
        director: "Richard Marquand", 
        producer: "Howard G. Kazanjian, George Lucas, Rick McCallum", 
        release_date: "1983-05-25",
        review: 4.6,
        characters: [
            "https://swapi.dev/api/people/13/", 
            "https://swapi.dev/api/people/14/", 
            "https://swapi.dev/api/people/21/", 
            "https://swapi.dev/api/people/31/", 
            "https://swapi.dev/api/people/45/"
        ], 
        created: '2014-12-18T10:39:33.255000Z',
        edited: '2014-12-20T09:48:37.462000Z',
        url: 'https://swapi.dev/api/films/3/',
        image: 'https://m.media-amazon.com/images/I/71fYub7q10L._AC_UF1000,1000_QL80_.jpg'
    },
    {
        title: "The Phantom Menace", 
        episode_id: 1, 
        review: 3.9,
        opening_crawl: "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....", 
        director: "George Lucas", 
        producer: "Rick McCallum", 
        release_date: '1999-05-19', 
        characters: [
            "https://swapi.dev/api/people/11/",
            "https://swapi.dev/api/people/36/", 
            "https://swapi.dev/api/people/37/", 
            "https://swapi.dev/api/people/52/", 
            "https://swapi.dev/api/people/53/", 
            "https://swapi.dev/api/people/54/", 
            "https://swapi.dev/api/people/55/", 
            "https://swapi.dev/api/people/56/"
        ], 
        created: '2014-12-19T16:52:55.740000Z',
        edited: '2014-12-20T10:54:07.216000Z',
        url: 'https://swapi.dev/api/films/4/',
        image: 'https://images.moviesanywhere.com/00403c3ca0d15ee6d85c38b062edc810/ec8c9972-ab16-495b-8f6c-e309b86efbd5.jpg'
    },
    {
        title: 'Attack of the Clones',
        episode_id: 2,
        review: 4,
        opening_crawl: 'There is unrest in the Galactic\r\n' +
      'Senate. Several thousand solar\r\n' +
      'systems have declared their\r\n' +
      'intentions to leave the Republic.\r\n' +
      '\r\n' +
      'This separatist movement,\r\n' +
      'under the leadership of the\r\n' +
      'mysterious Count Dooku, has\r\n' +
      'made it difficult for the limited\r\n' +
      'number of Jedi Knights to maintain \r\n' +
      'peace and order in the galaxy.\r\n' +
      '\r\n' +
      'Senator Amidala, the former\r\n' +
      'Queen of Naboo, is returning\r\n' +
      'to the Galactic Senate to vote\r\n' +
      'on the critical issue of creating\r\n' +
      'an ARMY OF THE REPUBLIC\r\n' +
      'to assist the overwhelmed\r\n' +
      'Jedi....',
        director: 'George Lucas',
        producer: 'Rick McCallum',
        release_date: '2002-05-16',
        characters:  [
            "https://swapi.dev/api/people/40/", 
            "https://swapi.dev/api/people/43/", 
            "https://swapi.dev/api/people/65/", 
            "https://swapi.dev/api/people/66/", 
            "https://swapi.dev/api/people/67/",
            "https://swapi.dev/api/people/72/"
        ], 
        created: '2014-12-20T10:57:57.886000Z',
        edited: '2014-12-20T20:18:48.516000Z',
        url: 'https://swapi.dev/api/films/5/',
        image: 'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg'
    },
    {
        title: 'Revenge of the Sith',
        episode_id: 3,
        review: 4.8,
        opening_crawl: 'War! The Republic is crumbling\r\n' +
      'under attacks by the ruthless\r\n' +
      'Sith Lord, Count Dooku.\r\n' +
      'There are heroes on both sides.\r\n' +
      'Evil is everywhere.\r\n' +
      '\r\n' +
      'In a stunning move, the\r\n' +
      'fiendish droid leader, General\r\n' +
      'Grievous, has swept into the\r\n' +
      'Republic capital and kidnapped\r\n' +
      'Chancellor Palpatine, leader of\r\n' +
      'the Galactic Senate.\r\n' +
      '\r\n' +
      'As the Separatist Droid Army\r\n' +
      'attempts to flee the besieged\r\n' +
      'capital with their valuable\r\n' +
      'hostage, two Jedi Knights lead a\r\n' +
      'desperate mission to rescue the\r\n' +
      'captive Chancellor....',
        director: 'George Lucas',
        producer: 'Rick McCallum',
        release_date: '2005-05-19',
        characters:  [
            "https://swapi.dev/api/people/64/", 
            "https://swapi.dev/api/people/75/", 
            "https://swapi.dev/api/people/79/", 
            "https://swapi.dev/api/people/82/", 
            "https://swapi.dev/api/people/83/"
        ], 
        created: '2014-12-20T18:49:38.403000Z',
        edited: '2014-12-20T20:47:52.073000Z',
        url: 'https://swapi.dev/api/films/6/',
        image: 'https://musicart.xboxlive.com/7/64325100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080'
    }
]

const peoples = [
    {
        name: "Luke Skywalker", 
        height: "172", 
        mass: "77", 
        birth_year: "19BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/1/", 
        url: "https://swapi.dev/api/people/1/"
    },
    {
        name: "C-3PO", 
        height: "167", 
        mass: "75", 
        birth_year: "112BBY", 
        gender: "n/a",
        films: "https://swapi.dev/api/films/1/",
        url: "https://swapi.dev/api/people/2/"
    },
    {
        name: "R2-D2", 
        height: "96", 
        mass: "32", 
        birth_year: "33BBY", 
        gender: "n/a", 
        films: "https://swapi.dev/api/films/2/", 
        url: "https://swapi.dev/api/people/3/"
    },
    {
        name: "Darth Vader", 
        height: "202", 
        mass: "136", 
        birth_year: "41.9BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/2/",
        url: "https://swapi.dev/api/people/4/"
    },
    {
        name: "Leia Organa", 
        height: "150", 
        mass: "49",
        birth_year: "19BBY", 
        gender: "female",  
        films:"https://swapi.dev/api/films/2/", 
        url: "https://swapi.dev/api/people/5/"
    },
    {
        name: "Owen Lars", 
        height: "178", 
        mass: "120", 
        birth_year: "52BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/1/", 
        url: "https://swapi.dev/api/people/6/"
    },
    {
        name: "Beru Whitesun lars", 
        height: "165", 
        mass: "75",
        birth_year: "47BBY", 
        gender: "female",  
        films: "https://swapi.dev/api/films/1/", 
        url: "https://swapi.dev/api/people/7/"
    },
    {
        name: "R5-D4", 
        height: "97", 
        mass: "32", 
        birth_year: "unknown", 
        gender: "n/a", 
        films:"https://swapi.dev/api/films/1/",
        url: "https://swapi.dev/api/people/8/"
    },
    {
        name: "Biggs Darklighter", 
        height: "183", 
        mass: "84", 
        birth_year: "24BBY", 
        gender: "male", 
        films:"https://swapi.dev/api/films/1/",
        url: "https://swapi.dev/api/people/9/"
    },
    {
        name: "Obi-Wan Kenobi", 
        height: "182", 
        mass: "77", 
        birth_year: "57BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/2/", 
        url: "https://swapi.dev/api/people/10/"
    },
    {
        name: "Wilhuff Tarkin", 
        height: "180", 
        mass: "unknown", 
        birth_year: "64BBY", 
        gender: "male", 
        films:"https://swapi.dev/api/films/1/", 
        url: "https://swapi.dev/api/people/12/"
    },
    {
        name: "Chewbacca", 
        height: "228", 
        mass: "112", 
        birth_year: "200BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/3/", 
        url: "https://swapi.dev/api/people/13/"
    },
    {
        name: "Han Solo", 
        height: "180", 
        mass: "80",
        birth_year: "29BBY", 
        gender: "male",
        films: "https://swapi.dev/api/films/3/",
        url:  "https://swapi.dev/api/people/14/"  
    },
    {
        name: "Greedo", 
        height: "173", 
        mass: "74", 
        birth_year: "44BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/1/",
        url: "https://swapi.dev/api/people/15/"
    },
    {
        name: "Jabba Desilijic Tiure", 
        height: "175", 
        mass: "85", 
        birth_year: "600BBY", 
        gender: "hermaphrodite", 
        films: "https://swapi.dev/api/films/1/",
        url: "https://swapi.dev/api/people/16/"
    },
    {
        name: "Wedge Antilles", 
        height: "170", 
        mass: "77", 
        birth_year: "21BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/1/", 
        url: "https://swapi.dev/api/people/18/"
    },
    {
        name: "Jek Tono Porkins", 
        height: "180", 
        mass: "110", 
        birth_year: "unknown", 
        gender: "male", 
        films: "https://swapi.dev/api/films/1/",
        url: "https://swapi.dev/api/people/19/"
    },
    {
        name: "Raymus Antilles", 
        height: "188", 
        mass: "79", 
        birth_year: "unknown", 
        gender: "male", 
        films: "https://swapi.dev/api/films/1/", 
        url: "https://swapi.dev/api/people/81/"
    },
    {
        name: "Yoda", 
        height: "66", 
        mass: "67", 
        birth_year: "896BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/2/", 
        url: "https://swapi.dev/api/people/20/"
    },
    {
        name: "Palpatine", 
        height: "170", 
        mass: "75", 
        birth_year: "82BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/3/", 
        url: "https://swapi.dev/api/people/21/"
    },
    {
        name: "Boba Fett", 
        height: "183", 
        mass: "78.2",
        birth_year: "31.5BBY",
        gender: "male",  
        films: "https://swapi.dev/api/films/2/", 
        url:  "https://swapi.dev/api/people/22/"
    },
    {
        name: "IG-88", 
        height: "200", 
        mass: "140",
        birth_year: "15BBY", 
        gender: "none",  
        films: "https://swapi.dev/api/films/2/",
        url: "https://swapi.dev/api/people/23/"
    },
    {
        name: "Lando Calrissian", 
        height: "177", 
        mass: "79",
        birth_year: "31BBY", 
        gender: "male",  
        films: "https://swapi.dev/api/films/3/",
        url: "https://swapi.dev/api/people/25/"
    },
    {
        name: "Lobot", 
        height: "175", 
        mass: "79", 
        birth_year: "37BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/2/",
        url: "https://swapi.dev/api/people/26/"
    },
    {
        name: "Nien Nunb", 
        height: "160", 
        mass: "68", 
        birth_year: "unknown", 
        gender: "male", 
        films: "https://swapi.dev/api/films/3/",
        url: "https://swapi.dev/api/people/31/"
    },
    {
        name: "Anakin Skywalker", 
        height: "188", 
        mass: "84", 
        birth_year: "41.9BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/4/", 
        url: "https://swapi.dev/api/people/11/"
    },
    {
        name: "Jar Jar Binks", 
        height: "196", 
        mass: "66", 
        birth_year: "52BBY", 
        gender: "male", 
        films: "https://swapi.dev/api/films/4/", 
        url: "https://swapi.dev/api/people/36/"
    },
    {
        name: "Shmi Skywalker", 
        height: "163", 
        mass: "unknown", 
        birth_year: "72BBY", 
        gender: "female", 
        films: "https://swapi.dev/api/films/5/",
        url: "https://swapi.dev/api/people/43/"
    },
    {
        name: "Barriss Offee", 
        height: "166", 
        mass: "50", 
        birth_year: "40BBY", 
        gender: "female", 
        films: "https://swapi.dev/api/films/5/",
        url: "https://swapi.dev/api/people/65/"
    },
    {
        name: "Lama Su", 
        height: "229",
        mass: "89",
        birth_year: "unknown", 
        gender: "male", 
        films:  "https://swapi.dev/api/films/5/",
        url: "https://swapi.dev/api/people/72/"
    },
    {
        name: "Tion Medon", 
        height: "206", 
        mass: "80", 
        birth_year: "unknown", 
        gender: "male", 
        films: "https://swapi.dev/api/films/6/",
        url: "https://swapi.dev/api/people/83/"
    },
    {
        name: "Grievous", 
        height: "216", 
        mass: "59",
        birth_year: "unknown", 
        gender: "male", 
        films:  "https://swapi.dev/api/films/6/",
        url: "https://swapi.dev/api/people/79/"
    },
    {
        name: "Luminara Unduli", 
        height: "170", 
        mass: "56.2", 
        birth_year: "58BBY", 
        gender: "female", 
        films: "https://swapi.dev/api/films/6/",
        url: "https://swapi.dev/api/people/64/"
    }
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'This represents a movie',
    fields: () => ({
        title: {
            type: GraphQLNonNull(GraphQLString)
        },
        episode_id : {
            type: GraphQLNonNull(GraphQLInt)
        },
        director: {
            type: GraphQLNonNull(GraphQLString)
        },
        producer: {
            type: GraphQLNonNull(GraphQLString)
        },
        release_date: {
            type: GraphQLNonNull(GraphQLString)
        },
        opening_crawl: {
            type: GraphQLNonNull(GraphQLString)
        },
        created: {
            type: GraphQLNonNull(GraphQLString)
        },
        edited: {
            type: GraphQLNonNull(GraphQLString)
        },
        characters: {
            type: new GraphQLList(PeopleType),
            resolve: (movie) => {
                return peoples.filter(people => movie.url === people.films)
            }
        },
        url: {
            type: GraphQLNonNull(GraphQLString)
        },
        image: {
            type: GraphQLNonNull(GraphQLString)
        },
        review: {
            type: GraphQLNonNull(GraphQLFloat)
        }
    })
})

const PeopleType = new GraphQLObjectType({
    name: 'People',
    description: 'Characters in the movie',
    fields: () => ({
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        height: {
            type: GraphQLNonNull(GraphQLFloat)
        },
        mass: {
            type: GraphQLNonNull(GraphQLFloat)
        },
        gender: {
            type: GraphQLNonNull(GraphQLString)
        },
        birth_year: {
            type: GraphQLNonNull(GraphQLString)
        },
        films: {
            type: MovieType,
            resolve: (people) => {
                return movies.find(movie => people.films === movie.url)
            }
        },
        url: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        movie: {
            type: MovieType,
            description: 'A Movie',
            args: {
                episode_id: {
                    type: GraphQLInt
                }
            },
            resolve: (movie, args) => {
                return movies.find(movie => movie.episode_id === args.episode_id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            description: 'List of Movies',
            resolve: () => movies
        },
        peoples: {
            type: new GraphQLList(PeopleType),
            description: 'List of Actors/Peoples',
            resolve: () => peoples
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(Port, function(e){
    if(e) console.log("error")
    console.log("server running on ", Port);
})