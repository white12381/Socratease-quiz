import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

 


const QuestionBody = ({placeinside},{onchange}) => {
  var showtoolbar
  const [value, setValue] = useState('');



const HandleKeyup = (e) => {
    showtoolbar = true
    console.log(showtoolbar)
}

const HandleBlur = () => {
    showtoolbar = false;
    console.log(showtoolbar);
}


 const toolbars = [ 
    ['bold', 'italic', 'underline','strike', 'clean'],
    [{'script': 'super'},{'script': 'sub'}], 
    [{'list': 'ordered'}, {'list': 'bullet'}], 
    ['link','image'], [{ color: [] }, { background: [] }],
 
  ];
  const modules = {
    toolbar:  toolbars
  }

 
 const  formats = [
    'bold', 'italic', 'underline', 'clean','strike','script',
    'list', 'bullet',
    'link','image','color','background'
  ]



  return <div> 
  <ReactQuill   placeholder={placeinside} theme="snow" onBlur={HandleBlur}  value={value} onChange={setValue} modules={modules} onKeyUp={HandleKeyup}   formats={formats}/>
  </div>
}
 

export default QuestionBody;