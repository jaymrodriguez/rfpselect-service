import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import '../App.css';

import companyForm from '../components/companyForm';

class App extends Component {
  render() {
    return (
      <Router className="App">
        <Switch>
          <Route exact path="/" component={companyForm} />
        </Switch>
      </Router>
    );
  }
}

export default App;
