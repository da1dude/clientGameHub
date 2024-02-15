import "./Home.css"

const Home = () => {

	return (
		<div className="">
			<h1 className="text-center">Welcome to GameHub</h1>
			<br />
			<div className="ms-4 me-4">
				<h4 >Welcome to GameHub, where you can explore a vast collection of over 
					500,000 games meticulously curated from our extensive database. Whether 
					you're seeking the latest releases or timeless classics, our platform offers an 
					unparalleled browsing experience.
				</h4> 
				<br />
				<h4>Create a personalized Wishlist to meticulously organize and keep track of the 
					games you aspire to play next. Utilize our intuitive search feature to effortlessly 
					discover the titles you're searching for, ensuring a seamless and 
					enjoyable gaming journey.
				</h4>
				<br />
				<h4>Thank you for choosing GameHub. We're here to elevate your gaming experience 
					and help you uncover new adventures. 
				</h4>
				<br />
				<br />	
				<h4 className="text-center">Happy gaming!</h4>
			</div>
			<div className="powered-by me-2">
				<p><strong>Powered by:</strong> rawg.io</p>
			</div>
		</div>
	)
}

export default Home
