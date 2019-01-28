import React, {Component} from 'react'
import './home.css'
import axios from 'axios'

export default class Home extends Component{
    constructor(){
        super()

        this.state = {
            zip: null,
            reminders: [],
            revenue: null, 
            expenses: null
        }
    }

    updateZip = (value) => {
        this.setState({
            zip: value,
            temperature: null,
            description: '',
            weatherpic: '',
            city: ''
        })
    }

    submitZip = () => {
        axios.post('/api/getweather', {zip: this.state.zip}).then(res => {
            console.log(res.data.name, 'res')
            this.setState({
                weatherpic: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
                temperature: Math.floor((9/5 * (res.data.main.temp - 273) + 32)),
                description: res.data.weather[0].description,
                city: res.data.name
            })
        })
    }

    componentDidMount(){
        axios.get('/api/getreminders').then(res => {
            let tempRevenue = 0;
            let tempExpenses = 0;
            axios.get('/api/revenue').then(response => {
                console.log('front end revenue', response.data)
                // let temp
                response.data.forEach(current => {
                    tempRevenue += current.revenue
                    tempExpenses += current.rate

                    this.setState({
                        expenses: tempExpenses,
                        revenue: tempRevenue
                    })
                })

                console.log('tempreve', tempRevenue)
                console.log('tempExpense', tempExpenses)
            })
            this.setState({
                reminders: res.data
                // expenses: tempExpenses,
                // revenue: tempRevenue
            })
        })

        
    }

    render(){
        let reminders = this.state.reminders.map((current, index) => {
            return(
                <div key={current + index}>
                    <div className="reminder">
                        {current.reminder}
                    </div>
                    <button>Remove</button>
                </div>
            )
        })


        return(
            <div id="home">

                <div id="home-body">
                    <div id="home-left">
                        <div id="revenue">
                            <p>Revenue Overview</p>
                            Income:
                            {this.state.revenue}
                            Costs:
                            {this.state.expenses}
                            Revenue:
                            {this.state.revenue - this.state.expenses}
                        </div>

                        <div id="weather">
                            <p>Weather Center</p>
                            <input className='weather-input' type="text" onChange={e => this.updateZip(e.target.value)}/>
                            <button onClick={() => this.submitZip()}>Submit</button>
                            <div id="weather-city">{this.state.city}</div>
                            <div id="weather-description">{this.state.description}</div>
                            <img id="weather-pic" src={this.state.weatherpic}/>
                            <div id="weather-temperature">{this.state.temperature}</div>
                        </div>
                    </div>

                    <div id="home-right">
                        <div id="reminders">
                            <p>Reminders</p>
                            {reminders}
                            <input type="text"/>
                            <button>Add</button>
                        </div>

                    </div>
                </div>
                
            </div>
        )
    }
}