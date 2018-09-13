import React, {Component} from 'react'
import './trucks.css'
import axios from 'axios'
import Table from '../Trucktable/Trucktable'

export default class Trucks extends Component{
    constructor(){
        super()

        this.state = {
            trucks: []
        }
    }

    componentDidMount(){
        console.log('did mount')
        axios.get('/api/gettrucks').then(res => {
            console.log(res.data, 'res')  
            this.setState({
                trucks: res.data
            })    
        })
    }

    // getTrucks = () => {
    //     console.log('get trucks functioncalled')

    //     axios.get('/api/gettrucks').then(res => {
    //         console.log('res')
    //     })
    // }

    render(){

        // let renderTrucks = this.state.trucks.map((current, index) => {
        //     return(
        //         <div id="render-trucks" key={current + index}>


        //         <table>
        //     <thead>
        //         <tr>
        //             <th>Unit</th>
        //             <th>Make</th>
        //             <th>Model</th>
        //             <th>Year</th>
        //             <th>Plate</th>
        //             <th>VIN</th>
        //             <th>Actions</th>
        //         </tr>
        //     </thead>


        //             <tbody>
        //                 <tr>
        //                     <td>{current.unit}</td>
        //                     <td>{current.make}</td>
        //                     <td>{current.model}</td>
        //                     <td>{current.year}</td>
        //                     <td>{current.plate}</td>
        //                     <td>{current.vin}</td>
        //                 </tr>        
        //             </tbody>
            
        
        // </table>    


        //         </div>
        //     )
        // })
        
        return(
            <div id="trucks">

            <Table trucks={this.state.trucks}/>

        
            {/* {renderTrucks} */}

                    {/* <td><button >Maybe</button> <button>Later</button></td> */}



            </div>
        )
    }
}