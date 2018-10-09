let axios = require('axios');

module.exports = {
    getTrucks: function(req, res){
        req.app.get('db').get_trucks().then(response => {
            res.status(200).send(response);
        })
    },

    getDrivers: function(req, res){
        req.app.get('db').get_drivers().then(res => {
            res.status(200).send(response)
        })
    },

    getWeather: function(req, res){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}&APPID=${process.env.API_KEY}`).then(response => {
            res.status(200).send(response.data)
        })
    },

    getReminders: function(req, res){
        req.app.get('db').get_reminders().then(response => {
            console.log('remniders', response)
            res.status(200).send(response)
        })
    }
}