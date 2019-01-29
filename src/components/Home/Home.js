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
    //   chartData: {
    //       labels: ['Income', 'Revenue', 'Costs'],
    //       datasets: [
    //           {
    //             data:[
    //                 1,2,3
    //             ],
    //             backgroundColor: [
    //                 'red', 'green', 'yellow'
    //             ]
    //           }
    //       ]
    //   }
    };
  }

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
      console.log(res.data.name, "res");
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
        console.log("front end revenue", response.data);
        response.data.forEach(current => {
          tempRevenue += current.revenue;
          tempExpenses += current.rate;

          this.setState({
            expenses: tempExpenses,
            revenue: tempRevenue,
            chartData: {
                labels: ['Income', 'Revenue', 'Costs'],
                datasets: [
                    {
                      data:[
                          tempRevenue, tempRevenue - tempExpenses, tempExpenses
                      ],
                      backgroundColor: [
                          'red', 'green', 'yellow'
                      ]
                    }
                ]
            }
          });
        });

        console.log("tempreve", tempRevenue);
        console.log("tempExpense", tempExpenses);
      });
      this.setState({
        reminders: res.data
      });
    });
  }

  render() {
    let reminders = this.state.reminders.map((current, index) => {
      return (
        <div key={current + index}>
          <div className="reminder">{current.reminder}</div>
          <button>Remove</button>
        </div>
      );
    });

    return (
      <div id="home">
        <div id="home-body">
          <div id="home-left">
            <div id="revenue">
              <div className="home-header">
                <div className="home-title">Revenue Overview</div>
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
                  <Pie
                    data={this.state.chartData}
                    // width={100}
                    // height={50}
                    options={{
                    //   maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>

            <div id="weather">
              <div className="home-header">
                <div className="home-title">Weather Center</div>
              </div>

              <div className="weather-body">
                <input
                  className="weather-input"
                  type="text"
                  onChange={e => this.updateZip(e.target.value)}
                />
                <button onClick={() => this.submitZip()}>Submit</button>
                <div id="weather-city">{this.state.city}</div>
                <div id="weather-description">{this.state.description}</div>
                <img id="weather-pic" src={this.state.weatherpic} />
                <div id="weather-temperature">{this.state.temperature}</div>
              </div>
            </div>
          </div>

          <div id="home-right">
            <div id="reminders">
              <div className="home-header">
                <div className="home-title">Reminders</div>
              </div>

              <div className="reminders-body">
                {reminders}
                <input type="text" />
                <button>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
