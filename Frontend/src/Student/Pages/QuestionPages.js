import { useEffect,useContext, useState } from 'react'
import AutoProctorlogo from '../Images/AutoProctorlogo.png'
import QuestionContext from '../Context/QuestionContext'
import { useParams } from 'react-router' 
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom' 

const QuestionPage = () => {
    var value;
    const [selectedvalue, setSelectedValue] = useState(undefined);
    const [error, setError] = useState(undefined);
const navigate = useNavigate();
const Question = useContext(QuestionContext);
var isQuestionAnswer = [];
const {name,path} = useParams();

 
const setAnswerInputvalue = (val) => {
   return  val.replace(/<(.|\n)*?>/g,'').trim();
}
 

const submitQuestion = async () => {
    postQuestion();
    const response = await fetch(`http://127.0.0.1:4000/students/submitquestion`,{
    method: 'POST',
    body: JSON.stringify(Question.body),
    headers: {
        'Content-Type': 'application/json'
    }
});
const data = await response.json();
if(response.ok){ 
    navigate("/");
}
 
}


 const fetchQuestion = async () => { 
    const response = await fetch(`http://127.0.0.1:4000/api/question/${path}/name/${name}?index=${Question.serialNumber}`);
   const data = await response.json();
    if(!response.ok){
        Question.QuestionMethods.setQuestionBody(undefined);
       
   }
   else{
    Question.QuestionMethods.setQuestionLength(data.QuestionLength);
    Question.QuestionMethods.setTotalPoint(data.TotalPoint);
   Question.QuestionMethods.setQuestionName(data.Questions[0].QuestionName);
   Question.QuestionMethods.setQuestionType(data.Questions[0].QuestionType);
   Question.QuestionMethods.setQuestionBody(data.Questions[0].QuestionBody);
   Question.QuestionMethods.setAnswerOptions(data.Questions[0].QuestionAnswerOptions);
   Question.QuestionMethods.setAnswers(data.Questions[0].QuestionAnswers);
   Question.QuestionMethods.setQuestionPoint(data.Questions[0].QuestionPoint)
   Question.QuestionMethods.setSerialNumber(Question.serialNumber++);
   Question.QuestionMethods.setQuestionPath(path);
   }
    }
 

 const fetchAnswerQuestion = async () => { 
    const response = await fetch(`http://127.0.0.1:4000/students/${path}/name/${name}?index=${Question.serialNumber}`);
   const data = await response.json();
    if(!response.ok){
       if((data.error === "You no longer have access to this Test")){
                setError("You no longer have access to this Test")
       } 
       else{
        fetchQuestion();
       }
   }
   else{
    Question.QuestionMethods.setQuestionLength(data.QuestionLength);
    Question.QuestionMethods.setTotalPoint(data.Questions[0].Student.TotalPoint);
   Question.QuestionMethods.setQuestionName(data.Questions[0].Question.QuestionName);
   Question.QuestionMethods.setQuestionType(data.Questions[0].Question.QuestionType);
   Question.QuestionMethods.setQuestionBody(data.Questions[0].Question.QuestionBody);
   Question.QuestionMethods.setAnswerOptions(data.Questions[0].Question.QuestionAnswerOptions);
   Question.QuestionMethods.setAnswers(data.Questions[0].Question.QuestionAnswers);
   Question.QuestionMethods.setQuestionPoint(data.Questions[0].Question.QuestionPoint)
   Question.QuestionMethods.setSerialNumber(Question.serialNumber++);
   Question.QuestionMethods.setQuestionPath(path);
   Question.QuestionMethods.setSelectedAnswer(data.Questions[0].QuestionSelectedAnswer); 
   if(data.Questions[0].QuestionSelectedAnswer.length > 0){
    setSelectedValue(setAnswerInputvalue(data.Questions[0].QuestionSelectedAnswer[0]));
   }
   }
    }



const postQuestion = async () => {
const response = await fetch(`http://127.0.0.1:4000/students/addstudentquestion`,{
    method: 'POST',
    body: JSON.stringify(Question.body),
    headers: {
        'Content-Type': 'application/json'
    }
});
const data = await response.json();
}

 

useEffect(  () => {
    fetchAnswerQuestion();

},[])

const HandleNext = () => {
    
     if(Question.serialNumber < (Question.questionLength - 1)){
        Question.QuestionMethods.setSerialNumber(Question.serialNumber++);
        Question.QuestionMethods.setQuestionNumber(++Question.questionNumber);
        postQuestion();
        fetchAnswerQuestion();
     } 
}

const HandlePrevious = () => {
     

    if(Question.serialNumber > 0){
        Question.QuestionMethods.setQuestionNumber(--Question.questionNumber);
    Question.QuestionMethods.setSerialNumber(Question.serialNumber--);
            postQuestion();
            fetchAnswerQuestion();
        }
}

 

const HandleSelectAnswer = (e) => {
    value =  e.target.value;
    if(value !== undefined){
    const answer = [value];
    Question.QuestionMethods.setSelectedAnswer(answer);  
    console.log("answer is " + Question.QuestionSelectedAnswer);
    }
}

useEffect( () => {
   var value =  `<p>${selectedvalue}</p>`;
   if(selectedvalue !== undefined){
     const answer = [value];
    Question.QuestionMethods.setSelectedAnswer(answer);  
    console.log("answer is " + Question.QuestionSelectedAnswer);
   }
},[selectedvalue]);

const HandleInputSelectAnswer = (e) => {
    setSelectedValue(e.target.value)
}
 
    return <>
    { !(error) ? 
    <div  id="QuestionPage" className='p-2'>
    <div  className="border border-5 p-3" id="offcanvas-header">
<img src={AutoProctorlogo} alt="Logo"  width="25%" height="auto" className="d-inline-block"/>
 </div> 
 <div className='border border-5  bg-light p-3 mx-3 my-2 ps-5'>
    <h5>Question Name: {Question.Question.QuestionName}</h5>
    <h5>Serial Number: {Question.questionNumber} of {Question.questionLength}</h5>
    </div>
    <div className='border border-5  bg-light p-3 mx-3 ps-5'>
        <h3 dangerouslySetInnerHTML={{__html: Question.Question.QuestionBody}} />
        {             (Question.Question.QuestionAnswerOptions.length > 0) ? 
         (Question.Question.QuestionAnswerOptions.map( (opt,index) => (
            <div key={index}>
            <input checked={Question.QuestionSelectedAnswer[0] === opt } type="radio" id={opt} name="options" value={opt} className='me-2 mt-3' onChange={HandleSelectAnswer} />
                <label dangerouslySetInnerHTML={{__html: opt}} /> <br/>
                </div>
        ))) : ( 
                <input type="text" id="inputAnswer" className='form-control-lg' value={selectedvalue} onChange={HandleInputSelectAnswer} />
        )
          
        }
 

        </div>  
        <div className='text-center mt-4'>
            <button className='btn btn-outline-dark me-2 border' onClick={HandlePrevious}>Previous</button>
    { !(Question.questionNumber === Question.questionLength) ?   <button className='btn btn-outline-dark me-2 border' onClick={HandleNext}>Next</button>
           : <button onClick={submitQuestion} className='btn btn-outline-dark me-2 border'>Submit</button>
    }
                </div>

    </div> :
    <div  id="QuestionPage" className='p-2'>
    <div  className="border border-5 p-3" id="offcanvas-header">
<img src={AutoProctorlogo} alt="Logo"  width="25%" height="auto" className="d-inline-block"/>
 </div>
  <p className='text-center fw-bolder fs-3 mt-5'>{error}</p> 
  <Link className='btn btn-dark' id="BacktoHome" to='/' >Back to HomePage</Link>
 </div> 
}
    </>
}
export default QuestionPage