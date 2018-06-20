import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import CompanyForm from '../components/CompanyForm';

class App extends Component {
  state = {};
  render() {
    return (
      <Grid>
        <Router className="App">
          <Switch>
            <Route exact path="/" component={CompanyForm} />
          </Switch>
        </Router>
      </Grid>
    );
  }
}

export default App;
