import React, { Component } from 'react';

import RelatedNews from './RelatedNews.js'
import * as firebase from 'firebase';
import { firebaseConnect } from './../firebaseConnect.js';
import PasteHtml from './PasteHtml';
class Newsitem extends Component {
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
          getData:  [].concat(this.state.getData,listget)
       })
    
  })
 
}
    render() {
       console.log(this.props.match.params.id)

        return (
          <div className="relatednews">
          {
             this.state.getData.map((value,key)=>{
            if(value.key === this.props.match.params.id)
            {
              return(
               <div className="container" key={key}>
             <div className="jumbotron jumbotron-fluid">
               <img className="img-fluid" src={value.image} alt="qwe" />
               <div className="container">
                 <h1 className="display-3">{value.title}</h1>
                 <p className="lead">{value.author}</p>
                <PasteHtml value={value.value}/>
                 <hr className="my-2" />
              
               </div>
             </div>
             </div>

              )}
              return true;
          }) 
          })


          }
        
            <div className="card border-primary">
              <div className="card-body">
                <h1 className="card-title" style={{textAlign: 'center'}}>Tin lien quan</h1>
                
              </div>
            </div>


            <div className="container">
                   <div className="row">
                   <div className="col-12">
                     <div className="card-columns">
                     
                     {
                       this.state.getData.map((value,key)=>{
                     
                       if(value.key !== this.props.match.params.id){
                         if(key <= 3){
                         return(
                          //  true
                          <RelatedNews key={key} id={value.key} image={value.image} author={value.author} title={value.title} value={value.value}/>
                         )
                         }else{
                           return true
                         }
                       
                        }
                        return true
                      }
                    )
                      }
                    
           </div>
           </div>
             </div>
           </div>
          </div>
          
        );
    }
}

export default Newsitem;