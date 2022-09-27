import React, { useState } from "react";

const QuestionContext = React.createContext();

export const QuestionProvider = ({children}) => {
    const [questionName, setQuestionName] = useState(undefined);
    const [questionLength, setQuestionLength] = useState(undefined);
    const [questionBody, setQuestionBody] = useState(undefined);
    const [questionAnswerOptions, setQuestionAnswerOptions] = useState([]);
    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [serialNumber, setSerialNumber] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1)
    const [selectedAnswer, setSelectedAnswer] = useState(undefined)
    const [questionPoint, setQuestionPoint] = useState(undefined) 
    const [score, setScore] = useState(0)
     

        const setAnswerOptions = (value) => {
            setQuestionAnswerOptions([...value])   
        }

        const setAnswers = (value) => {
            setQuestionAnswer([...value])   
        }

    const QuestionValues = {
   score,questionAnswer,  questionPoint,selectedAnswer,questionName, questionLength, questionBody, questionAnswerOptions,serialNumber,questionNumber
    }

    const QuestionMethods = {
        setScore,setAnswers,  setQuestionPoint,setSelectedAnswer,setQuestionNumber,setQuestionName, setQuestionLength, setQuestionBody,setAnswerOptions,setSerialNumber
    }

    return <QuestionContext.Provider value={{QuestionValues, QuestionMethods}}>
    {children}
    </QuestionContext.Provider>
}

export default QuestionContext;
