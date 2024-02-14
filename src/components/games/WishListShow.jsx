// PETSHOW is our details page. The show page for a single pet
// this is where a LOT of our key functionality will exist
// we'll be building this component over time, as it will be the star component of our app.
// eventually, this is where we will give our pets toys
// this is where we will be able to update and delete them
// this will be rendered by it's own route -> pets/<id>
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneGame, removeGame, updateGame } from '../../api/game'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditWishModal from './EditGameModal'



const WishListShow = (props) => {
    const { id } = useParams()
    const { user, msgAlert } = props
    const [game, setGame] = useState(null)

    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getOneGame(user, id)
            .then(res => setGame(res.data.game))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])
    

    const setDelGame = () => {
        // we want to remove the pet
        removeGame(user, game._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteGameSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/games'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }


    return game ? (
        <>
            <main className="container row">
                <h4>{game.name}</h4>
                <img style={{ width: '60%', margin: 5}}
                        src={game.image}
                        alt={game.name}
                />
                <p>{game.description}</p>
                <hr />
                <p><strong>Your Note on the Game: </strong> {game.comment}</p>
                <hr />
                <Button
                    className='m-2'
                    variant='warning'
                    onClick={() => setEditModalShow(true)}
                >
                    Edit Comment
                </Button>
                <Button
                    className='m-2'
                    variant='danger'
                    onClick={() => setDelGame()}
                >
                    Remove
                </Button>
                <a href={game.website} target="_blank"> {game.website} </a>
            </main>
            <EditWishModal
                user={user}
                show={editModalShow}
                updateGame={updateGame}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                game={game}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    ) : null
}

export default WishListShow