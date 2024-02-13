import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// axios default functionality is to send a GET request
export const getAllGames = (user) => {
    return axios({
        url: `${apiUrl}/games`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

// READ -> Show
export const getOneGame = (id) => {
    return axios(`${apiUrl}/games/${id}`)
}

// CREATE -> Add a pet
// API calls with axios that are not a simple GET, require a config object
// that config object needs a url, method, and any auth headers if necessary
export const createGame = (user, newWish) => {
    return axios({
        url: `${apiUrl}/games`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: newWish }
    })
}