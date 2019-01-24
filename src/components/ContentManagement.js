import React, { Component } from 'react'
import TextEditor from './TextEditor';
export default class ContentManagement extends Component {
  render() {
    return (
      <div className="contain">
        <h1 className="heading1">Contain Management</h1>
        <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <h6>Title</h6>
          <input type="text" name="title" onChange={this.props.handleChange} value={this.props.title} className="form-control" aria-describedby="helpId"/>
          <h6>Author</h6>
          <input type="text" name="author"  onChange={this.props.handleChange} value={this.props.author} className="form-control"  aria-describedby="helpId"/>
          <h6>Image</h6>
          <input type="file" name="image" onChange={this.props.handleImageChange} className="form-control" placeholder="" aria-describedby="helpId"/>
          <hr/>
          <div className="card-deck">
            <div className="card">
              <img className="card-img-top2" src={this.props.image}/>
              <div className="card-body">
                <h5 className="card-title">Selected Image</h5>
              </div>
            </div>
          </div>
          <hr/>
          <h6>Content</h6>
          <TextEditor value={this.props.value} onChange={this.props.onChange}/>
          <button className="btn btn-primary float-right">Save</button>
        </div>
        </form>
      </div>
    )
  }
}
