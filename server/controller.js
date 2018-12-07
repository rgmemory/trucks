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
    },

    dispatch: function(req, res){
        console.log('backend dispatch', req.body)

        let {shipper, pickup, destination, date, rate} = req.body

        const dispatchOutput = `
            <p>You have been dispatched</p>
            <p>Here are the deets</p>

            <ul>
                <li>Shipper: ${shipper}</li>
                <li>Pickup Location: ${pickup}</li>
                <li>Destination: ${destination}</li>
                <li>Date: ${date}</li>
                <li>Rate: ${rate}</li>
            
            </ul>

            
            
            
            
            

        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'bar@example.com, baz@example.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });

        
    }
}