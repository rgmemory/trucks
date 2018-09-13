
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller')
const massive = require('massive');
require('dotenv').config();

//truckusers
//truckdrivers
//trucktrucks

let {CONNECTION_STRING} = process.env

let app = express();

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    console.log('db works');
    app.set('db', db)
})

app.listen(3005, function(){
    console.log('listening on 3005')
})

app.get('/api/gettrucks', controller.getTrucks)