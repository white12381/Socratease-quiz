import React,{useContext,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faTrashCan, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import QuestionContext from "../Context/QuestionContext"; 
import DeleteQuestion from "./deleteQuestion";

const QuestionAdd = ({questions}) => {
    const Questions = useContext(QuestionContext); 
    return <>
    {           
        (questions.length > 0) && questions.map( (question, index) => (
            <div id="QuestionForm" className="row" key={index}> 
             <div className="border ps-3 col-10 border-2 mb-5 text-start">
            <div className="row mb-3">
            <div className="col-7 col-md-5">
            <FontAwesomeIcon icon={faGripHorizontal} className="me-1"/>
                Question {index + 1}
            </div>
            <div className="col-5 col-md-3">
                Points: {question.QuestionPoint}
            </div>
            <div className="col-6 col-md-4">
                {question.QuestionType}
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
             <DeleteQuestion index = {index} />
             </div>

       


            </div>
        ))
    }
    </>
}

export default QuestionAdd;