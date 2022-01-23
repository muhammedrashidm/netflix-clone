import React from 'react'
import NavBar from '../components/NavBar'

function SearchResult(props) {
    return (
        <div className="search_result">
            <NavBar />
            <div className="container">
                {props.movies}
            </div>
        </div>

    )
}

export default SearchResult
