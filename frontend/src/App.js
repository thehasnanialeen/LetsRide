import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './views/landing.js';  
import Header from './views/header.js'; 
//import Signup from './views/signup.js'; 

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={OnboardingScreen} />
        <Route path="/finance" component={Finance} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/tutorials" component={TutorialScreen} />
        <Route exact path="/equipment" component={EquipmentPage} />
      </Switch>
    
    </BrowserRouter>
  );
}

export default App;
