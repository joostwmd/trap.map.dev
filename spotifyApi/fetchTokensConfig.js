const btoa = require('btoa')
const fetch = require('cross-fetch');


const client_id = "25ecacddc59e4a3aadede77c0f93cf43"
const client_secret = "b30b8625e1154ef49c70dc548034e97b"
const tokenEndpoint = "https://accounts.spotify.com/api/token"
const redirect_uri = "http://localhost:3000/callback"



//PUBLIC TOKEN

const fetchPublicToken = async () => {
  const result = await fetch(`${tokenEndpoint}`, {
      method : 'POST',
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(`${client_id}:${client_secret}`)
      },
      body : 'grant_type=client_credentials'
  })

  const data = await result.json()
  return data.access_token
}

//PRIVATE TOKEN


const fetchPrivateToken = async (code) => {
    const data = new URLSearchParams()
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", redirect_uri);
    data.append("code", code);

    const result = await fetch (`${tokenEndpoint}`, {
      method : 'POST',
      body : data,
      headers: {
        'Authorization' : 'Basic ' + btoa(`${client_id}:${client_secret}`),
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })

    const res = await result.json()
    return res

}



//after auth
const getCodeFromRedirect = (queryString) => {
  let code = null
  if ( queryString.length > 0 ){
    const urlParams = new URLSearchParams(queryString)
    code = urlParams.get('code')
  }
  return code
}

module.exports = {fetchPublicToken, getCodeFromRedirect, fetchPrivateToken};