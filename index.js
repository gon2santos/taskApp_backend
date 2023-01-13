var express = require('express');
const cors = require("cors");
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const config = require('./db/db_config');

dotenv.config();

var app = express();

app.use(cors()); //i.e: app.use(cors({ origin: /(.*\.)?victoria-lo.github\.io.*/ }));

app.get('/', (req, res) => {
    console.log('requirieron /');
    res.send('Estoy en /');
})

app.get('/projects', (req, res) => {
    console.log('requirieron /projects');
    res.send('Estoy en /projects');
})

//=======START SERVER=======//
app.listen(process.env.PORT, () => {
    console.log(
      `Successfully started the server, listening on port: ${process.env.PORT}`
    );
  });

//=======CONNECT TO DB=======//
mongoose.set('strictQuery', true);

mongoose
  .connect(config.dt.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Started the database");
  })
  .catch((err) => {
    console.log(err);
  });