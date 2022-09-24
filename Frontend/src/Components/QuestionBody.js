import React, { useState,useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuestionContext from "../Context/QuestionContext"; 
 


const QuestionBody = ({placeinside},{onchange}) => {

  const Question = useContext(QuestionContext);

  var showtoolbar
  const [value, setValue] = useState('');



const HandleKeyup = (e) => {
    showtoolbar = true 
}

const HandleBlur = () => {
    showtoolbar = false; 
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



  const HandleOnchange = (e) => {
    if(e.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      Question.QuestionMethods.setQuestionBody(undefined)
    }
    else{
      Question.QuestionMethods.setQuestionBody(e)
    } 
  }



  return <div> 
  <ReactQuill   placeholder={placeinside} theme="snow" onBlur={HandleBlur}  value={Question.QuestionValues.QuestionBody} onChange={HandleOnchange} modules={modules} onKeyUp={HandleKeyup}   formats={formats}/>
  </div>
}
 

export default QuestionBody;