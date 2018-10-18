import React, {Component} from 'react'
import './trucks.css'
import axios from 'axios'
import ReactModal from 'react-modal'
// import Trucktable from '../Trucktable/Trucktable'


export default class Trucks extends Component{
    constructor(){
        super()

        this.state = {
            trucks: [],
            showModal: false,
            unit: null,
            make: '',
            model: '',
            year: null,
            plate: null,
            vin: ''
        }

        
    }

    handleOpenModal = () => {
        this.setState({
            showModal: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
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
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           className="Modal"
           overlayClassName="Overlay"
        >
          <div id="truck-modal">
              
                
                <div className="truck-input-unit">
                    <p>Unit</p>
                    <input type="text"/>
                </div>
                <div className="truck-input-unit">
                    <p>Make</p>
                    <input type="text"/>
                </div>
                <div className="truck-input-unit">
                    <p>Model</p>
                    <input type="text"/>
                </div>
                <div className="truck-input-unit">
                    <p>Year</p>
                    <input type="text"/>
                </div>
                <div className="truck-input-unit">
                    <p>Plate</p>
                    <input type="text"/>
                </div>
                <div className="truck-input-unit">
                    <p>VIN</p>
                    <input type="text"/>
                </div>

                <div id="truck-modal-bottom">
                    <button onClick={this.handleCloseModal}>Submit</button>
                </div>
                
          </div>
          {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
        </ReactModal>

                {/* <Trucktable trucks={this.state.trucks}/> */}

            </div>
        )
    }
}