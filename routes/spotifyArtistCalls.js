const router = require("express").Router();
const Artist = require('../models/Artist')
const spotifyFetchTokens = require('../spotifyApi/fetchTokensConfig')
const spotifyApiArtistCalls = require('../spotifyApi/artistCallsConfig')


router.post("/map/:artistDB/getInfo", (req, res, next) => {

    spotifyFetchTokens.fetchPublicToken()
        .then(token => {
            Artist.findById(req.body.artistDB)
                .then(artist => {
                    var spotifyID = artist.spotifyID
                    spotifyApiArtistCalls.getArtistInfo(token, spotifyID)
                        .then(info => {
                            res.status(200).json(info)
                        })
                })
                .catch(err => next(err)) 
                })
})


router.post("/map/:artistDB/getTopTracks", (req, res, next) => {

    spotifyFetchTokens.fetchPublicToken()
        .then(token => {
            Artist.findById(req.body.artistDB)
                .then(artist => {
                    var spotifyID = artist.spotifyID
                    spotifyApiArtistCalls.getArtistTopTracks(token, spotifyID)
                        .then(topTracks => {
                            res.status(200).json(topTracks)
                        })
                })
                .catch(err => next(err)) 
                })
})

router.post("/map/:artistDB/getAlbums", (req, res, next) => {

    spotifyFetchTokens.fetchPublicToken()
        .then(token => {
            Artist.findById(req.body.artistDB)
                .then(artist => {
                    var spotifyID = artist.spotifyID
                    spotifyApiArtistCalls.getArtistAlbums(token, spotifyID)
                        .then(albums => {
                            res.status(200).json(albums)
                        })
                })
                .catch(err => next(err)) 
                })
})


module.exports = router;