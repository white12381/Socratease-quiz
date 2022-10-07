import { useContext } from "react";
import QuestionContext from "../Context/QuestionContext"; 
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const Question = () => {
const Question = useContext(QuestionContext)
const QuestionAdd = Question.addQuestion;

const AddBtn = () => {
     
if(Question.QuestionValues.QuestionType && Question.QuestionValues.QuestionPoint && Question.QuestionValues.QuestionBody
 && (Question.QuestionValues.QuestionAnswers.length > 0) ){
    Question.AddQuestion(Question.QuestionValues);    
    Question.QuestionMethods.setQuestionBody(undefined);
    Question.setQuestionAnswerOption.setoption1(undefined); Question.setQuestionAnswerOption.setoption2(undefined)
    Question.setQuestionAnswerOption.setoption3(undefined); Question.setQuestionAnswerOption.setoption4(undefined)
    Question.QuestionMethods.setQuestionAnswers([]);
}
else {
    const toastId = 1;
    toast.error("All feilds are required",{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: toastId,
        hideProgressBar: true
    });
}  
}

const SaveBtn = async () => { 
    const toastId = 2;
    const temp = [...QuestionAdd];
    if(QuestionAdd.length > 0){
        for(let i = 0; i < QuestionAdd.length; i++){
            QuestionAdd[i].QuestionName = Question.QuestionValues.QuestionName;
   const response = await fetch('http://127.0.0.1:4000/api/question',{
            method: 'POST', 
            body: JSON.stringify(QuestionAdd[i]),
            headers: {'Content-Type': 'application/json'}
});


const data = await response.json();
 
if(!response.ok){
    const err = data.error;
    const toastId = 3;
    toast.error(err ,{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: toastId,
        hideProgressBar: true
    });
}
else{
    toast.success("Question Created Successfuly",{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: toastId,
        hideProgressBar: true
    })
}
Question.setAddQuestion([]);

    }
     
}

else {
    toast.error("Please enter a Question for Question one",{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: toastId,
        hideProgressBar: true
    });
}
 

}

    return {AddBtn, SaveBtn};
}

export default Question