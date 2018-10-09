import React, {Component} from 'react'
import './home.css'
import axios from 'axios'

export default class Home extends Component{
    constructor(){
        super()

        this.state = {
            zip: null
        }
    }

    updateZip = (value) => {
        this.setState({
            zip: value,
            temperature: null,
            description: '',
            weatherpic: '',
            reminders: []
        })
    }

    submitZip = () => {
        axios.post('/api/getweather', {zip: this.state.zip}).then(res => {
            this.setState({
                weatherpic: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
                temperature: Math.floor((9/5 * (res.data.main.temp - 273) + 32)),
                description: res.data.weather[0].description
            })
        })
    }

    componentDidMount(){
        // console.log('front end mounted')
        // axios.get('api.openweathermap.org/data/2.5/weather?zip=94040,us').then(res => {
        //     console.log('front end weather works', res)
        // })

        axios.get('/api/getreminders').then(res => {
            console.log('front end reminders works', res.data)
            this.setState({
                reminders: res.data
            })
        })
    }

    render(){

        let formattedReminders = this.state.reminders.map((current, index) => {
            return(
                <div>
                    {current.name}
                </div>
            )
        })

        return(
            <div id="home">
                
                {/* <div id="home-header">
                    Home
                </div> */}

                <div id="home-body">
                    <div id="home-left">
                        <div id="revenue">
                            <p>Revenue Overview</p>
                        </div>

                        <div id="weather">
                            <p>Weather Center</p>
                            <input type="text" onChange={e => this.updateZip(e.target.value)}/>
                            <button onClick={() => this.submitZip()}>Submit</button>
                            <div id="weather-description">{this.state.description}</div>
                            <img id="weather-pic" src={this.state.weatherpic}/>
                            <div id="weather-temperature">{this.state.temperature}</div>
                        </div>
                    </div>

                    <div id="home-right">
                        <div id="reminders">
                            <p>Reminders</p>
                            {/* <div>{this.state.reminders}</div> */}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}