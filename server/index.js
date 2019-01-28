
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller')
const massive = require('massive');
require('dotenv').config();

//truckusers
//truckdrivers
//trucktrucks
//truckjobs
//https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111

//https://api.openweathermap.org/data/2.5/weather?zip=84663&APPID=e5b6604c2f44977a986dfaa20987dfd5


let {CONNECTION_STRING,
    API_KEY
} = process.env

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
app.get('/api/getdrivers', controller.getDrivers)

app.post('/api/getweather', controller.getWeather) 

app.get('/api/getreminders', controller.getReminders)

app.post('/api/submitdriver', controller.submitDriver)

app.delete('/api/deletedriver/:id', controller.deleteDriver)

app.post('/api/dispatch', controller.dispatch)

app.get('/api/getpayroll', controller.getpayroll)

app.delete('/api/deletejob/:index', controller.deletejob)

app.get('/api/revenue', controller.getRevenue)