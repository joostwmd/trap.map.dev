import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Map() {
    
    const [allArtists, setAllArtists] = useState([])
    const [info, setInfo] = useState([])
    const API_URL = 'http://localhost:5005';

    useEffect(() => {
        axios.get(`${API_URL}/db/map`)
            .then(res => {
                console.log("all artists", res)
                setAllArtists(res.data)
                // => spotify name and picture already in db
            })

        
    }, [])

    if (allArtists.length === 0){
        return (
            <div>
                <h1>map</h1>
            </div>
        )
    }

    if (allArtists.length !== 0){
        return (
            <div>
                <h1>map</h1>
                {allArtists.map(artist => {
                    return (
                        <Link to={`${artist._id}`}>
                            <h3>{artist.name}</h3>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

export default Map
