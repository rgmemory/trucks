import React, {Component} from 'react'
import axios from 'axios'

export default class Payroll extends Component{
    constructor(){
        super()

        this.state = {
            job: []
        }
    }

    componentDidMount(){
        console.log('did mount')
        axios.get('/api/getpayroll').then(res => {
            console.log('front end payroll', res.data)
            this.setState({
                job: res.data
            })
        })
    }

    payDriver = (value) => {
        console.log('paydriver clicked', value)

        axios.delete('/api/deletejob', {index: value}).then(res => {
            console.log('front end delte job')
        })
    }

    
    render(){

        let displayJobs = this.state.job.map((current, index) => {
            console.log(current);

            return(
                <div key={current + index}>
                    Name: {current.name}
                    Rate: {current.rate}
                    <button onClick={() => {this.payDriver(index)}}>Pay For Job</button>
                </div>
            )
        })

        return(
            <div className="payroll">
                {/* <div>payroll</div> */}

                <div>Payroll per driver</div>
                {displayJobs}
            </div>
        )
    }
}