import React, { Component } from 'react';
import {

    Route,
 
  } from 'react-router-dom'


import News from './News.js'
import Newsitem from './Newsitem.js'
import App from './../App.js'
import ContentManagement from './ContentManagement.js'
import * as firebase from 'firebase';
import { firebaseConnect } from './../firebaseConnect.js';
class DieuHuongURL extends Component {
   
    render() {
       
        return (
          
                 <div>
                <Route exact path="/" component={News}/>
                <Route exact path="/news" component={News}/>
                <Route exact path="/newsitem/:slug.:id.html" component={Newsitem}></Route>
                <Route exact path="/contact" component={App}></Route>
                </div>
             
        
         
        );
    }
}

export default DieuHuongURL;