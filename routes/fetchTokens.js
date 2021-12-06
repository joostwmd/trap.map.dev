const router = require("express").Router();
const spotifyApiConfig = require('../spotifyApi/fetchTokensConfig')

router.get("/publicToken", (req, res, next) => {
  console.log("test home")
  res.cookie("myCookie", "test", {httpOnly : false})

  spotifyApiConfig.fetchPublicToken()
    .then(res => {
      console.log("public_token", res)
      var public_token = res
      //res.cookie("public_token", public_token)
    })
});

router.post("/callback", (req, res, next) => {
  console.log("test callback")
  const queryString = req.body.queryString
  
  const code = spotifyApiConfig.getCodeFromRedirect(queryString)
  
  const tokens = spotifyApiConfig.fetchPrivateToken(code)
    .then(res => {
      console.log("private_tokens", res)
    
      var private_token = res.access_token
      var refresh_token = res.refresh_token

      return [private_token, refresh_token]
      // res.cookie("private_token", res.access_token)
      // res.cookie("refresh_token", res.refresh_token)
      
    })
})

module.exports = router;
