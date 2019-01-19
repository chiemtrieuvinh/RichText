import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Icon from "react-icons-kit"
import {bold} from "react-icons-kit/feather/bold"
import {italic} from "react-icons-kit/feather/italic"
import {x} from "react-icons-kit/feather/x"
import {code} from "react-icons-kit/feather/code"
import {underline} from "react-icons-kit/feather/underline"
import FormatToolBar from './FormatToolBar';
// const existingValue = JSON.parse(localStorage.getItem('content'))
//   const initialValue = Value.fromJSON(
//   existingValue || {
//     document: {
//       nodes: [
//         {
//           object: 'block',
//           type: 'paragraph',
//           nodes: [
//             {
//               object: 'text',
//               leaves: [
//                 {
//                   text: 'A line of text in a paragraph.',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   }
// )
function MarkHotkey(options) {
  // Grab our options from the ones passed in.
  const { type, key } = options
   // Return our "plugin" object, containing the `onKeyDown` handler.
   return {
    onKeyDown(event, editor, next) {
      // If it doesn't match our `key`, let other plugins handle it.
      if (!event.ctrlKey || event.key != key) return next()
      // Prevent the default characters from being inserted.
      event.preventDefault()
      // Toggle the mark `type`.
      editor.toggleMark(type)
    },
  }
}

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: '~', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
]

class TextEditor extends Component { 
  //  state={
  //     value: initialValue
  //   }
    // On change, update the app's React state with the new editor value.
    // onChange = ({value}) => {
    //  // Check to see if the document has changed before saving.
    // if (value.document != this.state.value.document) {
    //   const content = JSON.stringify(value.toJSON())
    //   localStorage.setItem('content', content)
    // }
    //   this.setState({ value: this.state.value })
    // }
    onMarkClick = (e, type) => {
      e.preventDefault();
      this.editor.change(change => {
        change.toggleMark(type)
      })
    };
  render() {
    return (
        <div className="App">
        <FormatToolBar>
            <button 
            onPointerDown={(e)=>this.onMarkClick(e,'bold')}
            className="tooltip-icon-button">
                <Icon icon={bold}/>
            </button>
            <button 
             onPointerDown={(e)=>this.onMarkClick(e,'italic')}
            className="tooltip-icon-button">
                <Icon icon={italic}/>
            </button>
            <button 
                onPointerDown={(e)=>this.onMarkClick(e,'strikethrough')}
            className="tooltip-icon-button">
                <Icon icon={x}/>
            </button>
             <button
                 onPointerDown={(e)=>this.onMarkClick(e,'underline')}
             className="tooltip-icon-button">
                <Icon icon={underline}/>
            </button>
            <button 
                onPointerDown={(e)=>this.onMarkClick(e,'code')}
            className="tooltip-icon-button">
                <Icon icon={code}/>
            </button>
        </FormatToolBar>
          <Editor
          ref={editor => this.editor = editor}
    plugins={plugins}
    value={this.props.value}
    onChange={this.props.onChange}
    renderMark={this.renderMark}
         />
        
      </div>
     
    )
  }

  // Add a `renderMark` method to render marks.
  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      // Add our new mark renderers...
      case 'code':
        return <code>{props.children}</code>
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
      default:
        return next()
    }
  }
}


export default TextEditor;
