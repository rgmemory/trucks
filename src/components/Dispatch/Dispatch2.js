import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './dispatch.css'
import {connect} from 'react-redux'
import axios from 'axios'

class Dispatch2 extends Component{
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

    dispatch = (index) => {
        console.log('dispatch clicked', index)
        axios.post('/api/dispatch', {shipper: this.props.shipper, pickup: this.props.pickup, destination: this.props.destination, date: this.props.date, rate: this.props.rate}).then(res => {
            console.log('front end dispatch')
        })
    }

    render(){

        let displayDrivers = this.state.drivers.map((current, index) => {
            return(
                <div key={current + index}>
                    {current.first}
                    {current.last}
                    <button onClick={() => {this.dispatch(index)}}>Dispatch</button>
                </div>
            )
        })

        return(
            <div id="dispatch2">

                <p>JOB DETAILS</p>
                <p>{this.props.shipper}</p>
                <p>{this.props.pickup}</p>
                <p>{this.props.destination}</p>
                <p>{this.props.date}</p>
                <p>{this.props.rate}</p>

                <div>DRIVERS</div>
                {displayDrivers}

                <Link to="/dispatch1"><button>Previous</button></Link>

            </div>
        )
    }
}


function mapStateToProps(reduxState){
    return{
        shipper: reduxState.shipper,
        pickup: reduxState.pickup,
        destination: reduxState.destination,
        date: reduxState.date,
        rate: reduxState.rate
    }
}

export default connect(
    mapStateToProps
)(Dispatch2)