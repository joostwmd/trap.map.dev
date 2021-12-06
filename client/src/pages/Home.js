import { useState, useEffect } from 'react'
import axios from 'axios'

import { spotifyAuthUrl } from '../services/spotifyAuth'

function Home() {
    
    return (
        <div>
            <h1>trap map</h1>
            <a href={spotifyAuthUrl}>login</a>
        </div>
    )
}

export default Home