import React, {Component} from 'react'
import './drivers.css'
import axios from 'axios'
import Simpletable from '../Drivertable/Drivertable'
import plus from '../../images/plus.png'

export default class Drivers extends Component{
    constructor(){
        super()

        this.state = {
            drivers: []
        }
    }

    componentDidMount(){
        axios.get('/api/getdrivers').then(res => {
            this.setState({
                drivers: res.data
            })    
        })
    }

    render(){

        return(
            <div id="drivers">

                    <div id="drivers-table">
                        <Simpletable drivers={this.state.drivers}/>
                    </div>

                    <div id="drivers-add">
                        <button><img src={plus} alt="plus sign"/>Add Driver</button>
                    </div>

                    
                

            </div>
        )
    }
}