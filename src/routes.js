import React from 'react'
import {Switch, Route} from 'react-router-dom'

// import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Dispatch1 from './components/Dispatch/Dispatch1'
import Dispatch2 from './components/Dispatch/Dispatch2'
import Drivers from './components/Drivers/Drivers'
import Payroll from './components/Payroll/Payroll'
import Trucks from './components/Trucks/Trucks'

export default(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/dispatch1" component={Dispatch1}/>
        <Route path="/dispatch2" component={Dispatch2}/>
        <Route path="/drivers" component={Drivers}/>
        <Route path="/payroll" component={Payroll}/>
        <Route path="/trucks" component={Trucks}/>
    </Switch>
)