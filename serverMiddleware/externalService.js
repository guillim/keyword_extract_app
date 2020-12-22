import axios from 'axios'

export default {
  path: '/api/premium',
  handler(req, res, next) {
    if (req.method !== 'POST'){
      res.end('We only handle POST request')
      return true
    }
    let endpoint = 'https://' + process.env.BASE_URL_PREMIUM
    let data = {
      "text": req.body.data
    }

    axios.post(endpoint,JSON.stringify(data),{
      "headers": {
        "Content-Type": "application/json",
        "x-api-key" : process.env.API_SECRET
      }
    })
    .then(function (response) {
      console.log('Status: ' + response.statusText, response.status)
      res.status(200).send(response.data)
    })
    .catch(function (error) {
      console.log('error from axios:',error);
      res.end('Problem with the request')
    })
    .then(function () {
      console.log('end of post keywords of api using axios');
      // res.end('Everything ok!!')
    });
    // res.end('Everything ok!')
    // next() // we don't need this because it's an endpoint and therefore there are no other middleware to call after
  }
}
