import React, {Component} from 'react'
import './dispatch.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleShipper} from '../../ducks/reducer'
import {handlePickup} from '../../ducks/reducer'
import {handleDestination} from '../../ducks/reducer'
import {handleDate} from '../../ducks/reducer'
import {handleRate} from '../../ducks/reducer'

class Dispatch1 extends Component{
    constructor(){
        super()
    }

    render(){

        return(
            <div id="dispatch1">
                <p>Enter Job Details</p>


                <p>Shipper</p>
                <input type="text" onChange={(e) => this.props.handleShipper(e.target.value)}/>
                 <p>PickUp Address</p>
                <input type="text" onChange={(e) => this.props.handlePickup(e.target.value)}/>
                <p>Destination Address</p>
                <input type="text" onChange={(e) => this.props.handleDestination(e.target.value)}/>
                <p>Rate</p>
                <input type="text" onChange={(e) => this.props.handleRate(e.target.value)}/>
                <p>Date</p>
                <input type="text" onChange={(e) => this.props.handleDate(e.target.value)}/>
                
                <div>
                    <Link to="/dispatch2"><button >Next</button></Link>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    handleShipper,
    handlePickup,
    handleDestination,
    handleDate,
    handleRate
    
}

export default connect(
    null,
    mapDispatchToProps
)(Dispatch1)