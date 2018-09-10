import React, {Component} from 'react'
import './home.css'

export default class Home extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div id="home">
                
                <div id="home-header">
                    Home
                </div>

                <div id="home-body">
                    <div id="home-left">Left</div>
                    <div id="home-right">Right</div>
                </div>
                
            </div>
        )
    }
}