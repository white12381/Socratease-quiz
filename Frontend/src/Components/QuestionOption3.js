import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons"

// Option 3
const QuestionOption1 = ({placeinside},{onchange}) => {
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
    <ReactQuill id="option"  placeholder={placeinside} theme="snow" onBlur={HandleBlur}  value={value} onChange={setValue} modules={modules} onKeyUp={HandleKeyup}   formats={formats}/>
    </div>
  }


  const Option3 = () =>{
 
    return <div className="row mt-4">
    <div className="col-lg-1 col-3 text-end">
    <FontAwesomeIcon icon={faGripHorizontal} className="me-1"/>
    <input type="radio" className="border  me-2" onClick={(e) => {
      if(e.target.checked === true){
        console.log("true");
      }
      else if(e.target.checked === true){
        console.log("false");
      }
    } } name="option" />
    </div>
    <div className="col-5 text-start me-5 pe-5">
    <QuestionOption1   placeinside= {"Option 1"} id="texteditor"/>
    </div>
    </div>
    }
 export default Option3;