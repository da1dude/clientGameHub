import { Form, Button, Container } from 'react-bootstrap'
import { createGame } from '../../api/game'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'



const WishForm = (props) => {
    const { user, wish, game, handleChange, msgAlert } = props
    const navigate = useNavigate()
    console.log('this is wishform line 9',wish)

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('this is wish',wish)
        createGame(user, wish)
            .then(res => { navigate(`/game/${game.id}`)})
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


return (
    <>
    <Container>
    <Form onSubmit={onSubmit}>
        <Form.Group hidden>
            <Form.Label>Id</Form.Label>
            <Form.Control
                name="rawgId"
                id='rawgId'
                value={game.id}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group hidden>
            <Form.Label>Name</Form.Label>
            <Form.Control
                name="name"
                id='name'
                value={game.name}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group hidden>
            <Form.Label>Description</Form.Label>
            <Form.Control
                name="description"
                id='description'
                value={game.description_raw}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group hidden>
            <Form.Label>image</Form.Label>
            <Form.Control
                name="image"
                id='image'
                value={game.background_image}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group hidden>
            <Form.Label>Score</Form.Label>
            <Form.Control
                name="rating"
                id='rating'
                value={game.rating}
                onChange={handleChange}
            />
        </Form.Group>
        <Button type="submit">Add to Wish List</Button>
        <Form.Group>
            <Form.Label>Add a comment for {game.name}</Form.Label>
            <Form.Control
                name="comment"
                id='comment'
                value={game.comment}
                onChange={handleChange}
            />
        </Form.Group>
        
    </Form>
    </Container>
    <br />
    <br />
    <br />
    </>
    )
}
export default WishForm