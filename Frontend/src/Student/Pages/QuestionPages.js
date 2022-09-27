import { useEffect,useContext } from 'react'
import AutoProctorlogo from '../Images/AutoProctorlogo.png'
import QuestionContext from '../Context/QuestionContext'

const QuestionPage = () => {
const Question = useContext(QuestionContext);
var isQuestionAnswer = [];

const compareQuestion = (question, arrayQuestion) => {
    let isequal = false
    for(let i = 0; i < arrayQuestion.length; i++){
        if(arrayQuestion[i] == question){
            isequal = true
        }
    }
    return isequal;
 }

const fetchQuestion = async () => {
    const response = await fetch(`http://127.0.0.1:4000/api/question/name/${"English"}?index=${Question.QuestionValues.serialNumber}`);
   const data = await response.json();
    if(!response.ok){
       console.log(data.error)
   }
   else{
    Question.QuestionMethods.setQuestionLength(data.QuestionLength);
   Question.QuestionMethods.setQuestionName(data.Questions[0].QuestionName);
   Question.QuestionMethods.setQuestionBody(data.Questions[0].QuestionBody);
   Question.QuestionMethods.setAnswerOptions(data.Questions[0].QuestionAnswerOptions);
   Question.QuestionMethods.setAnswers(data.Questions[0].QuestionAnswers);
   Question.QuestionMethods.setQuestionPoint(data.Questions[0].QuestionPoint)
   Question.QuestionMethods.setSerialNumber(Question.QuestionValues.serialNumber++);
   
   }
    }

 

useEffect(  () => {
 fetchQuestion(); 
},[])

const HandleNext = () => {
    
     if(Question.QuestionValues.serialNumber < (Question.QuestionValues.questionLength - 1)){
        Question.QuestionMethods.setSerialNumber(Question.QuestionValues.serialNumber++);
        Question.QuestionMethods.setQuestionNumber(++Question.QuestionValues.questionNumber);
    fetchQuestion();
     }
 else{
    if(Question.QuestionValues.selectedAnswer == Question.QuestionValues.questionAnswer){
        Question.QuestionMethods.setScore(Question.QuestionValues.score + Question.QuestionValues.questionPoint)
    }
}
}

const HandlePrevious = () => {
     

    if(Question.QuestionValues.serialNumber > 0){
        Question.QuestionMethods.setQuestionNumber(--Question.QuestionValues.questionNumber);
    Question.QuestionMethods.setSerialNumber(Question.QuestionValues.serialNumber--);
        fetchQuestion();
        
        }
}

const HandleSelectAnswer = (e) => {
    Question.QuestionMethods.setSelectedAnswer(e.target.value);  
        if(Question.QuestionValues.selectedAnswer == Question.QuestionValues.questionAnswer){
            Question.QuestionMethods.setScore(Question.QuestionValues.score + Question.QuestionValues.questionPoint)
        }
        else{
            Question.QuestionMethods.setScore(Question.QuestionValues.score - Question.QuestionValues.questionPoint)
        }
}

    return <div  id="QuestionPage" className='p-2'>
    <div className="border border-5 p-3" id="offcanvas-header">
<img src={AutoProctorlogo} alt="Logo"  width="25%" height="auto" className="d-inline-block"/>
 </div> 
 <div className='border border-5  bg-light p-3 mx-3 my-2 ps-5'>
    <h5>Question Name: {Question.QuestionValues.questionName}</h5>
    <h5>Serial Number: {Question.QuestionValues.questionNumber} of {Question.QuestionValues.questionLength}</h5>
    </div>
    <div className='border border-5  bg-light p-3 mx-3 ps-5'>
        <h3 dangerouslySetInnerHTML={{__html: Question.QuestionValues.questionBody}} />
        { Question.QuestionValues.questionAnswerOptions && Question.QuestionValues.questionAnswerOptions.map( (opt,index) => (
            <div key={index}>
            <input type="radio" id="options" name={Question.QuestionValues.questionBody} value={opt} className='me-2 mt-3' onChange={HandleSelectAnswer} />
                <label dangerouslySetInnerHTML={{__html: opt}} /> <br/>
                </div>
        )) 
        }
        </div>  
        <div className='text-center mt-4'>
            <button className='btn btn-outline-dark me-2 border' onClick={HandlePrevious}>Previous</button>
            <button className='btn btn-outline-dark me-2 border' onClick={HandleNext}>Next</button>
        </div>

    </div>
}
export default QuestionPage