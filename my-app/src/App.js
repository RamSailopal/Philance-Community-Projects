import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "philance/routes/index.jsx";
import { connect } from 'react-redux'
import './App.css';
import 'antd/dist/antd.css';
const hist = createBrowserHistory();

class App extends Component {


  render() {
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    id: state.auth.userId
  }
}
export default connect(mapStateToProps)(App);
