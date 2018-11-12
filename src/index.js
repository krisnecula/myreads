import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
//BrowserRoute mounts the pages to the routes

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
//wrap BrowserRouter around the app component:
//allows us to use route components inside BrowserRouter

//Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js')
  .catch(function(err) {
    console.error(err);
  });
}
