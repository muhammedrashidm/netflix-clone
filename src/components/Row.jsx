import axios from '../axios';
import React, { useEffect, useState } from 'react'

import './row.css'

function Row({ title, fetchUrl, isLargeRow, dataReturnFunction }) {
    const [movies, setMovies] = useState([]);
    const base_url = 'https://image.tmdb.org/t/p/original'

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
 console.log('Movie Data =================> ' +JSON.stringify(request.data) + '===========');
            setMovies(request.data.results)
            dataReturnFunction(request.data.results)
            return request
        }

        fetchData();
    }, [fetchUrl])


    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(
                    (movie) => {

                        return (((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                                <div className="name">
                                    <img className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />

                                </div>

                            ))
                    })}
            </div>

        </div>
    )
}

export default Row
