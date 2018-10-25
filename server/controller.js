let axios = require('axios');

module.exports = {
    getTrucks: function(req, res){
        req.app.get('db').get_trucks().then(response => {
            res.status(200).send(response);
        })
    },

    getDrivers: function(req, res){
        req.app.get('db').get_drivers().then(response => {
            // console.log('backedn drivers', response)
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
    },

    submitDriver: function(req, res){
        console.log(req.body, 'reqbodydriver')

        let {first, last, phone, station} = req.body

        req.app.get('db').add_driver([first, last, phone, station]).then(response => {
            console.log('added new driver', response)
            res.sendStatus(200);
        })
    },

    deleteDriver: function(req, res){
        console.log('backend delete param', req.params.id)

        req.app.get('db').delete_driver([req.params.id]).then(response => {
            console.log('driver delted on the back end')
            res.sendStatus(200);
        })
    }
}