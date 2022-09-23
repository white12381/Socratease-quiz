import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState,useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons"
import QuestionContext from '../Context/QuestionContext';

// Option 3
const QuestionOption1 = ({placeinside},{onchange}) => {
    var showtoolbar
    const [value, setValue] = useState('');
    const Question = useContext(QuestionContext);
  
  
  const HandleKeyup = (e) => {
      showtoolbar = true
      console.log(showtoolbar)
  }


  const HandleOnchange = (e) => {
    if(e.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      Question.setQuestionAnswerOption.setoption3(undefined)
    }
    else{
      Question.setQuestionAnswerOption.setoption3(e); 
    }     
  }

  
  const HandleBlur = () => {
    showtoolbar = false;
    if(Question.QuestionAnswerOption.option3 && !Question.QuestionValues.QuestionAnswerOptions.includes(Question.QuestionAnswerOption.option3)){
    Question.setQuestionAnswerOption.setoption3(Question.QuestionAnswerOption.option3); 
    }
    else if (!Question.QuestionAnswerOption.option3){
      Question.setQuestionAnswerOption.setoption3(undefined); 
    }       
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
    <ReactQuill id="option"  placeholder={placeinside} theme="snow" onBlur={HandleBlur}  value={Question.QuestionAnswerOption.option3} onChange={HandleOnchange} modules={modules} onKeyUp={HandleKeyup}   formats={formats}/>
    </div>
  }


  const Option3 = () =>{
 const Question = useContext(QuestionContext);
    return <div className="row mt-4">
    <div className="col-lg-1 col-3 text-end">
    <FontAwesomeIcon icon={faGripHorizontal} className="me-1"/>
    <input type="radio" className="border  me-2" onChange={(e) => {
      if(e.target.checked === true){
        Question.QuestionMethods.setQuestionAnswers([Question.QuestionValues.QuestionAnswerOptions[2]]);
      }
      else if(e.target.checked === true){
        console.log("false");
      }
    } } name="option" />
    </div>
    <div className="col-5 text-start me-5 pe-5">
    <QuestionOption1   placeinside= {"Option 3"} id="texteditor"/>
    </div>
    </div>
    }
 export default Option3;