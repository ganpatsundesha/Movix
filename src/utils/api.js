import axios from 'axios';
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwZWI2MmFjZGYzMmM5MjE4OGJmZjNjYjMyYjBkMCIsInN1YiI6IjY1YTc5YjU0MDViNTQ5MDBjOGE4MTgwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UK4Wvhjs8myc_SZo8WMr4iNKbGa3u02ET89hXwU30D0";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error
    }
}