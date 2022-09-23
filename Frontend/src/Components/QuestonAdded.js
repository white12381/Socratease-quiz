import React,{useContext,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faTrashCan, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import QuestionContext from "../Context/QuestionContext"; 

const QuestionAdd = ({questions}) => {
    const Questions = useContext(QuestionContext);
    const [removemodal, setRemovemodal] = useState(false);
    const removeQuestion = (index) => {
        const temp = [...Questions.addQuestion];
        temp.splice(index,1);
        Questions.setAddQuestion([...temp]); 
        setRemovemodal(true)
        console.log(Questions.addQuestion)
        const modal = document.getElementById('exampleModal');
        modal.dispose();
    }
    return <>
    {           
        (questions.length > 0) && questions.map( (question, index) => (
            <div id="QuestionForm" className="row" key={index}> 
             <div className="border ps-3 col-10 border-2 mb-5 text-start">
            <div className="row mb-3">
            <div className="col-6">
            <FontAwesomeIcon icon={faGripHorizontal} className="me-1"/>
                Question {index + 1}
            </div>
            <div className="col-2">
                {question.QuestionType}
            </div>
            <div className="col-4">
                Points: {question.QuestionPoint}
            </div>
            </div>
                Question: <br/>
                <div dangerouslySetInnerHTML={{__html: question.QuestionBody}} />

                 Options <br/>               
                {
                question.QuestionAnswerOptions && question.QuestionAnswerOptions.map( (opt,i) => (
                    <div key={i}>
                        <div>
                        <input type={(question.QuestionType === "MCA") ? "radio" : "hidden"} readOnly className="me-2" />
                            <label dangerouslySetInnerHTML={{__html: opt}} />
                            </div>
                    </div>
                ))
            } 


            Answer(s) <br/>               
                {
                question.QuestionAnswers && question.QuestionAnswers.map( (opt,i) => (
                    <div key={i}>
                        <div>
                         <label dangerouslySetInnerHTML={{__html: opt}} />
                            </div>
                    </div>
                ))
            }

            </div>
             <div className="col-2 d-flex align-items-center ps-3">
             <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
             <FontAwesomeIcon icon={faTrashCan} />
             </button>
             </div>

              
 <div className={"modal fade"} id="exampleModal"  data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content"> 
      <div className="modal-body">
      <FontAwesomeIcon icon={faCircleStop} className="text-danger me-2" />
      Are you sure you want to  permanently delete this Question ?
        <div className="float-end mt-3" >
        <button className="btn btn-light me-2 border text-dark" data-bs-dismiss="modal">No</button>
        <button className="btn btn-danger text-light" data-bs-dismiss={removemodal ? "modal" : "none"} onClick={(index) => removeQuestion(index)} >Yes</button>
        </div>
      </div>
    </div>
  </div>
</div>


            </div>
        ))
    }
    </>
}

export default QuestionAdd;