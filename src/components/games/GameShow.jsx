import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import WishForm from '../shared/WishForm'
import { createGame } from '../../api/game'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'

// used for rendering things
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

require('dotenv').config()


export default function GameShow(props) {
    const { msgAlert, user } = props

    const navigate = useNavigate()

    const [reload, setReload] = useState(true)
    const [game, setGame] = useState([])
    const [wish, setWish] = useState({
        // rawgId: `${game.id}`,       
        // name: `${game.name}`,
        // description: `${game.description_raw}`,
        // image: `${game.background_image}`,
        // rating: `${game.rating}`,
        // comment: ''
    })
    const onChange = (e) => {
        e.persist()
        setWish(prevWish => {
            console.log('this is onchange', e.target)
            const updatedName = e.target.name
            let updatedValue = e.target.value
            const updatedWish = { [updatedName] : updatedValue }
            // to keep all the old stuff, and add newly typed letter/numbers etc
            return {
                ...prevWish, ...updatedWish
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('this is wish',wish || game)
        createGame(user, wish || game)
            .then(res => { navigate(`/games/`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createWishSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }
    

    const { id } = useParams()

    useEffect(() => {

        async function getGame() {
            try {
                const res = await axios.request(process.env.REACT_APP_RAWGGAMES + `/${id}`+ process.env.REACT_APP_KEY);// this is the API call
                console.log('This is the response: \n', res.data);// this is the API response
                setGame(res.data) 
                setWish({
                    rawgId: `${res.data.id}`,       
                    name: `${res.data.name}`,
                    description: `${res.data.description_raw}`,
                    image: `${res.data.background_image}`,
                    rating: `${res.data.rating}`,
                    comment: ''
                })
            } catch (error) {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'something went wrong!',
                    variant: 'danger'
                })
            }
        }
        getGame()  
    },[])

    return (
        <>
        <main className="container row">
            <h4>{game.name}</h4>
            <img style={{ width: '60%', margin: 5}}
                    src={game.background_image}
                    alt={game.name}
            />
            <p>{game.description_raw}</p>
            <a href={game.website} target="_blank"> {game.website} </a>
        </main>
        { user 
            ?
            <WishForm
                wish={wish}
                game={game}
                user={user}
                handleChange={onChange}
                handleSubmit={onSubmit}
                msgAlert={msgAlert}
                heading="Add Wishlist Item"
            />
            : 
            <p>Sign In to add items to your wish list!</p>
        }
        </>
        )
    }