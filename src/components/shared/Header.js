import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/games' style={linkStyle}>
				Wish List
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='/all-games' style={linkStyle}>
				Games
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg="dark" data-bs-theme="dark" expand='md' className="border border-white">
		<Navbar.Brand className='ms-4'>
            <Link to='/' style={linkStyle}>
                GameHub
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ms-auto me-4'>
				{user && (
					<span className='navbar-text'>Welcome, {user.userName}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
