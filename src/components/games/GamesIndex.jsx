// this component is going to take functionality away from Home.js, and focus only on displaying a list of pets gathered from the database, via an API call
// used for updating state with api data
import {useState, useEffect} from 'react'
import axios from 'axios'
// used for rendering things
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingScreen from '../shared/LoadingScreen';

require('dotenv').config()


export default function GamesIndex(props) {

    const [games, setGames] = useState([])

    const { msgAlert } = props


    //settings for the slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        async function getGames() {
            try {
                const res = await axios.request(process.env.REACT_APP_RAWGGAMES + process.env.REACT_APP_KEY);// this is the API call
                console.log('This is the response: \n', res.data.results);// this is the API response
                setGames(res.data.results)

            } catch (error) {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'something went wrong!',
                    variant: 'danger'
                })
            }
        }
        getGames()  
    },[])

    if (!games) {
        return <LoadingScreen />
    }


    return (
        <>
        <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                <h2 className="text-center">Top 20 Games</h2>
                <Slider {...settings}>
                    {games.map((game) => (
                        <div key={game.id}>
                            <Card className="card mb-4">
                                <Card.Img style={{ height: '150px', objectFit: 'cover' }} variant="top" src={game.background_image} alt={game.name} />
                                <Card.Body>
                                    <h6>{game.name}</h6>
                                    <Card.Text>
                                        Rating: {game.rating}
                                    </Card.Text>
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/game/${game.id}`} className='btn btn-info' style={{ marginTop: '10px' }}>
                                            View
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}