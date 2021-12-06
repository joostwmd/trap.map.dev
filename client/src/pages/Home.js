import { useState, useEffect } from 'react'
import axios from 'axios'

import { spotifyAuthUrl } from '../services/spotifyAuth'

function Home() {

    const API_URL = 'http://localhost:5005';

    useEffect(() => {
        axios.get(`${API_URL}/token/publicToken`)
    })
    
    return (
        <div>
            <h1>trap map</h1>
            <a href={spotifyAuthUrl}>login</a>
        </div>
    )
}

export default Home