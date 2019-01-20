import * as firebase from 'firebase';
import { firebaseConnect } from './firebaseConnect.js';
import React, { Component } from 'react';

import './App.css';
import ContentManagement from './components/ContentManagement';
import { Value } from 'slate'

const existingValue = JSON.parse(localStorage.getItem('content'))
  const initialValue = Value.fromJSON(
  existingValue || {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  }
)
class App extends Component { 
  constructor(props){
    super(props)
    this.state={
      title: '',
      author: '',
      file: null,
      image: '',
      value : initialValue,
      array:[]
    }
 
  }
  onChange = ({value})=>{
       if (value.document != this.state.value.document) {
        const content = JSON.stringify(value.toJSON())
        localStorage.setItem('content', content)
      }
    this.setState({value:value})
  }  
  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  handleImageChange=(e) =>{
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        image: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = (e)=>{
    console.log(this.state.value)

    console.log('ban vua click vao nut nay')
    var data = firebase.database().ref('dataForRichText')
    e.preventDefault();
   
      data.push({
        title: this.state.title,
        author: this.state.author,
        image: this.state.image,
        value: JSON.stringify(this.state.value.toJSON())
     
    })

  
    // const data={
    //   title: this.state.title,
    //   author: this.state.author,
    //   image: this.state.image,
    //   value : this.state.value,
    // }
    // this.setState({
    //   title: '',
    //   author: '',
    //   image: '',
    //   value :  this.state.value,
    //   array: [].concat(this.state.array,data)
    // })
  }
  render() {
   
    return (
      <div>
          <ContentManagement handleImageChange={this.handleImageChange} handleSubmit={this.handleSubmit} value={this.state.value} handleChange={this.handleChange} onChange={this.onChange} title={this.state.title} author={this.state.author} image={this.state.image} />
         
      </div>
    );
  }
}


export default App;
