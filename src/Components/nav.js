import React, { Component } from 'react'
import {Link} from 'react-router-dom'

function Nav() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" >Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <Link to = '/'>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" >Home</a>
                            </li>
                            </Link>
                            <Link to = '/Movies'>
                            <li className="nav-item">
                                <a className="nav-link" >Movies</a>
                            </li>
                            </Link>
                            <Link to = '/About'>
                            <li className="nav-item">
                                <a className="nav-link" >About</a>
                            </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }


export default Nav
