import React, {Component} from 'react'
import './home.css'
import axios from 'axios'

export default class Home extends Component{
    constructor(){
        super()
    }

    render(){
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
                        </div>
                    </div>

                    <div id="home-right">
                        <div id="reminders">
                            <p>Reminders</p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}