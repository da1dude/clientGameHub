import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneGame, removeGame, updateGame } from '../../api/game'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditWishModal from './EditGameModal'
import { Col, Row, Image } from 'react-bootstrap';



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
        <Row className="ms-4 me-4 mb-4 justify-content-center">
            <Col lg={10}>
                <h1 className="mb-4 text-center">{game.name}</h1>
                <Image fluid src={game.image} alt={game.name} className="mb-4 image" />
                <div>
                    <div className="d-inline-flex justify-content-center">
                        <Button
                            className="me-3 mb-3"
                            variant="outline-primary"
                            style={{ color: 'white', borderColor: 'white' }}
                            onClick={() => setDelGame()}
                        >
                            Remove From Wishlist
                        </Button>
                        <Button href={game.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            variant="outline-primary" 
                            className="me-3 mb-3"
                            style={{ color: 'white', borderColor: 'white' }}>
                                Website
                        </Button>
                        <p className="mb-4 me-4">Rating: {game.rating}</p>
                        <p className="mb-4">Release Date: {game.released}</p>
                    </div>
                </div>
                <div className="d-inline-flex justify-content-center">
                    <Button
                        className="me-3 mb-3"
                        variant="outline-primary"
                        style={{ color: 'white', borderColor: 'white' }}
                        onClick={() => setEditModalShow(true)}
                    >
                        Edit Comment
                    </Button>
                    <p><strong>Your comment: </strong> {game.comment}</p>
                </div>
                <p className="mb-4">{game.description}</p>
                <EditWishModal
                        user={user}
                        show={editModalShow}
                        updateGame={updateGame}
                        msgAlert={msgAlert}
                        handleClose={() => setEditModalShow(false)}
                        game={game}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                    />

            </Col>
        </Row>
    ) : null
}

export default WishListShow