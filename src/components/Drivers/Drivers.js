import React, {Component} from 'react'
import './drivers.css'
import axios from 'axios'
import Drivertable from '../Trucktable/Trucktable'

export default class Trucks extends Component{
    constructor(){
        super()

        this.state = {
            drivers: []
        }
    }

    componentDidMount(){
        axios.get('/api/getdrivers').then(res => {
            console.log(res.data, 'res')  
            this.setState({
                drivers: res.data
            })    
        })
    }

    render(){
        
        return(
            <div id="trucks">

                <Drivertable drivers={this.state.drivers}/>

            </div>
        )
    }
}