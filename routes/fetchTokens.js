const router = require("express").Router();
const spotifyFetchTokens = require('../spotifyApi/fetchTokensConfig')


router.get("/publicToken", (req, res, next) => {
  spotifyFetchTokens.fetchPublicToken()
    .then(res => {
      console.log("public_token", res)

      var public_token = res
      //res.cookie("public_token", public_token)
    })
});

router.post("/callback", (req, res, next) => {
  console.log("test callback")
  const queryString = req.body.queryString
  
  const code = spotifyFetchTokens.getCodeFromRedirect(queryString)
  
  spotifyFetchTokens.fetchPrivateToken(code)
    .then(res => {
      console.log("private_tokens", res)
    
      var private_token = res.access_token
      var refresh_token = res.refresh_token

      return [private_token, refresh_token]
      // res.cookie("private_token", res.access_token)
      // res.cookie("refresh_token", res.refresh_token)
      
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
