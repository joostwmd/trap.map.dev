import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ArtistProfile() {

    const API_URL = 'http://localhost:5005';
    const CLIENT_URL = 'http://localhost:3000'

    const artistDB = window.location.pathname.split("/")[2]
    const requestBody = {artistDB}

    const [info, setInfo] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [releasedMuisc, setReleasedMusic] = useState([])


    const countTracks = (albums) => {
        let trackCount = 0
        let singlesCount = 0
        let albumCount = 0

        for (let album of albums){
            if (album.album_type === "single"){
                trackCount++
                singlesCount++
            } else if (album.album_type === "album"){
                trackCount += album.total_tracks
                albumCount++
            }
        }


        return [trackCount, singlesCount, albumCount]
    }

    useEffect(() => {
        axios.post(`${API_URL}/spotifyArtistCalls/getInfo`, requestBody)
            .then(res => {
                console.log("info", res)
                setInfo(res.data)
            })

        axios.post(`${API_URL}/spotifyArtistCalls/getTopTracks`, requestBody)
            .then(res => {
                console.log("topTracks", res)
                setTopTracks(res.data)
            })
        
        axios.post(`${API_URL}/spotifyArtistCalls/getAlbums`, requestBody)
            .then(res => {
                console.log("albums", res)
                setReleasedMusic(countTracks(res.data))
                
            })


        //user related

        axios.post(`${API_URL}/spotifyUserCalls/getMe`, requestBody)
            .then(res => {
              
                
        })

        axios.post(`${API_URL}/spotifyUserCalls/checkIfFollowingArtist`, requestBody)
            .then(res => {
                
            })


            
    }, [])

    return (
        <div>
            <h1>{info.name}</h1>
            <h3>published on spotify</h3>
            <h5>tracks : {releasedMuisc[0]}, singles : {releasedMuisc[1]}, albums : {releasedMuisc[2]}</h5>
            {topTracks.map(track => {
                if (track.preview_url !== null){
                    return (
                        <div>
                            <h3>{track.name}</h3>
                            <audio controls>
                                <source src={track.preview_url} />
                            </audio>
                            {/* <a href={`${CLIENT_URL}/${spotifyUsername}/playlists/${track.id}`}>
                                <button>add to playlist</button>
                            </a> */}

                            <a href={`${CLIENT_URL}/joostwmd/playlists/${track.id}`}>
                                <button>add to playlist</button>
                            </a>

                        </div>
                )
                }
            })}
        </div>
    )
}

export default ArtistProfile
