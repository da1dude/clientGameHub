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
            <h2 className="mb-4 text-center">Top 20 Games</h2>
            <div className="row">
                {games.map((game) => (
                    <div className="col-md-4" key={game.id}> {/* Use col-md-4 to split the row into 3 columns */}
                        <Card className="card mb-4"> {/* Add mb-4 for some margin at the bottom */}
                            <Card.Img style={{ height: '200px', objectFit: 'cover' }} variant="top" src={game.background_image} alt={game.name} />
                            <Card.Body>
                                <h6>{game.name}</h6>
                                <Card.Text>
                                    Rating: {game.rating}
                                </Card.Text>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/game/${game.id}`} className='text-center btn btn-info'>
                                        View {game.name}
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}