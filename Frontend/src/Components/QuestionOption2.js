import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState,useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons"
import QuestionContext from '../Context/QuestionContext';


// Option 2
const QuestionOption2 = ({placeinside},{onchange}) => {
    var showtoolbar
    const [value, setValue] = useState('');
    const Question = useContext(QuestionContext);

  
  
  const HandleKeyup = (e) => {
      showtoolbar = true 
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
        Question.setQuestionAnswerOption.setoption2(undefined)
      }
      else{
        Question.setQuestionAnswerOption.setoption2(e)
      }     
    }

    const HandleBlur = () => {
      showtoolbar = false;
      if(Question.QuestionAnswerOption.option2 && !Question.QuestionValues.QuestionAnswerOptions.includes(Question.QuestionAnswerOption.option2)){
      Question.setQuestionAnswerOption.setoption2(Question.QuestionAnswerOption.option2); 
      }
      else if (!Question.QuestionAnswerOption.option2){
        Question.setQuestionAnswerOption.setoption2(undefined); 
      }
          
  }

  
    return<div> 
    <ReactQuill id="option"  placeholder={placeinside} theme="snow" onBlur={HandleBlur}  value={Question.QuestionAnswerOption.option2} onChange={HandleOnchange} modules={modules} onKeyUp={HandleKeyup}   formats={formats}/>
    </div>
  }


  const Option2 = () =>{
 const Question = useContext(QuestionContext)
    return <div className={(Question.QuestionValues.QuestionType === "MCA") ? "row mt-4": "d-none"}>
    <div className="col-lg-1 col-3 text-end">
    <FontAwesomeIcon icon={faGripHorizontal} className="me-1"/>
    <input type="radio" className="border  me-2" value={Question.QuestionValues.QuestionAnswerOptions[1]} onChange={(e) => {
      if(e.target.checked === true){
        Question.QuestionMethods.setQuestionAnswers([Question.QuestionValues.QuestionAnswerOptions[1]]);
      }
      else if(e.target.checked === true){
        console.log("false");
      }
    } } name="option" />
    </div>
    <div className="col-5 text-start me-5 pe-5">
    <QuestionOption2   placeinside= {"Option 2"} id="texteditor"/>
    </div>
    </div>
    }

export default Option2