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
export const getOneGame = (user, id) => {
    return axios({
        url: `${apiUrl}/games/${id}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
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

// UPDATE -> Adjust a game
export const updateGame = (user, updatedGame) => {
    return axios({
        url: `${apiUrl}/games/${updatedGame._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: updatedGame }
    })
}

// DELETE -> Set a pet free
export const removeGame = (user, id) => {
    return axios({
        url: `${apiUrl}/games/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}