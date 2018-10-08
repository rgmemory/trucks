module.exports = {
    getTrucks: function(req, res){
        req.app.get('db').get_trucks().then(response => {
            res.status(200).send(response);
        })
    },

    getDrivers: function(req, res){
        req.app.get('db').get_drivers().then(res => {
            console.log('backend drivers', res)
            res.status(200).send(response)
        })
    }
}