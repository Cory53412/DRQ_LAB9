const express = require('express');//calls express package
const app = express();
const port = 4000;//seperate port to front end server
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');//package that provides middleware
const mongoose = require('mongoose');//calls mongoose package


//PARSE APPLICATION /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connecting to our mongoose db
const connectionString = 'mongodb+srv://admin:admin@cluster0.lufel.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true });

//defining schema
const Schema = mongoose.Schema;

//creating schema
var movieSchema = new Schema({
    Title: String,
    Year: String,
    Poster: String
});

var movieModel = mongoose.model("movieCollection", movieSchema);//variable used to interact with db

//middleware
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to Data Representation adn Querying!')
})

//when get request is made send array mymovies[]
app.get('/api/movies', (req, res) => {
    // const mymovies = [

    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "World War Z",
    //         "Year": "2013",
    //         "imdbID": "tt0816711",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    //     }
    //     , {
    //         "Title": "War of the Worlds",
    //         "Year": "2005",
    //         "imdbID": "tt0407304",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
    //     }
    // ];

    movieModel.find((err, data) => {
        res.json(data);
    })
   // res.json({ movies: mymovies });//send back array[]
})

app.get('/api/movies/:id',(req,res)=>{
    console.log(req.params.id);

    movieModel.findById(req.params.id,(err,data)=>{
        res.json(data);
    })
})

app.delete('/api/movies/:id', (req,res)=>{
    console.log('delete movie: ' + req.params.id);

    movieModel.findByIdAndDelete(req.params.id, (err,data)=>{//finds record in db by matching id, then deletes record and sends back some data
        res.send(data);
    })
})

app.post('/api/movies', (req, res) => {
    //console.logs data to integrated terminal
    console.log("Movie Recieved.");
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    movieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
    })

    //sending back data to prevent duplicate data added to db
    res.send("Item added to database");
})

//binds and listen for connections on this path
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})