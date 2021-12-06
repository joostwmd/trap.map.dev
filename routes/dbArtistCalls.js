const router = require("express").Router();
const Artist = require('../models/Artist')

router.get("/map", (req, res, next) => {
    console.log("test map")
    Artist.find({})
         .then(artists => {
           res.status(200).json(artists)
         })
  
         .catch(err => next(err))
})

module.exports = router;
