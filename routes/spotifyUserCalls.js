const router = require("express").Router();
const Artist = require('../models/Artist')


const spotifyFetchTokens = require('../spotifyApi/fetchTokensConfig')
const spotifyApiArtistCalls = require('../spotifyApi/artistCallsConfig')

//getSpotifyUserInfo, checkIfFollowingArtist, followArtistsOnSpotify, createSpotifyPlaylist, getUserPlaylists, addToSpotifyPlaylist

router.post("/getMe", (req, res, next) => {
    console.log("test getMe")
})


router.post("/checkIfFollowingArtist", (req, res, next) => {
    console.log("test checkFollowArtist")
})

router.post("/followArtist", (req, res, next) => {
    console.log("test followArtist")
})

router.get("/createSpotifyPlaylist", (req, res, next) => {
    console.log("test createSpotifyPlaylist")
})

router.post("/getUserPlaylists", (req, res, next) => {
    console.log("test getUserPlaylists", req.body.spotifyUsername)
})

router.post("/addToSpotifyPlaylist", (req, res, next) => {
    console.log("test addToSpotifyPlaylist", req.body.playlistID, req.body.trackID)
})


module.exports = router;