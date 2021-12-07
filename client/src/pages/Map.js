import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactMapGl, {Marker} from "react-map-gl"


function Map() {
    
    const berlinViewport = {
        latitude : 52.520008, 
        longitude : 13.404954,
        width : "100w",
        height : "100vh",
        zoom : 9,
        berlinBounds : [[13.192625881080286, 52.38949809002746], [13.659758765765956, 52.64256574061617]]
    }


    
    const [viewport, setViewport] = useState(berlinViewport)
    const [allArtists, setAllArtists] = useState([])
    const API_URL = 'http://localhost:5005';




    useEffect(() => {
        axios.get(`${API_URL}/db/map`)
            .then(res => {
                console.log("all artists", res)
                setAllArtists(res.data)
                // => spotify name and picture already in db
            })

        
    }, [])

    const isOutOfMaxBounds = (latitude, longitude, maxBounds) => {
        const [[swLng, swLat], [neLng, neLat]] = maxBounds;
    
        return longitude < swLng || longitude > neLng || latitude < swLat || latitude > neLat;
    };


    return (
            <div>
                <ReactMapGl
                    {...viewport}
                    mapboxApiAccessToken = "pk.eyJ1Ijoiam9vc3R3bWQiLCJhIjoiY2t1NDQ3NmJqMXRwbzJwcGM5a3FuY3B3dCJ9.yyon_mO5Y9sI1WgD-XFDRQ"
                    mapStyle = "mapbox://styles/joostwmd/ckvwifepf21kj15pflu8gbkdd"

                    onViewportChange={newViewport => {
                        if (!isOutOfMaxBounds(
                            newViewport.latitude,
                            newViewport.longitude,
                            berlinViewport.berlinBounds
                        ))
                        {
                            setViewport(newViewport)
                        }
                    }}
                >
                    {allArtists.map(artist => {
                        return (
                            <Marker
                                latitude={artist.coordinates[1]}
                                longitude={artist.coordinates[0]}
                            >
                                <Link to={`${artist._id}`}>
                                    <h3>{artist.name}</h3>
                                </Link>
                            </Marker>
                    )})}
                </ReactMapGl>
            </div>
    )
    
}
export default Map
