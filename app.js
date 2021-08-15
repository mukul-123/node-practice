// inbuilt modules...

const express = require('express');
const router = require('./routes/routes');
const bodyParser = require('body-parser')
require('dotenv').config(); 
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// user defined modules...

var port= process.env.HTTPS_PORT?process.env.HTTPS_PORT:9001;

app.use(router);

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`)
  })