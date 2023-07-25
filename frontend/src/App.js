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
import conmessage from './views/conmessage';
import ratings from './views/ratings';
import AdminHome from './views/adminhome';
import Unregister from './views/unregister';
import Approval from './views/approval';
import DriverRegistrationRejected from './views/driverRegistrationRejected'
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
        <Route exact path="/conmessage" component={conmessage} />
        <Route exact path="/ratings" component={ratings} />
         {/* <Route exact path="/provideride" component={provideride} />  */}
         <Route exact path="/adminhome" component={AdminHome} />
         <Route exact path="/unregister" component={Unregister} />
         <Route exact path="/approval" component={Approval} />
         <Route exact path="/driverRegistrationRejected" component={DriverRegistrationRejected} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
