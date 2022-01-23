import axios from "axios"

//55deecf411ca1c52b9d36768cc97c4c0
//https://api.themoviedb.org/3/movie/550?api_key=55deecf411ca1c52b9d36768cc97c4c0

const instence = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default instence