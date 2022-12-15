import axios from "axios";

const SEARCH_URL = 'https://omdbapi.com/?apikey=dd18948e&s='
const DETAILS_URL = 'https://omdbapi.com/?apikey=dd18948e&i='

export const findMovieBySearchTerm = async (term) => {
    const response = await axios.get(`${SEARCH_URL}${term}`)
    return response.data.Search
}

export const findMovieByImdbId = async (imdbID) => {
    const response = await axios.get(`${DETAILS_URL}${imdbID}`)
    return response.data
}