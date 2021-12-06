import { useState, useEffect } from 'react'
import axios from 'axios'

function Playlists() {

    const API_URL = 'http://localhost:5005';

    const spotifyUsername = window.location.pathname.split("/")[1]
    const requestBodyGetUserPlaylists = {spotifyUsername}

    const trackID = window.location.pathname.split("/")[3]

    const createTrapMapPlaylist = () => {
        axios.get(`${API_URL}/spotifyUserCalls/createSpotifyPlaylist`)
            .then(res => {
                
        })
    }

    const addToClickedPlaylist = () => {
        const playlistID = "some playlist id"
        const requestBodyAddToSpotifyPlaylist = {playlistID, trackID}

        axios.post(`${API_URL}/spotifyUserCalls/addToSpotifyPlaylist`, requestBodyAddToSpotifyPlaylist)
            .then(res => {
                
        })
    }

    useEffect(() => {
        console.log("user", spotifyUsername)
        console.log("trackID", trackID)

        axios.post(`${API_URL}/spotifyUserCalls/getUserPlaylists`, requestBodyGetUserPlaylists)
            .then(res => {
                
        })

        addToClickedPlaylist()
    })



    return (
        <div>
            <h1>Playlists</h1>
            <button onClick={createTrapMapPlaylist}>create your personal trap map playlist for berlin</button>
        </div>
    )
}

export default Playlists
