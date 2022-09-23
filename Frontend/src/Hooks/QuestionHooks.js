import React, { useState } from "react";
import { useContext } from "react";
import QuestionContext from "../Context/QuestionContext";


const Question = () => {
const Question = useContext(QuestionContext)
const QuestionAdd = Question.addQuestion;

const AddBtn = () => {
     
if(Question.QuestionValues.QuestionType && Question.QuestionValues.QuestionPoint && Question.QuestionValues.QuestionBody
&& (Question.QuestionValues.QuestionAnswerOptions.length > 1) && (Question.QuestionValues.QuestionAnswers.length > 0) ){
    Question.AddQuestion(Question.QuestionValues);   
    Question.QuestionMethods.setQuestionType("MCA"); 
    Question.QuestionMethods.setQuestionBody(undefined);
    Question.setQuestionAnswerOption.setoption1(undefined); Question.setQuestionAnswerOption.setoption2(undefined)
    Question.setQuestionAnswerOption.setoption3(undefined); Question.setQuestionAnswerOption.setoption4(undefined)
    Question.QuestionMethods.setQuestionAnswers([]);
}
else {
    
}  
}

const SaveBtn = async () => { 
    
    const temp = [...QuestionAdd];
    if(QuestionAdd.length > 0){
        for(let i = 0; i < QuestionAdd.length; i++){
   const response = await fetch('http://127.0.0.1:4000/api/question',{
            method: 'POST', 
            body: JSON.stringify(QuestionAdd[i]),
            headers: {'Content-Type': 'application/json'}
});


const data = await response.json();

console.log(response)
if(!response.ok){
    console.log(data.error);
}
else{
    temp.splice(i,1);
}

    }
    
Question.setAddQuestion([...temp]);
console.log(QuestionAdd)
}

}

    return {AddBtn, SaveBtn};
}

export default Question