const router = require("express").Router();

const User = require('../models/User')


const spotifyFetchTokens = require('../spotifyApi/fetchTokensConfig')
const spotifyUserCalls = require('../spotifyApi/userCallsConfig')


router.get("/publicToken", (req, res, next) => {
  spotifyFetchTokens.fetchPublicToken()
    .then(res => {
        console.log("public token", res)
    })
});

router.post("/callback", (req, res, next) => {
  console.log("test callback")
  const queryString = req.body.queryString
  
  const code = spotifyFetchTokens.getCodeFromRedirect(queryString)
  
  spotifyFetchTokens.fetchPrivateToken(code)
    .then(tokenData => {
      console.log("private_tokens", tokenData)
      
      
      spotifyUserCalls.getSpotifyUserInfo(tokenData.access_token)
        .then(userData => {
          const spotifyID = userData.id

          User.findOne({spotifyID : spotifyID})
            .then(userFromDB => {
              if (userFromDB !== null){
                //has logged in before => start session
                console.log("user logged in", userFromDB)

                 const private_token = tokenData.access_token
                 const refresh_token = tokenData.refresh_token
                 
              } else {
                User.create({name : data.display_name, spotifyID : data.id, spotifyProduct : data.product})
                  .then(createdUser => {
                    console.log("user created", createdUser)
                    //now start session
                    req.session.user = createdUser
                  })
              }
            })
        })
    })
})


// router.post("/refresh", (req, res, next) => {
//   console.log("test refresh")
//   spotifyFetchTokens.getRefreshToken(REFRESHTOKEN HERE)
//     .then(res => {
//       console.log("refreshed_private_token", res)
//     })
// })



module.exports = router;
