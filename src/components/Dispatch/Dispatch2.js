import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./dispatch.css";
import { connect } from "react-redux";
import axios from "axios";

class Dispatch2 extends Component {
  constructor() {
    super();

    this.state = {
      drivers: []
    };
  }

  componentDidMount() {
    axios.get("/api/getdrivers").then(res => {
      this.setState({
        drivers: res.data
      });
    });
  }

  dispatch = (index, name) => {
    axios
      .post("/api/dispatch", {
        index,
        name,
        shipper: this.props.shipper,
        pickup: this.props.pickup,
        destination: this.props.destination,
        date: this.props.date,
        rate: this.props.rate
      })
      .then(res => {});
  };

  render() {
    let displayDrivers = this.state.drivers.map((current, index) => {
      return (
        <div className="dispatch-driver" key={current + index}>
          <div className="name-dispatch">
            <div className="dispatch-first">{current.first}</div>
            <div className="dispatch-last">{current.last}</div>
          </div>
          <div className="dispatch-submit">
            <Link to="/home">
              <button className="dispatch-button"
                onClick={() => {
                  alert('dispatch made')
                  this.dispatch(index, current.first);
                }}
              >
                Dispatch
              </button>
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div id="dispatch2">
      <div id="app-header">Dispatch</div>
        <div className="dispatch">
          <div className="job-details">
          <div className="dispatch-title">
            <p>JOB DETAILS</p>
          </div>
            {/* <div className="job-detail">
              Shipper: <p>{this.props.shipper}</p>
            </div> */}
            <div className="job-detail">
              Pickup:<p>{this.props.pickup}</p>
            </div>
            <div className="job-detail">
              Destination:<p>{this.props.destination}</p>
            </div>
            {/* <div className="job-detail">
              Date:<p>{this.props.date}</p>
            </div> */}
            <div className="job-detail">
              Payment:<p>{this.props.rate}</p>
            </div>
          </div>
        </div>

        <div className="select-driver">
          <div className="display-drivers">
            <div className="display-select-driver">Select driver to dispatch</div>
          </div>
          {displayDrivers}
        </div>

        <div className="dispatch-submit">
          <Link to="/dispatch1">
            <button className="dispatch-submit-button">Previous</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    shipper: reduxState.shipper,
    pickup: reduxState.pickup,
    destination: reduxState.destination,
    date: reduxState.date,
    rate: reduxState.rate
  };
}

export default connect(mapStateToProps)(Dispatch2);
