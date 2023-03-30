const express = require('express');
const mongoose = require('mongoose');
const myroutes = require('./routes')
const cors = require("cors")

//const bodyParser = require('body-parser')

const app = express();
app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
//app.use(express.json())
//app.use(express.bodyParser({limit: '50mb'}));
//app.use(bodyParser.json({ limit: '20mb' }));



const dbURI = "mongodb+srv://user0:Mch12345@cluster0.cdojv.mongodb.net/practice1";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        
        app.listen(3000)
        console.log("I am listening...")

    }).catch(err => console.log(err));

app.use('/api', myroutes)

app.use(express.static(__dirname + "/public/"))