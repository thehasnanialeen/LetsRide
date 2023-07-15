import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
//import Signup from './views/signup.js';
import Landing from './views/landing.js';  

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
