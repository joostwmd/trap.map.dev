const SpotifyWebApi = require('spotify-web-api-node') 


const privateSpotifyApi = new SpotifyWebApi({
  ClientId: "25ecacddc59e4a3aadede77c0f93cf43", 
})


const getSpotifyUserInfo = (token) => {
    privateSpotifyApi.setAccessToken(token)
    const res = privateSpotifyApi.getMe()
        .then(function(data){
            return data.body
        }, function(err) {
            console.log('Something went wrong!', err);
        })
    return res
}



const checkIfFollowingArtist = (artistId) => {
    const res = privateSpotifyApi.isFollowingArtists([artistId, ])
        .then(function(data){
            return data.body
        }, function(err) {
            console.log('Something went wrong!', err);
        })

    return res
}

const followArtistsOnSpotify = (artistId) => {
    const res = privateSpotifyApi.followArtists([artistId, ])
        .then(function(data){
            console.log("followed on spotify")
        }, function(err){
            console.log('Something went wrong', err)
        })
    return res
}

const createSpotifyPlaylist = () => {
    const res = privateSpotifyApi.createPlaylist('trapmap berlin', { 'description': 'your favorite berlin trappers', 'public': true })
        .then(function(data) {
            console.log('created playlist')
        }, function(err) {
            console.log('Something went wrong', err)
        }) 
    return res      
}

const getUserPlaylists = (username) => {
    const res = privateSpotifyApi.getUserPlaylists(username)
        .then(function(data){
            return data.body.items
        }, function(err) {
            console.log('Something went wrong!', err);
        })
    return res
}

const addToSpotifyPlaylist = (playlistId, trackId) => {
    const res = privateSpotifyApi.addTracksToPlaylist(playlistId, trackId)
        .then(function(body) {
            console.log('Added tracks to playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    return res
}


module.exports = {getSpotifyUserInfo, checkIfFollowingArtist, followArtistsOnSpotify, createSpotifyPlaylist, getUserPlaylists, addToSpotifyPlaylist};