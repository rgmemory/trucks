import React, {Component} from 'react'
import axios from 'axios'

export default class Payroll extends Component{
    constructor(){
        super()

        this.state = {
            job: [],
            totalRate: null
        }
    }

    componentDidMount(){
        axios.get('/api/getpayroll').then(res => {
            this.setState({
                job: res.data
            })
        })
    }

    payDriver = (value) => {

        axios.delete(`/api/deletejob/${value}`).then(response => {

            axios.get('/api/getpayroll').then(res => {
                this.setState({
                    job: res.data
                })
            })
        })
    }

    

    
    render(){


        let displayJobs = this.state.job.map((current, index) => {

            return(
                <div key={current + index}>
                    ID: {current.id}
                    Name: {current.name}
                    Rate: {current.rate}
                    <button onClick={() => {this.payDriver(current.id)}}>Pay For Job</button>
                </div>
            )
        })

        return(
            <div className="payroll">

                <div>Pay for job</div>
                {displayJobs}
            </div>
        )
    }
}