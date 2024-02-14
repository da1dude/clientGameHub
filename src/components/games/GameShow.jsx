import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import WishForm from '../shared/WishForm'
import { createGame } from '../../api/game'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { Col, Row, Image, Button } from 'react-bootstrap';
import "./GameShow.css"





require('dotenv').config()


export default function GameShow(props) {
    const { msgAlert, user } = props

    const navigate = useNavigate()

    const [game, setGame] = useState([])
    const [wish, setWish] = useState({})
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

    if (!game) {
        return <LoadingScreen />
    }

    return (
        <Row className="mt-4 d-flex justify-content-center">
            <Col lg={10}>
                <h1 className="mb-4 text-center">{game.name}</h1>
                <Image fluid src={game.background_image} alt={game.name} className="mb-4 image" />
                <p className="mb-4">{game.description_raw}</p>
                <a href={game.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary ms-3 me-3 mb-3" style={{ color: 'white', borderColor: 'white' }}>
                    Visit Website
                </a>
                <br />
                {user ? (
                    <WishForm
                        wish={wish}
                        game={game}
                        user={user}
                        handleChange={onChange}
                        handleSubmit={onSubmit}
                        msgAlert={msgAlert}
                        heading="Add to Wishlist"
                    />
                ) : (
                    <p>Sign In to Add to Wishlist</p>
                )}
            </Col>
        </Row>
        )
    }