import React from 'react';//imported when class extended
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export class MovieItem extends React.Component { //extending react class Component

    constructor(){
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);//bind instance of this class to delete movie
    }

    DeleteMovie(e){
        e.preventDefault(); // stops method being called every time page is loaded
        console.log("Delete: " + this.props.movie._id);

        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)
        .then(()=>{
            this.props.ReloadData();//calling reloadMethod from parent class
        })
        .catch();
    }

    render() {
        return (
            <div>
                {/*Added read component  */}
                {/* Embedded movie component in read component */}
                {/*Then Passed data from read component using our state obkect  */}


                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">

                            <img src={this.props.movie.Poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                <h4>{this.props.movie.Year}</h4>
                            </footer>
                        </blockquote>
                    </Card.Body>
                    
                    <Button>Edit </Button>
                    <Button variant = "danger" onClick = {this.DeleteMovie}>Delete</Button>
                </Card>

            </div >
        );
    }
}