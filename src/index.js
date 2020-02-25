import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import Router from './providers/Router.js'
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
