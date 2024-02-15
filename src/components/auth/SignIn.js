import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    let credentials
    let userName

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        if (email.includes('@')) {
            credentials = {email, password}
        } else {
            userName = email
            credentials = {userName, password}
        }

		signIn(credentials)
			.then((res) => {
                setUser(res.data.user)
                // to store a JSON string in localStorage, 
                // which has a function called 'setItem'
                const userJSON = JSON.stringify(res.data.user)
                // localStorage.setItem takes 2 arguments -> name of the data, value
                localStorage.setItem('user', userJSON)
            })
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	    }

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='userName'
                            name='email'
                            value={email}
                            placeholder='Enter email or userName'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button 
                        variant="outline-primary" 
                        className="mt-2 me-3 mb-3"
                        style={{ color: 'white', borderColor: 'white' }}
                        type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn