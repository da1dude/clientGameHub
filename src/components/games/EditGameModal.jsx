import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import WishForm from '../shared/WishForm'
import messages from '../shared/AutoDismissAlert/messages'


const EditGameModal = (props) => {

    const { user, show, handleClose, updateGame, msgAlert, triggerRefresh } = props

    const [game, setGame] = useState(props.game)

    const onChange = (e) => {
        e.persist()

        setGame(prevGame => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedGame = { [updatedName] : updatedValue }
            return {
                ...prevGame, ...updatedGame
            }
        })
    }
    console.log('this is user', user)
    const onSubmit = (e) => {
        e.preventDefault()
        // make the API call
        updateGame(user, game)
            // close the modal
            .then(() => handleClose())
            // message the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateGameSuccess,
                    variant: 'success'
                })
            })
            // trigger a refresh
            .then(() => triggerRefresh())
            // send error message if applicable
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }
    console.log('this is user after submit', user)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <WishForm 
                    user={user}
                    game={game}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Game"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditGameModal