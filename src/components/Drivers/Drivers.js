import React, {Component} from 'react'
import './drivers.css'
import axios from 'axios'
import Simpletable from '../Drivertable/Drivertable'
import plus from '../../images/plus.png'
import ReactModal from 'react-modal'


export default class Drivers extends Component{
    constructor(){
        super()

        this.state = {
            drivers: [],
            showModal: false,
            first: '',
            last: '',
            phone: null,
            station: ''
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

        this.modalSubmit()
    }

    componentDidMount(){
        axios.get('/api/getdrivers').then(res => {
            this.setState({
                drivers: res.data
            })    
        })
    }

    updateFirst = (target) => {
        this.setState({
            first: target
        })
    }
    updateLast = (target) => {
        this.setState({
            last: target
        })
    }
    updatePhone = (target) => {
        this.setState({
            phone: target
        })
    }
    updateStation = (target) => {
        this.setState({
            station: target
        })
    }

    modalSubmit = () => {

        let {first, last, phone, station} = this.state

        this.updateFirst();
        this.updateLast();
        this.updatePhone();
        this.updateStation();

        axios.post('/api/submitdriver', {first, last, phone, station}).then(res => {
            axios.get('/api/getdrivers').then(res => {
                this.setState({
                    drivers: res.data
                })    
            })
        })

    
    }

    deleteDriver = (id) => {
        console.log('delete driver', id)

        axios.delete(`/api/deletedriver/${id}`).then(response => {
            axios.get('/api/getdrivers').then(res => {
                this.setState({
                    drivers: res.data
                })    
            })
        })
      }

      editDriver = () => {
          console.log('edit driver')
      }

    render(){

        return(
            <div id="drivers">

                    <div id="drivers-table">
                        <Simpletable drivers={this.state.drivers} deleteDriver={this.deleteDriver} editDriver={this.editDriver}/>
                    </div>

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
                    <p>First</p>
                    <input type="text" onChange={(e) => {this.updateFirst(e.target.value)}} />
                </div>
                <div className="truck-input-unit">
                    <p>Last</p>
                    <input type="text" onChange={(e) => {this.updateLast(e.target.value)}}/>
                </div>
                <div className="truck-input-unit">
                    <p>Phone</p>
                    <input type="text" onChange={(e) => {this.updatePhone(e.target.value)}}/>
                </div>
                <div className="truck-input-unit">
                    <p>Station</p>
                    <input type="text" onChange={(e) => {this.updateStation(e.target.value)}}/>
                </div>
                

                <div id="truck-modal-bottom">
                    <button onClick={this.handleCloseModal}>Submit</button>
                </div>
                
          </div>
          {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
        </ReactModal>

                    
                

            </div>
        )
    }
}