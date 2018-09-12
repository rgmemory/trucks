import React, {Component} from 'react'
import './home.css'

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
                            Revenue
                        </div>

                        <div id="weather">
                            Weather
                        </div>
                    </div>


                    <div id="home-right">
                        <div id="reminders">
                            Reminders
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}