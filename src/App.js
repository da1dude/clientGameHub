// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import "./App.css"
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import GamesIndex from './components/games/GamesIndex'
import GameShow from './components/games/GameShow'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import WishList from './components/games/WishList'
import WishListShow from './components/games/WishListShow'
import SearchBar from './components/SearchBar/SearchBar'

const App = () => {
  const [results, setResults] = useState([])

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  useEffect(() => {
	// access localStorage
	const loggedInUser = localStorage.getItem('user')

	if (loggedInUser) {
		// we need to parse the json string
		const foundUser = JSON.parse(loggedInUser)
		// then set that saved user in state
		setUser(foundUser)
	}
}, [])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)

  const clearUser = () => {
	console.log('clear user ran')
	// to clear the user saved in local storage
	localStorage.removeItem('user')
	// to clear the user saved in state
	setUser(null)
}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<SearchBar setResults={setResults}/>
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route 
						path='/all-games' 
						element={<GamesIndex msgAlert={msgAlert} user={user} />} />
					<Route 
					path='/games'
					element={
					<RequireAuth user={user}>
						<WishList msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
					}
					/>
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route 
						path='/game/:id' 
						element={<GameShow msgAlert={msgAlert} user={user} />} />
					<Route 
						path='/games/:id'
						element={
						<RequireAuth user={user}>
							<WishListShow msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
					/>
					
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				
				))}
			</Fragment>
		)
}

export default App
