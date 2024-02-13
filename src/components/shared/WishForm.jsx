import { Form, Button, Container } from 'react-bootstrap'
import { createGame } from '../../api/game'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'





const WishForm = (props) => {
    const { user, wish, game, handleChange, handleSubmit, msgAlert } = props

    console.log('this is wishform line 9', wish || game)




return (
    <>
    <Container>
    <Form onSubmit={handleSubmit}>
        <Form.Group >
            <Form.Label>Game Id</Form.Label>
            <Form.Control
                name="rawgId"
                id='rawgId'
                value={game.id || game.rawgId} 
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control
                name="name"
                id='name'
                value={game.name}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group >
            <Form.Label>Description</Form.Label>
            <Form.Control
                name="description"
                id='description'
                value={game.description_raw || game.description}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group >
            <Form.Label>image</Form.Label>
            <Form.Control
                name="image"
                id='image'
                value={game.background_image || game.image}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group >
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