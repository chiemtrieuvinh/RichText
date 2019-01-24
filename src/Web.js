import React, { Component } from 'react'
import App from './App';
import Nav from './components/Nav.js'
import Header from './components/Header.js'

import Footer from './components/Footer.js'

import DieuHuongURL from './components/DieuHuongURL.js'

import {
    BrowserRouter as Router,

  } from 'react-router-dom'


export default class Web extends Component {
  render() {
    return (
       <Router>
            <div>
              <Nav/>
              <Header/>
              <br/>
              {/* <News/>
                <Newsitem/>
                <Contact/> */}
            <DieuHuongURL/>
              <Footer/>  
            </div>
            </Router>
    )
  }
}
