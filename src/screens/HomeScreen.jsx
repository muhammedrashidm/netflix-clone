import React from "react";
import "./homescreen.css"
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import requests from "../request";
import Row from "../components/Row";
import { useState } from "react";

function HomeScreen() {
    const [movies, setmovies] = useState([]);

    function addMoviesToArray(arr) {

        setmovies((prevVal) => {
            return prevVal.concat(arr)
        })
    }

    return (
        <div>

            <NavBar movies={movies} />

            <Banner />

            <Row
                title="NETFLIX ORIGINAL"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
                dataReturnFunction={addMoviesToArray}
            />
            <Row
                title="TOP RATED"
                fetchUrl={requests.fetchTopRated}
                dataReturnFunction={addMoviesToArray}

            />
            <Row
                title="ROMANCE"
                fetchUrl={requests.fetchRomanceMovies}
                dataReturnFunction={addMoviesToArray}

            />
            <Row
                title="ACTION Movies"
                fetchUrl={requests.fetchActionMovies}
                dataReturnFunction={addMoviesToArray}

            />
            <Row
                title="COMODY"
                fetchUrl={requests.fetchComodyMovies}
                dataReturnFunction={addMoviesToArray}

            />
            <Row
                title="HORRER"
                fetchUrl={requests.FetchHorrerMovies}
                dataReturnFunction={addMoviesToArray}

            />
            <Row
                title="DOCUMENERIES"
                fetchUrl={requests.fetchDocumenteries}
                dataReturnFunction={addMoviesToArray}
                isLargeRow
            />


        </div>
    );
}













export default HomeScreen