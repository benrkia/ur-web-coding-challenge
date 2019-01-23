import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import NearbyShops from './pages/NearbyShops'
import PreferredShops from './pages/PreferredShops'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={NearbyShops} />
                <Route path='/preferred' component={PreferredShops} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
