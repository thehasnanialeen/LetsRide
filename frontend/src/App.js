import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './views/landing.js';  
import Signup from './views/signup.js'; 
import Login from './views/login.js'; 
import selectride from './views/selectride';
import regdriver from './views/regdriver';
import regdrivercon from './views/regdrivercon';
import Rideconfirm from './views/rideconfirm';
import conmessage from './views/conmessage';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/selectride" component={selectride} />
        <Route exact path="/regdriver" component={regdriver} />
        <Route exact path="/regdrivercon" component={regdrivercon} />
        <Route exact path="/rideconfirm" component={Rideconfirm} />
        <Route exact path="/conmessage" component={conmessage} />
         {/* <Route exact path="/provideride" component={provideride} />  */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
