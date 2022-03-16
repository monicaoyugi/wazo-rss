const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')  
const mongoose = require('mongoose')
require('dotenv/config')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
if (req.method === 'OPTIONS') {
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET,   PATCH, DELETE')
return res.status(200).json({})
}
next();
});mongoose.connect(
          process.env.DB_CONNECTION, 
         {useNewUrlParser: true, useUnifiedTopology: true },
         () => {
             console.log('connected to database')
         })
mongoose.Promise = global.Promiseapp.use((req, res, next) => {
   res.status(200).json({message: "It works"});
})