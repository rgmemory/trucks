import React, { Component } from "react";
import "./drivers.css";
import axios from "axios";
import Simpletable from "../Drivertable/Drivertable";
import plus from "../../images/plus.png";
import ReactModal from "react-modal";

export default class Drivers extends Component {
  constructor() {
    super();

    this.state = {
      drivers: [],
      showModal: false,
      showEditModal: false,
      first: "",
      last: "",
      phone: null,
      station: "",
      driverEditIndex: null,
      email: ""
    };
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });

    this.modalSubmit();
  };

  showEditModal = () => {
    this.setState({
      showEditModal: true
    });
  };

  hideEditModal = () => {
    this.setState({
      showEditModal: false
    });

    this.submitEditDriver();
  };

  editDriverInfo = value => {
    this.showEditModal();
    this.setState({
      driverEditIndex: value
    });
  };

  submitEditDriver = () => {
    let { first, last, email, station, driverEditIndex } = this.state;

    if (first && last && email && station && driverEditIndex) {
      axios
        .post("/api/editDriverInfo", {
          first,
          last,
          email,
          station,
          driverEditIndex
        })
        .then(res => {
          axios.get("/api/getdrivers").then(res => {
            this.setState({
              drivers: res.data
            });
          });
        });
    } else {
      alert("Please fill out all fields");
    }
  };
  componentDidMount() {
    axios.get("/api/getdrivers").then(res => {
      this.setState({
        drivers: res.data
      });
    });
  }

  updateFirst = target => {
    this.setState({
      first: target
    });
  };
  updateLast = target => {
    this.setState({
      last: target
    });
  };
  updatePhone = target => {
    this.setState({
      phone: target
    });
  };
  updateStation = target => {
    this.setState({
      station: target
    });
  };

  updateEmail = target => {
    this.setState({
      email: target
    });
  };

  modalSubmit = () => {
    let { first, last, phone, station, email } = this.state;

    this.updateFirst();
    this.updateLast();
    this.updatePhone();
    this.updateStation();
    this.updateEmail();

    if (first && last && station && email) {
      axios
        .post("/api/submitdriver", { first, last, phone, station, email })
        .then(res => {
          axios.get("/api/getdrivers").then(res => {
            this.setState({
              drivers: res.data
            });
          });
        });
    } else {
      alert("Please fill out all fields");
    }
  };

  deleteDriver = id => {
    axios.delete(`/api/deletedriver/${id}`).then(response => {
      axios.get("/api/getdrivers").then(res => {
        this.setState({
          drivers: res.data
        });
      });
    });
  };

  render() {
    return (
      <div id="drivers">
        <div id="app-header">
          <p>Drivers</p>
        </div>

        <div id="drivers-table">
          <Simpletable
            drivers={this.state.drivers}
            deleteDriver={this.deleteDriver}
            editDriver={this.editDriverInfo}
          />
        </div>

        <div id="drivers-add">
          <button onClick={this.handleOpenModal}>
            <img src={plus} alt="plus sign" />
            Add Driver
          </button>
        </div>

        {/* editmodal */}
        <ReactModal
          isOpen={this.state.showEditModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.hideEditModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div id="truck-modal">
            <div className="truck-input-unit">
              <p>First</p>
              <input
                type="text"
                onChange={e => {
                  this.updateFirst(e.target.value);
                }}
              />
            </div>
            <div className="truck-input-unit">
              <p>Last</p>
              <input
                type="text"
                onChange={e => {
                  this.updateLast(e.target.value);
                }}
              />
            </div>
            <div className="truck-input-unit">
              <p>Email</p>
              <input
                type="text"
                onChange={e => {
                  this.updateEmail(e.target.value);
                }}
              />
            </div>
            <div className="truck-input-unit">
              <p>Station</p>
              <input
                type="text"
                onChange={e => {
                  this.updateStation(e.target.value);
                }}
              />
            </div>

            <div id="truck-modal-bottom">
              <button onClick={this.hideEditModal}>Submit</button>
            </div>
          </div>
        </ReactModal>

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
              <input
                type="text"
                onChange={e => {
                  this.updateFirst(e.target.value);
                }}
              />
            </div>
            <div className="truck-input-unit">
              <p>Last</p>
              <input
                type="text"
                onChange={e => {
                  this.updateLast(e.target.value);
                }}
              />
            </div>
            {/* <div className="truck-input-unit">
              <p>Email</p>
              <input
                type="text"
                onChange={e => {
                  this.updatePhone(e.target.value);
                }}
              />
            </div> */}
            <div className="truck-input-unit">
              <p>Email</p>
              <input
                type="text"
                onChange={e => {
                  this.updateEmail(e.target.value);
                }}
              />
            </div>
            <div className="truck-input-unit">
              <p>Station</p>
              <input
                type="text"
                onChange={e => {
                  this.updateStation(e.target.value);
                }}
              />
            </div>

            <div id="truck-modal-bottom">
              <button onClick={this.handleCloseModal}>Submit</button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
