import React, { Component } from "react";
import "./home.css";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      zip: null,
      reminders: [],
      revenue: null,
      expenses: null,
      reminder: ""
    };
  }

  removeReminder = value => {
    console.log(value);
    axios.delete(`/api/removeReminder/${value}`).then(res => {
      axios.get("/api/getreminders").then(response => {
        console.log("the reminders are", response);
        this.setState({
          reminders: response.data
        });
      });
    });
  };

  addReminder = value => {
    this.setState({
      reminder: value
    });
  };

  submitReminder = () => {
    axios
      .post("/api/submitReminder", { reminder: this.state.reminder })
      .then(response => {
        axios.get("/api/getreminders").then(res => {
          this.setState({
            reminders: res.data,
            reminder: ""
          });
        });
      });
  };

  updateZip = value => {
    this.setState({
      zip: value,
      temperature: null,
      description: "",
      weatherpic: "",
      city: ""
    });
  };

  submitZip = () => {
    axios.post("/api/getweather", { zip: this.state.zip }).then(res => {
      this.setState({
        weatherpic: `http://openweathermap.org/img/w/${
          res.data.weather[0].icon
        }.png`,
        temperature: Math.floor((9 / 5) * (res.data.main.temp - 273) + 32),
        description: res.data.weather[0].description,
        city: res.data.name
      });
    });
  };

  componentDidMount() {
    axios.get("/api/getreminders").then(res => {
      let tempRevenue = 0;
      let tempExpenses = 0;
      axios.get("/api/revenue").then(response => {
        response.data.forEach(current => {
          tempRevenue += current.revenue;
          tempExpenses += current.rate;

          this.setState({
            expenses: tempExpenses,
            revenue: tempRevenue,
            chartData: {
              labels: ["Income", "Revenue", "Costs"],
              datasets: [
                {
                  data: [tempRevenue, tempRevenue - tempExpenses, tempExpenses],
                  backgroundColor: ["red", "#15BC44", "yellow"]
                }
              ]
            }
          });
        });
      });
      this.setState({
        reminders: res.data
      });
    });
  }

  render() {
    let reminders = this.state.reminders.map((current, index) => {
      return (
        <div className="reminder-block" key={current + index}>
          <div className="reminder">
            {current.reminder}
            <button onClick={() => this.removeReminder(current.id)}>
              Remove
            </button>
          </div>
        </div>
      );
    });

    return (
      <div id="home">
        <div id="app-header">
          <p>Home</p>
        </div>
        <div id="home-body">
          <div id="home-left">
            <div id="revenue">
              <div className="home-header">
                <div className="home-title tooltip">
                  Finances
                  <div className="tooltiptext">Chart JS</div>
                </div>
              </div>
              <div className="revenue-body">
                <div className="revenue-left">
                  <div className="revenue-item">
                    <p>Income</p>
                    <div>${this.state.revenue}</div>
                  </div>
                  <div className="revenue-item">
                    <p>Costs</p>
                    <div>${this.state.expenses}</div>
                  </div>
                  <div className="revenue-item">
                    <p>Revenue</p>
                    <div>${this.state.revenue - this.state.expenses}</div>
                  </div>
                </div>
                <div className="revenue-right">
                  <Pie data={this.state.chartData} options={{}} />
                </div>
              </div>
            </div>

            <div id="weather">
              <div className="home-header">
                <div className="home-title tooltip">
                  Weather Center
                  <div className="tooltiptext">openweathermap.org API</div>
                </div>
              </div>

              <div className="weather-body">
                <div className="weather-left">
                  <input
                    placeholder="Enter Zip Code"
                    className="weather-input"
                    type="text"
                    onChange={e => this.updateZip(e.target.value)}
                  />
                  <button onClick={() => this.submitZip()}>Submit</button>
                </div>
                <div className="weather-results">
                  <div>
                    <div className="city-temp">
                      <div id="weather-city">{this.state.city}</div>
                      <div id="weather-temperature">
                        {this.state.temperature}
                      </div>
                    </div>
                    <div id="weather-description">{this.state.description}</div>
                  </div>
                  <img id="weather-pic" src={this.state.weatherpic} />
                </div>
              </div>
            </div>
          </div>

          <div id="home-right">
            <div id="reminders">
              <div className="home-header">
                <div className="home-title">Reminders</div>
              </div>

              <div className="reminders-body">
                <div className="individual-reminder">{reminders}</div>
                <div className="reminder-input">
                  <input
                    type="text"
                    value={this.state.reminder}
                    onChange={e => this.addReminder(e.target.value)}
                  />
                  <button onClick={() => this.submitReminder()}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
