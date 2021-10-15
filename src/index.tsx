import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './fonts/Poppins/Poppins-Regular.ttf';
import './fonts/Poppins/Poppins-Bold.ttf';
import './fonts/Poppins/Poppins-Medium.ttf';
import './fonts/Poppins/Poppins-SemiBold.ttf';
import './fonts/Poppins/Poppins-ExtraBold.ttf';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
