import React, {Component} from 'react'
import './trucks.css'
import axios from 'axios'
// import Trucktable from '../Trucktable/Trucktable'

export default class Trucks extends Component{
    constructor(){
        super()

        this.state = {
            trucks: []
        }
    }

    componentDidMount(){
        axios.get('/api/gettrucks').then(res => {
            console.log(res.data, 'res')  
            this.setState({
                trucks: res.data
            })    
        })
    }

    render(){

        console.log(this.state)
        
        return(
            <div id="trucks">

                {/* <Trucktable trucks={this.state.trucks}/> */}

            </div>
        )
    }
}