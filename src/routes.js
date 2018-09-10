import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Dispatch from './components/Dispatch/Dispatch'
import Drivers from './components/Drivers/Drivers'
import Payroll from './components/Payroll/Payroll'
import Trucks from './components/Trucks/Trucks'

export default(
    <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/home" component={Home}/>
        <Route path="/dispatch" component={Dispatch}/>
        <Route path="/drivers" component={Drivers}/>
        <Route path="/payroll" component={Payroll}/>
        <Route path="/trucks" component={Trucks}/>
    </Switch>
)