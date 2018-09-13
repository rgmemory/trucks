module.exports = {
    getTrucks: function(req, res){
        console.log('backend works')
        req.app.get('db').get_trucks().then(response => {
            console.log(response)
            res.status(200).send(response);
        })
    }
}