import React, { useEffect, useState } from "react";
const QuestionContext = React.createContext();

export const QuestionProvider = ({children}) => {

    var path = localStorage.getItem("email") ? localStorage.getItem("email").split("@")[0] : null;

const [QuestionType, SetQuestionType] = useState("MCA");
const [QuestionPoint, setQuestionPoint] = useState('');
const [QuestionBody,setQuestionBody] = useState(undefined);
const [QuestionAnswers, setQuestionAnswers] = useState([]);
const [QuestionName, setQuestionName] = useState('');
const [Path, setPath] = useState(path); 
const [option1, setoption1] = useState(undefined);
const [option2,setoption2] = useState(undefined);
const [option3, setoption3] = useState(undefined);
const [option4, setoption4] = useState(undefined);
const [questionsend, setQuestionsend] = useState(false);
const url = (`https://backend-2g9fdq4zp-white12381s-projects.vercel.app`);
// const url = `http://localhost:4000`

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
    QuestionName,Path
}
const QuestionMethods = {
    setQuestionType,setQuestionPoint, setQuestionBody, setQuestionAnswers,setQuestionName,
    setQuestionsend
}

var setQuestionAnswerOption = {
    setoption1, setoption2, setoption3, setoption4
}
var QuestionAnswerOption = {
    option1, option2, option3, option4
}
    return <QuestionContext.Provider value={{url, questionsend,AddQuestion,setAddQuestion,addQuestion,QuestionValues,QuestionMethods,setQuestionAnswerOption,QuestionAnswerOption}}>
        {children}
    </QuestionContext.Provider>
}

export default QuestionContext;