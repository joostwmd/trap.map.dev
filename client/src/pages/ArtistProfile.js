import { useState, useEffect } from 'react'
import axios from 'axios'

function ArtistProfile() {

    const API_URL = 'http://localhost:5005';
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
        axios.post(`${API_URL}/spotifyArtistCalls/map/${artistDB}/getInfo`, requestBody)
            .then(res => {
                console.log("info", res)
                setInfo(res.data)
            })

        axios.post(`${API_URL}/spotifyArtistCalls/map/${artistDB}/getTopTracks`, requestBody)
            .then(res => {
                console.log("topTracks", res)
                setTopTracks(res.data)
            })
        
        axios.post(`${API_URL}/spotifyArtistCalls/map/${artistDB}/getAlbums`, requestBody)
            .then(res => {
                console.log("albums", res)
                setReleasedMusic(countTracks(res.data))
                
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
                        </div>
                )
                }
            })}
        </div>
    )
}

export default ArtistProfile
