import React, { Component } from "react";
import axios from "axios";
import "./payroll.css";

export default class Payroll extends Component {
  constructor() {
    super();

    this.state = {
      job: [],
      totalRate: null
    };
  }

  componentDidMount() {
    axios.get("/api/getpayroll").then(res => {
      this.setState({
        job: res.data
      });
    });
  }

  payDriver = value => {
    axios.delete(`/api/deletejob/${value}`).then(response => {
      axios.get("/api/getpayroll").then(res => {
        this.setState({
          job: res.data
        });
      });
    });
  };

  render() {
    let displayJobs = this.state.job.map((current, index) => {
      console.log(current);

      return (
        <div className="payroll-items" key={current + index}>
          <div className="payroll-details">
            {/* <div className="payroll-item"><div className="payroll-item-name">Shipper:</div> {current.shipper}</div> */}
            <div className="payroll-item"><div className="payroll-item-name">Driver:</div> {current.name}</div>
          <div className="payroll-item"><div className="payroll-item-name">Total:</div> ${current.rate}</div>
          </div>
          <div className="payroll-payment">
          <button
          className="payroll-button"
            onClick={() => {
              this.payDriver(current.id);
              alert(`${current.name} has been paid $${current.rate}.`)
            }}
          >
            Pay
          </button>
          </div>
        </div>
      );
    });

    return (
      <div className="payroll-big">
        <div id="app-header">Payroll</div>
        <div className="payroll-container">
        <div className="payroll">
          {/* <div className="payroll-title">Payroll</div> */}
          <div className="jobs-container">{displayJobs}</div>
        </div>
        </div>
      </div>
    );
  }
}
