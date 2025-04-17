import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import App from './App';
import Menu from './components/Menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from 'react-router-dom';
import 'bootswatch/dist/cosmo/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
      <Menu />
      <div className="container">
        <ToastContainer autoClose={2000} />
        <App />
      </div>
   </BrowserRouter>,
  document.getElementById("root")
);
