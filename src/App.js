import React from 'react';
// import firebase from './config';
import './App.css';
import AddClientInfo from './pages/waiter.js';
import Kitchen from './pages/kitchen.js'
import Header from './components/Header/index.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header
          alt={'Burger Queen'}
        />
      </div>
      <div>
        <Switch>
          <Route exact path="/service" component={AddClientInfo} />
          <Route exact path="/kitchen" component={Kitchen} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;