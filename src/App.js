import React, { Component } from 'react';
import './reset.css'
import './App.css';
import Routes from './routes'
import {withRouter} from 'react-router';

import Sidebar from './components/Sidebar/Sidebar'

class App extends Component {
  render() {
    return (
      <div id="app">

        {/* {this.props.location.pathname !== '/' ? 
        
        <div id="app-left">
          <Sidebar/>
        </div> 
        
        : 
        
        null} */}

<div id="app-left">
          <Sidebar/>
        </div> 

        <div id="app-right">
          {/* <div id="app-header">HEADER</div> */}
            <div id="app-routes">
              {Routes}
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
