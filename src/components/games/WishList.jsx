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
        <div className="container row">
            {games.map((game) => (
                <Card key={game.id} style={{ width: '30%', margin: 5}}>
                    <h3>{game.name}</h3>
                    <p>Rating: {game.rating}</p>
                    <div>
                        <img style={{ width: '60%', margin: 5}}
                            src={game.image}
                            alt={game.name}
                        />
                    </div>
                    <Link to={`/games/${game._id}`} className='btn btn-info'>
                        View {game.name}
                    </Link>
                </Card>
            ))}
        </div>
    ):null
}


export default WishList