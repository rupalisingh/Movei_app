import React, { Component } from 'react'
import About from './About'
import Home from './Home'
import { getMovies } from './MovieService'
import axios from 'axios'

export default class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            currSearchText: "",
            //filterMovies: getMovies()
            currPage: 1,
            limit: 4,
            genres: [{ _id: 'abcd', name: 'All Genres' }],
            currGenre: 'All Genres'
        }
    }

    async componentDidMount() {
        let data = await axios.get('https://backend-react-movie.herokuapp.com/movies')
        let genreresult = await axios.get('https://backend-react-movie.herokuapp.com/genres')
        console.log(genreresult.data.genres)
        this.setState({
            movies: data.data.movies,
            genres: [...this.state.genres, ...genreresult.data.genres]
        })
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

    sortByRatings = (e) => {
        let className = e.target.className
        let sortedMovies = []
        if (className == 'fas fa-sort-up') {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate
            })
        } else {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate
            })
        }

        this.setState({
            movies: sortedMovies
        })
    }

    sortByStock = (e) => {
        let className = e.target.className
        let sortedMovies = []
        if (className == 'fas fa-sort-up') {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.numberInStock - movieObjB.numberInStock
            })
        } else {
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.numberInStock - movieObjA.numberInStock
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currPage: pageNumber })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGenre : genre
        })
    }
    render() {
        let { movies, currSearchText, currPage, limit, genres, currGenre } = this.state
        let filterMovies = []
        if (currSearchText != '') {
            filterMovies = this.state.movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase()
                return title.includes(currSearchText.toLowerCase())
            })
        } else {
            filterMovies = movies
        }

        if(currGenre != 'All Genres'){
            filterMovies = filterMovies.filter(function(movieObj){
                return movieObj.genre.name == currGenre
            })
        }
        let numberofPages = Math.ceil(filterMovies.length / limit)
        let pageNumberArr = []
        for (let i = 0; i < numberofPages; i++) {
            pageNumberArr.push(i + 1)
        }

        let si = (currPage - 1) * limit
        let ei = si + limit
        filterMovies = filterMovies.slice(si, ei)

        return (
            <>
                {
                    this.state.movies.length == 0 ? <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                        <div className='row'>
                            <div className='col-3'>
                                <ul class="list-group">
                                    {
                                        genres.map((genreObj) => (
                                            <li onClick = {() => this.handleGenreChange(genreObj.name)} key = {genreObj._id} className = 'list-group-item'>
                                                {genreObj.name}
                                            </li>
                                        ) )
                                    }
                                </ul>
                                <h5>Current Genre : {currGenre}</h5>
                            </div>
                            <div className='col-9'>
                                <input onChange={this.handleChange} type='text'></input>
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">
                                                Stock
                                                <i onClick={this.sortByStock} className="fas fa-sort-up"></i>
                                                <i onClick={this.sortByStock} className="fas fa-sort-down"></i>
                                            </th>
                                            <th scope="col">
                                                Rating
                                                <i onClick={this.sortByRatings} className="fas fa-sort-up"></i>
                                                <i onClick={this.sortByRatings} className="fas fa-sort-down"></i>
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
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        {
                                            pageNumberArr.map((pageNumber) => {
                                                let classStyle = pageNumberArr == currPage ? 'page-item active' : 'page-item';
                                                return (
                                                    <li key={pageNumber} onClick={() => this.handlePageChange(pageNumber)} className={classStyle}><span className="page-link">{pageNumber}</span></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}


{/* <li className="page-item active" aria-current="page">
                                <span className="page-link">1</span>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li> */}