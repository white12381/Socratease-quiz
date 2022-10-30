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

var QuestionName = Question.QuestionValues.Path + "/" + Question.QuestionValues.QuestionName;
var Path =  window.location.host  + "/student/Question";
const email = `${Question.QuestionValues.Path}@gmail.com`
const body = {QuestionName, Path,email};

const SaveBtn = async () => { 
    const toastId = 2;
    const temp = [...QuestionAdd];
    var success = true;
    if(QuestionAdd.length > 0){
        for(let i = 0; i < QuestionAdd.length; i++){
            QuestionAdd[i].QuestionName = Question.QuestionValues.QuestionName;
            QuestionAdd[i].QuestionTime = localStorage.getItem("timer");
   const response = await fetch(`${Question.url}/api/question`,{
            method: 'POST', 
            body: JSON.stringify(QuestionAdd[i]),
            headers: {'Content-Type': 'application/json'}
});

const index = await temp.indexOf(QuestionAdd[i]); 


const data = await response.json();
 
if(!response.ok){
    success = false; 
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
    await temp.splice(index,1);
   }


    }

    if(success){

        const response = await fetch(`${Question.url}/api/sendEmail`,{
            method: 'POST', 
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    console.log("email response from server " + data)
    if(response.ok){
        toast.success("Question Created Successfuly, check your Gmail for Question link",{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            toastId: toastId,
            hideProgressBar: true
        });
        localStorage.removeItem("timer");
       

        const finishquestion = await fetch(`${Question.url}/api/finishquestion`,{
            method: 'POST', 
            body: JSON.stringify(QuestionAdd[0]),
            headers: {'Content-Type': 'application/json'}
    });
    console.log(`Before Finish Question ${QuestionAdd[0]}`)
    const datas = await finishquestion.json();
    if(finishquestion.ok){
        Question.setAddQuestion([]);
    }
    }
    else{ 
        console.log(response.error);
        const toastId = 3;
        toast.error("Network Error, Please try again later" ,{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            toastId: toastId,
            hideProgressBar: true
        });
    }


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