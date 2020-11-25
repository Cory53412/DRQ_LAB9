import React from 'react';//imported when class extended
import axios from 'axios';
export class Create extends React.Component { //extending react class Component

    constructor() {
        super();
        //binds instances to the class
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this)

        //setting title,year,poster to ''
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    //when title is changed set the states title to new title
    onChangeMovieTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }
    //when Year is changed set the states Year to new Year
    onChangeMovieYear(e) {
        this.setState({
            Year: e.target.value
        });
    }
    //when Poster is changed set the states Poster to new Poster
    onChangeMoviePoster(e) {
        this.setState({
            Poster: e.target.value
        });
    }

    //sends alert to show user entered movies details
    onSubmit(e) {
        e.preventDefault();//stop you calling button multiple times
        alert("Movie Added " + this.state.Title + " " +
            this.state.Year + " " + this.state.Poster);

        const newMovie = {
            Title: this.state.Title,
            Year: this.state.Year,
            Poster: this.state.Poster
        }


//make post request to this url using new obj newMovie
        axios.post('http://localhost:4000/api/movies', newMovie)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //in this function we created a form which has 3 text boxes for user
    //to input data for title,year & postre
    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type="text"
                            className='form-control'
                            value={this.state.Title}//initial value is now set as title
                            onChange={this.onChangeMovieTitle} //call this when value changes
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type="text"
                            className='form-control'
                            value={this.state.Year}//initial value now set as year
                            onChange={this.onChangeMovieYear}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Add Movie Poster: </label>
                        <textarea type="text"
                            className='form-control'
                            value={this.state.Poster}//inital value is now set as poster
                            onChange={this.onChangeMoviePoster}
                        ></textarea>
                    </div>

                    {/* button that saves input data */}
                    <div className="form-group">
                        <input type="submit"
                            value='Add Movie'
                            className='btn btn-primary'
                        ></input>
                    </div>
                </form>
            </div>
        );
    }
}