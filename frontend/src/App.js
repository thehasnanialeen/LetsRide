import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './views/landing.js';  
import Signup from './views/signup.js'; 
import Login from './views/login.js'; 
import selectride from './views/selectride';
import regdriver from './views/regdriver';
import regdrivercon from './views/regdrivercon';
import listofrides from './views/listofrides';
import conmessage from './views/conmessage';
import ratings from './views/ratings';
import AdminHome from './views/adminhome';
import Unregister from './views/unregister';
import Approval from './views/approval';
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
        <Route exact path="/listofrides" component={listofrides} />
        <Route exact path="/conmessage" component={conmessage} />
        <Route exact path="/ratings" component={ratings} />
         {/* <Route exact path="/provideride" component={provideride} />  */}
         <Route exact path="/adminhome" component={AdminHome} />
         <Route exact path="/unregister" component={Unregister} />
         <Route exact path="/approval" component={Approval} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
