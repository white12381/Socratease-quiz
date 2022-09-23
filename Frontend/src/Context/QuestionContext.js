import React, { useEffect, useState } from "react";
const QuestionContext = React.createContext();

export const QuestionProvider = ({children}) => {


const [QuestionType, SetQuestionType] = useState("MCA");
const [QuestionPoint, setQuestionPoint] = useState('');
const [QuestionBody,setQuestionBody] = useState(undefined);
const [QuestionAnswers, setQuestionAnswers] = useState([]);
const [QuestionName, setQuestionName] = useState("Maths");
// var QuestionAdd = []; 
const [option1, setoption1] = useState(undefined);
const [option2,setoption2] = useState(undefined);
const [option3, setoption3] = useState(undefined);
const [option4, setoption4] = useState(undefined);

var QuestionAnswerOptions = [];

 const [addQuestion, setAddQuestion] = useState([]);

 const AddQuestion = (value) => {
    setAddQuestion([...addQuestion,value]);
 }
 

useEffect( () => {
    if(option1){
        QuestionAnswerOptions.push(option1);
        }
        if(option2){
        QuestionAnswerOptions.push(option2);
        }
        if(option3){
        QuestionAnswerOptions.push(option3)
        }
        if(option4){
        QuestionAnswerOptions.push(option4);
        } 
})

const setQuestionType = (value) => {
    SetQuestionType(value);
}

const QuestionValues = {
 QuestionType, QuestionPoint, QuestionBody, QuestionAnswerOptions, QuestionAnswers,
    QuestionName
}
const QuestionMethods = {
    setQuestionType,setQuestionPoint, setQuestionBody, setQuestionAnswers
}

var setQuestionAnswerOption = {
    setoption1, setoption2, setoption3, setoption4
}
var QuestionAnswerOption = {
    option1, option2, option3, option4
}
    return <QuestionContext.Provider value={{AddQuestion,setAddQuestion,addQuestion,QuestionValues,QuestionMethods,setQuestionAnswerOption,QuestionAnswerOption}}>
        {children}
    </QuestionContext.Provider>
}

export default QuestionContext;