// this component is going to take functionality away from Home.js, and focus only on displaying a list of pets gathered from the database, via an API call
// used for updating state with api data
import {useState, useEffect} from 'react'
import { getAllGames } from "../../api/game"
// used for rendering things
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const WishList = (props) => {
    const [games, setGames] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert, user } = props

	useEffect(() => {
		getAllGames(user)
			.then(res => {
                console.log('games from axios call: \n', res.data.games)
				setGames(res.data.games)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'something went wrong!',
                    variant: 'danger'
                })
            })
	}, [])



    return games ? (
        <>
            <h2 className="mb-4 text-center">Your Wishlist</h2>
            <div className="row">
                {games.map((game) => (
                    <div className="col-md-4" key={game.id}> {/* Use col-md-4 to split the row into 3 columns */}
                        <Card className="card mb-4"> {/* Add mb-4 for some margin at the bottom */}
                            <Card.Img style={{ height: '200px', objectFit: 'cover' }} variant="top" src={game.image} alt={game.name} />
                            <Card.Body>
                                <h6><strong>{game.name}</strong></h6>
                                <Card.Text>
                                    Rating: {game.rating}
                                </Card.Text>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/games/${game._id}`} className="btn btn-outline-primary me-3 mb-3" style={{ color: 'white', borderColor: 'white', backgroundColor: 'transparent',  }}>
                                        View {game.name}
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    ):null
}


export default WishList