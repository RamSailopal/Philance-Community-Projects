import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import App from './App'

import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";
import store from './philance/store/store'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
