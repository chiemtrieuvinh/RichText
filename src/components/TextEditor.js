import React, { Component } from 'react';
import { Editor } from 'slate-react'
import {Block} from 'slate'
import Icon from "react-icons-kit"
import {bold} from "react-icons-kit/feather/bold"
import {italic} from "react-icons-kit/feather/italic"
import {x} from "react-icons-kit/feather/x"
import {code} from "react-icons-kit/feather/code"
import {underline} from "react-icons-kit/feather/underline"
import {image} from "react-icons-kit/feather/image"
import styled from '@emotion/styled'
import imageExtensions from 'image-extensions'
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
      if (!event.ctrlKey || event.key !== key) return next()
      // Prevent the default characters from being inserted.
      event.preventDefault()
      // Toggle the mark `type`.
      editor.toggleMark(type)
    },
  }
}


/*
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

function isImage(url) {
  return !!imageExtensions.find(url.endsWith)
}

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: 'image',
    data: { src },
  })
}

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
}

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: '~', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
]
const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`
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

    onMarkClick = (event, type) => {
    event.preventDefault();
    console.log(type)
    this.editor.change(change => {
        change.toggleMark(type)
      })
    }
    onClickImage = event => {
      event.preventDefault()
      const src = window.prompt('Enter the URL of the image:')
      if (!src) return
      this.editor.command(insertImage, src)
    }
  render() {
    return (
        <div className="App">
        <FormatToolBar>
            <button 
            onClick={(event)=>{ this.onMarkClick(event,'bold')}}
            className="tooltip-icon-button">
                <Icon icon={bold}/>
            </button>
            <button 
             onClick={(event)=>{this.onMarkClick(event,'italic')}}
            className="tooltip-icon-button">
                <Icon icon={italic}/>
            </button>
            <button 
                onClick={(event)=>{this.onMarkClick(event,'strikethrough')}}
            className="tooltip-icon-button">
                <Icon icon={x}/>
            </button>
             <button
                 onClick={(event)=>{this.onMarkClick(event,'underline')}}
             className="tooltip-icon-button">
                <Icon icon={underline}/>
            </button>
            <button 
                onClick={(event)=>{this.onMarkClick(event,'code')}}
            className="tooltip-icon-button">
                <Icon icon={code}/>
            </button>
            <button onClick={(event)=>this.onClickImage(event)}>
            <Icon icon={image}></Icon>
           </button>
        </FormatToolBar>
          <Editor
          ref={editor => this.editor = editor}
    plugins={plugins}
    value={this.props.value}
    onChange={this.props.onChange}
    renderMark={this.renderMark}
    schema={schema} 
    renderNode={this.renderNode}
         />
        
      </div>
     
    )
  }


  renderNode = (props, editor, next) => {
    const { attributes, node, isFocused } = props

    switch (node.type) {
      case 'image': {
        const src = node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
      }

      default: {
        return next()
      }
    }
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
