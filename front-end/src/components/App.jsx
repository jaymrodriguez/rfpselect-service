import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import '../App.css';

import CompanyForm from '../components/CompanyForm';

class App extends Component {
  render() {
    return (
      <Router className="App">
        <Switch>
          <Route exact path="/" component={CompanyForm} />
        </Switch>
      </Router>
    );
  }
}

export default App;
