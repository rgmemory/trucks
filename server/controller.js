let axios = require("axios");
let nodemailer = require("nodemailer");

module.exports = {
  getTrucks: function(req, res) {
    req.app
      .get("db")
      .get_trucks()
      .then(response => {
        res.status(200).send(response);
      });
  },

  getDrivers: function(req, res) {
    req.app
      .get("db")
      .get_drivers()
      .then(response => {
        res.status(200).send(response);
      });
  },

  getWeather: function(req, res) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${
          req.body.zip
        }&APPID=${process.env.API_KEY}`
      )
      .then(response => {
        res.status(200).send(response.data);
      });
  },

  getReminders: function(req, res) {
    req.app
      .get("db")
      .get_reminders()
      .then(response => {
        res.status(200).send(response);
      });
  },

  submitDriver: function(req, res) {
    let { first, last, phone, station, email } = req.body;

    req.app
      .get("db")
      .add_driver([first, last, phone, station, email])
      .then(response => {
        res.sendStatus(200);
      });
  },

  editDriverInfo: function(req, res) {
    let { first, last, phone, station, driverEditIndex } = req.body;
    req.app
      .get("db")
      .edit_driver(first, last, phone, station, driverEditIndex)
      .then(response => {
        res.sendStatus(200);
      });
  },

  deleteDriver: function(req, res) {
    req.app
      .get("db")
      .delete_driver([req.params.id])
      .then(response => {
        res.sendStatus(200);
      });
  },

  dispatch: function(req, res) {
    let {
      index,
      name,
      shipper,
      pickup,
      destination,
      date,
      rate,
      email
    } = req.body;

    const dispatchOutput = `
            <p>You have been dispatched</p>
            <p>Here is the job information:</p>

            <ul>
                
                <li>Pickup Location: ${pickup}</li>
                <li>Destination: ${destination}</li>
                <li>Rate: ${rate}</li>
            
            </ul>
        `;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25,
      auth: {
        user: "russelldevmtn@gmail.com",
        pass: "russellmemory"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let helperOptions = {
      from: '"Russell" <russelldevmtn@gmail.com>',
      to: email,
      subject: "Dispatch for " + name,
      // text: 'Hello world?',
      html: dispatchOutput
    };

    transporter.sendMail(helperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      // console.log('Message sent: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    let revenue = rate * 4;

    req.app
      .get("db")
      .add_job([name, shipper, pickup, destination, date, rate, revenue])
      .then(response => {});
  },

  getpayroll: function(req, res) {
    req.app
      .get("db")
      .get_payroll()
      .then(response => {
        res.status(200).send(response);
      });
  },

  deletejob: function(req, res) {
    req.app
      .get("db")
      .delete_job(req.params.index)
      .then(response => {
        res.sendStatus(200);
      });
  },

  getRevenue: function(req, res) {
    req.app
      .get("db")
      .get_revenue()
      .then(response => {
        res.send(response);
      });
  },

  removeReminder: function(req, res) {
    req.app
      .get("db")
      .remove_reminder([req.params.index])
      .then(response => {
        res.sendStatus(200);
      });
  },

  submitReminder: function(req, res) {
    req.app
      .get("db")
      .submit_reminder(req.body.reminder)
      .then(response => {
        res.sendStatus(200);
      });
  }
};
