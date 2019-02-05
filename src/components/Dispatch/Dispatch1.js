import React, { Component } from "react";
import "./dispatch.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleShipper } from "../../ducks/reducer";
import { handlePickup } from "../../ducks/reducer";
import { handleDestination } from "../../ducks/reducer";
import { handleDate } from "../../ducks/reducer";
import { handleRate } from "../../ducks/reducer";

class Dispatch1 extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="dispatch1">
        <div id="app-header">Dispatch</div>
        <div className="dispatch-container">
          <div className="dispatch1-body">
            <div className="dispatch-title tooltip">
              <div className="tooltiptext">React Redux</div>
              Enter Job Details
            </div>
            {/* <div className="dispatch-item"><p>Shipper</p></div>
                <div className="dispatch-input"><input type="text" onChange={(e) => this.props.handleShipper(e.target.value)}/></div> */}

            <div className="dispatch-item tooltip">
              <p>PickUp Address</p>
            </div>
            <div className="dispatch-input">
              <input
                type="text"
                onChange={e => this.props.handlePickup(e.target.value)}
              />
            </div>

            <div className="dispatch-item">
              <p>Destination Address</p>
            </div>
            <div className="dispatch-input">
              <input
                type="text"
                onChange={e => this.props.handleDestination(e.target.value)}
              />
            </div>

            <div className="dispatch-item">
              <p>Pay</p>
            </div>
            <div className="dispatch-input">
              <input
                type="text"
                onChange={e => this.props.handleRate(e.target.value)}
              />
            </div>

            {/* <div className="dispatch-item"><p>Date</p></div>
                <div className="dispatch-input"><input type="text" onChange={(e) => this.props.handleDate(e.target.value)}/></div> */}

            <div className="dispatch-submit">
              <Link to="/dispatch2">
                <button className="dispatch-next">Next</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  handleShipper,
  handlePickup,
  handleDestination,
  handleDate,
  handleRate
};

export default connect(
  null,
  mapDispatchToProps
)(Dispatch1);
