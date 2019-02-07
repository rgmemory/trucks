import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      underline: false
    };
  }

  toggleUnderline = () => {
    this.setState({
      underline: !this.state.underline
    });
  };

  render() {
    return (
      <div id="sidebar">
        <div id="sidebar-buttons">
          <Link to="/home">
            <button onClick={() => this.toggleUnderline()}>
              <p>Home</p>
            </button>
          </Link>
          <Link to="/drivers">
            <button>
              <p>Drivers</p>
            </button>
          </Link>
          <Link to="/dispatch1">
            <button>
              <p>Dispatch</p>
            </button>
          </Link>
          <Link to="/payroll">
            <button>
              <p>Payroll</p>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
