import React, { Component } from 'react';
import InNews from './InNews.js'

import * as firebase from 'firebase';
import { firebaseConnect } from './../firebaseConnect.js';
class News extends Component {
    constructor(props){
        super(props)
        this.state={
            getData : []
        }
    }
    componentWillMount(){
        var data = firebase.database().ref('DataForText')
        data.on('value', (notes)=>{
            var listget = []
            notes.forEach(element => {
                const key = element.key
                const title = element.val().title
                const image = element.val().image
                const author = element.val().author
                const value = element.val().value
                listget.push({
                    key: key,
                    author: author,
                    image: image,
                    title: title,
                    value: value
                    
                })
               
            });
             this.setState({
                getData: [].concat(this.state.getData,listget)
             })
          
        })
       
    }
    render() {
      console.log(this.state.getData)
    //   const list = this.state.getData.map((item)=>{
    //       return <ul>
    //           <li>{item.title}</li>
    //           <li>{item.author}</li>
    //       </ul>
    //   })
        return (
            <div className="container-fluid">
            <img className="img1" src="https://media.wsls.com/photo/2017/04/24/Whats%20News%20Today_1493062809311_9576980_ver1.0_1280_720.png"/>    
           
          <div className="container1">
          <div className="row">
            
              {
                this.state.getData.map((value,key)=>{
                  return(
                      <InNews key={key} id={value.key} image={value.image} author={value.author} title={value.title} value={value.value}/>
                  )
                })
              }
             
          </div>
        </div>
        </div>
        );
    }
}

export default News;
