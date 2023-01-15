import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import QuestionContext from "../Context/QuestionContext";

const QuestionSelectedAnswer = ({placeinside},{onchange}) => {
    var showtoolbar
    const [value, setValue] = useState(undefined)
    const Question = useContext(QuestionContext);  
  
     

    const toolbars = [ 
      ['bold', 'italic', 'underline','strike', 'clean'],
      [{'script': 'super'},{'script': 'sub'}], 
      [{'list': 'ordered'}, {'list': 'bullet'}], 
      ['link','image'], [{ color: [] }, { background: [] }],
   
    ];
    const modules = {
      toolbar:  false
    }
  
   
   const  formats = [
      'bold', 'italic', 'underline', 'clean','strike','script',
      'list', 'bullet',
      'link','image','color','background'
    ]

    // const HandleOnchange = (e) => {
    //   setValue(e)
    //   var values = [value]
    //    Question.QuestionMethods.setSelectedAnswer(values);
    //   }     
    
      return <div> 
     
      <ReactQuill id="option"  placeholder={placeinside} theme="snow"    value={value}    onChange={setValue} modules={modules}  formats={formats}/>
      </div>}

  export default QuestionSelectedAnswer;