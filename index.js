const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const isUrl = require('is-url');

// Basic Configuration
const port = process.env.PORT || 3000;
let counter = 0;
let shortendUrls = {};


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}))

app.post('/api/shorturl', function(req,res){
    console.log("yupp")
  const url = req.body.url || req.query.url;
  console.log(url,isUrl(url));
  if (!isUrl(url)){
    res.send({ error:'invalid url'})
    return;
  }
  counter += 1;
  shortendUrls[counter] = url;
  console.log(shortendUrls);
  res.send({ original_url: req.body.url, short_url: counter});
})

app.get('/api/shorturl/:id',function(req,res){
  const id = req.params.id;
  const url = shortendUrls[id];
  res.redirect(url);
})
app.listen(port)
