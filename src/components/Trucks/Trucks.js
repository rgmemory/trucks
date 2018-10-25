import React, {Component} from 'react'
import './trucks.css'
import axios from 'axios'
import ReactModal from 'react-modal'
// import TruckTable from '../TruckTable/TruckTable'
import plus from '../../images/plus.png'


import TruckTable from '../Trucktable/Trucktable'


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

        // console.log(this.state.trucks)
        
        return(
            <div id="trucks">
                
                <TruckTable trucks={this.state.trucks}/>
                <div id="drivers-add">
                        <button onClick={this.handleOpenModal}><img src={plus} alt="plus sign"/>Add Driver</button>
                    </div>
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
        </ReactModal>


                {/* <button onClick={this.handleOpenModal}>Trigger Modal</button> */}

            </div>
        )
    }
}