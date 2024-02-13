// this component is going to take functionality away from Home.js, and focus only on displaying a list of pets gathered from the database, via an API call
// used for updating state with api data
import {useState, useEffect} from 'react'
import axios from 'axios'
// used for rendering things
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

require('dotenv').config()


export default function GamesIndex(props) {

    const [reload, setReload] = useState(true)
    const [games, setGames] = useState([])

    const { msgAlert } = props

    useEffect(() => {
        async function getGames() {
            try {
                const res = await axios.request(process.env.REACT_APP_RAWGGAMES + process.env.REACT_APP_KEY);// this is the API call
                console.log('This is the response: \n', res.data.results);// this is the API response
                setGames(res.data.results) 
            } catch (error) {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'something went wrong!',
                    variant: 'danger'
                })
            }
        }
        getGames()  
    },[])

    return (
        <>
        <h2>Games Catalog</h2>
        <div className="container row">
            {games.map((game) => (
                <Card key={game.id} style={{ width: '30%', margin: 5}}>
                    <h4>{game.name}</h4>
                    <p>Rating: {game.rating}</p>
                    <div>
                        <img style={{ width: '60%', margin: 5}}
                            src={game.background_image}
                            alt={game.name}
                        />
                    </div>
                    <Link to={`/game/${game.id}`} className='btn btn-info'>
                        View
                    </Link>
                </Card>
            ))}
        </div>
        </>
        )
    }