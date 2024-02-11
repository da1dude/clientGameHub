import GamesIndex from "./games/GamesIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<GamesIndex />
		</>
	)
}

export default Home
