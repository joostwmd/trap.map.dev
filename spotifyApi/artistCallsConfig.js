const SpotifyWebApi = require('spotify-web-api-node') 


const publicSpotifyApi = new SpotifyWebApi({
  ClientId: "25ecacddc59e4a3aadede77c0f93cf43", 
})

const setPublicSpotifyApiToken = (token) => {
    publicSpotifyApi.setAccessToken(token)
}


const getArtistInfo = (token, artistId) => {
    publicSpotifyApi.setAccessToken(token)
    const res = publicSpotifyApi.getArtist(artistId)
        .then(function(data){
            return data.body
        }, function(err){
            console.log('Something went wrong', err)
        })
    return res
}

const getArtistTopTracks = (token, artistId) => {
    publicSpotifyApi.setAccessToken(token)
    const res = publicSpotifyApi.getArtistTopTracks(artistId, "DE")
        .then(function(data){
            return data.body.tracks
        }, function(err){
            console.log('Something went wrong!', err)
        })
    return res
}

const getArtistAlbums = (token, artistId) => {
    publicSpotifyApi.setAccessToken(token)
    const res = publicSpotifyApi.getArtistAlbums(artistId)
        .then(function(data){
            return data.body.items
        }, function(err){
            console.log('Something went wrong!', err)
        })
    return res
}

const getAlbumTracks = (albumId) => {
    const res = publicSpotifyApi.getAlbumTracks(albumId, {limit : 30, offset : 0})
        .then(function(data) {
            console.log("x", data.body)
            return data.body
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    
    return res
}

module.exports = {setPublicSpotifyApiToken, getArtistInfo, getArtistTopTracks, getArtistAlbums, getAlbumTracks}