import React, { useState } from "react";

const QuestionContext = React.createContext();

export const QuestionProvider = ({children}) => {
    const [QuestionType, setQuestionType] = useState(undefined);
    const [QuestionName, setQuestionName] = useState(undefined);
    const [questionLength, setQuestionLength] = useState(undefined); 
    const [QuestionBody, setQuestionBody] = useState(undefined); 
    const [QuestionPath, setQuestionPath] = useState(undefined);
    const [QuestionAnswerOptions, setQuestionAnswerOptions] = useState([]);
    const [QuestionAnswers, setQuestionAnswers] = useState([]);
    const [serialNumber, setSerialNumber] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1)
    const [QuestionSelectedAnswer, setQuestionSelectedAnswer] = useState([])
    const [QuestionPoint, setQuestionPoint] = useState(undefined) 
    const [FullName, setFullName] = useState(localStorage.getItem("name"));
    const [Email, setEmail] = useState(localStorage.getItem("email"));
    const [TotalPoint, setTotalPoint] = useState(undefined);
    const [QuestionTime, setQuestionTime] = useState(0);
    const [showTest, setShowTest] = useState(false);
    const [error, setError] = useState(undefined); 
    const url = (`https://raspberry-bass-ring.cyclic.app`); 
     

        const setAnswerOptions = (value) => {
            setQuestionAnswerOptions([...value])   
        }

        const setSelectedAnswer = (value) => {
            setQuestionSelectedAnswer([...value])
        }

        const setAnswers = (value) => {
            setQuestionAnswers([...value])   
        }

        const Student = { FullName,Email, TotalPoint,questionLength,QuestionName,QuestionPath}

        const Question = {
            QuestionType, QuestionName,QuestionPoint,QuestionBody,
            QuestionPath, QuestionAnswerOptions,QuestionAnswers
        }
        var Path =  window.location.host  + "/admin/report/" + QuestionPath;
        
        const body = {Question,Student,QuestionSelectedAnswer, QuestionTime,Path};



    const QuestionMethods = {
        setFullName,  setEmail,setTotalPoint,setQuestionType,setQuestionName,
         setQuestionLength, setQuestionBody,setAnswerOptions,setSerialNumber,
        setQuestionPath, setAnswers, setSelectedAnswer,setQuestionNumber,setQuestionPoint,
        setQuestionTime, setError, setShowTest
    }

    

    return <QuestionContext.Provider value={{showTest,url,error,body,questionLength,QuestionSelectedAnswer, QuestionMethods, Student, Question,serialNumber, questionNumber,}}>
    {children}
    </QuestionContext.Provider>
}

export default QuestionContext;
