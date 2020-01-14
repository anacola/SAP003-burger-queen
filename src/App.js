import React from 'react';
// import firebase from './config';
import './App.css';
import AddClientInfo from './pages/waiter.js';
import Kitchen from './pages/kitchen.js';
import Delivery from './pages/delivery.js';
import Main from './pages/main.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/service" component={AddClientInfo} />
          <Route exact path="/kitchen" component={Kitchen} />
          <Route exact path="/delivery" component={Delivery} />
          <Route exact path="/" component={Main}/>
        </Switch>
    </Router>
  );
}

export default App;