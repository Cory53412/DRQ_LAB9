import React from 'react';
//imported when class extended
import { Movies } from './movies';
import axios from 'axios';//retrives information

export class Read extends React.Component { //extending react class Component
    
    constructor(){
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }
    
    //empty array to store all movies
    state = {
        movies: []
    };
    //when component is visible in webpage, runs this method
    componentDidMount() {
        // gets json data for movies
        axios.get('http://localhost:4000/api/movies')
            .then((response) => {
                this.setState({ movies: response.data })//updates movies with array with retrived data
            })
            .catch((error) => {
                console.log(error)//logs error to console
            }
            );
    }

    ReloadData(){
          // gets json data for movies
          axios.get('http://localhost:4000/api/movies')
          .then((response) => {
              this.setState({ movies: response.data })//updates movies with array with retrived data
          })
          .catch((error) => {
              console.log(error)//logs error to console
          }
          );


    }

    render() {
        return (
            <div>
                <h1>Hello from read component</h1>
                {/* //heading is displayed on Footer component */}

                {/* Create object where info is passed from movies*/}
                <Movies movies={this.state.movies} ReloadData = {this.ReloadData} ></Movies>
            </div>
        );
    }
}