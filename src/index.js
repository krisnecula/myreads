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
