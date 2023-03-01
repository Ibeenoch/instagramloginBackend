import express from 'express';
import cors from 'cors';
import needle from 'needle'

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/api', async (req, res) => {
  //get te authorization token from the frontend
  const token = req.body.accesstoken

let tokenres;

 const getShortToken = await needle ('post', 'https://api.instagram.com/oauth/access_token',
 {
    client_id: '100575559642998',
    client_secret: '2ed05c2cf70cb1c8bc44dd2ee0d8afb5',
    grant_type : 'authorization_code',
    redirect_uri: 'https://localhost:3000/',
    code: token
  }, { multipart: true })
 .then(async(resp)=> {
  console.log(resp.body)
  //get the short live token
 tokenres=resp.body
 console.log(tokenres)
 }).catch((err) => {
  console.log(err)
 })

 //send it back to the frontend
 console.log('tokenres: ', tokenres)
  res.json(tokenres)
  });



app.listen(3030, () => console.log('Server listening on port 3030'));
