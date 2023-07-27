import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './views/landing.js';  
import Signup from './views/signup.js'; 
import Login from './views/login.js'; 
import Selectride from './views/selectride';
import regdriver from './views/regdriver';
import regdrivercon from './views/regdrivercon';
import Listofrides from './views/listofrides';
import Conmessage from './views/conmessage';
import ratings from './views/ratings';
import AdminHome from './views/adminhome';
import Unregister from './views/unregister';
import Approval from './views/approval';
import DriverRegistrationRejected from './views/driverRegistrationRejected';
import RecentRidesList from './views/recentRidesList';
import Riderconfirmation from './views/riderconfirmation';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/selectride" component={Selectride} />
        <Route exact path="/regdriver" component={regdriver} />
        <Route exact path="/regdrivercon" component={regdrivercon} />
        <Route exact path="/listofrides" component={Listofrides} />
        <Route exact path="/conmessage" component={Conmessage} />
        <Route exact path="/ratings" component={ratings} />
         <Route exact path="/adminhome" component={AdminHome} />
         <Route exact path="/unregister" component={Unregister} />
         <Route exact path="/approval" component={Approval} />
         <Route exact path="/driverRegistrationRejected" component={DriverRegistrationRejected} />
         <Route exact path="/recentRidesList" component={RecentRidesList} />
         <Route exact path="/riderconfirmation" component={Riderconfirmation} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
