import React, { Component } from 'react'
import { getMovies } from './MovieService'


export default class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: getMovies(),
            currSearchText: "",
            //filterMovies: getMovies()
        }
    }

    onDelete = (id) => {
        let filterarr = this.state.movies.filter(movieObj => {
            return movieObj._id != id
        })

        this.setState({
            movies: filterarr
        })
    }
    handleChange = (e) => {
        let val = e.target.value
        this.setState({
            currSearchText: val
        })
        // if (val == '') {
        //     this.setState({
        //         filterMovies: this.state.movies,
        //         currSearchText: ''
        //     })
        //     return
        // }
        // let filteredArr = this.state.movies.filter(movieObj => {
        //     let title = movieObj.title.trim().toLowerCase()
        //     return title.includes(val.toLowerCase())
        // })

        // this.setState({
        //     filterMovies : filteredArr,
        //     currSearchText : val
        // })
    }
    render() {
        let { movies, currSearchText } = this.state
        let filterMovies = []
        if (currSearchText != '') {
            filterMovies = this.state.movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase()
                return title.includes(currSearchText.toLowerCase())
            })
        } else {
            filterMovies = movies
        }
        return (
            <div className='row'>
                <div className='col-3'>Hello World</div>
                <div className='col-9'>
                    <input onChange={this.handleChange} type='text'></input>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">
                                    Stock
                                    <i className="fas fa-sort-up"></i>
                                    <i className="fas fa-sort-down"></i>
                                </th>
                                <th scope="col">
                                    Rating
                                    <i className="fas fa-sort-up"></i>
                                    <i className="fas fa-sort-down"></i>
                                </th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterMovies.map(movieObj => (
                                    <tr scope='row' key={movieObj._id}>
                                        <td>{movieObj.title}</td>
                                        <td>{movieObj.genre.name}</td>
                                        <td>{movieObj.numberInStock}</td>
                                        <td>{movieObj.dailyRentalRate}</td>
                                        <td><button onClick={() => this.onDelete(movieObj._id)} type="button" className="btn btn-danger">Delete</button></td>

                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
