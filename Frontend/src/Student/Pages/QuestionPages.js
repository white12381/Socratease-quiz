import { useEffect,useContext, useState, useLayoutEffect } from 'react'
import AutoProctorlogo from '../Images/AutoProctorlogo.png'
import QuestionContext from '../Context/QuestionContext'
import { useParams } from 'react-router' 
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom' 
import MyTimer from '../Hooks/Timerhooks' 
import { useLocation } from 'react-router' 
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const QuestionPage = (props) => {
     var value;  
    const location = useLocation();
    const [selectedvalue, setSelectedValue] = useState('');
    const [loader, setLoader] = useState(true);
    const [loaderText, setLoaderText] = useState('');
const navigate = useNavigate();
const Question = useContext(QuestionContext); 
const {name,path} = useParams();

const authorized = ((localStorage.getItem("name") && localStorage.getItem("email")) != null);

useLayoutEffect( () => {
    const toastId = 3;
    if(!authorized){ 
        localStorage.setItem("Testurl",location.pathname)
        navigate("/");
        toast.success("Please Sign In to Continue",{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            toastId: toastId,
            hideProgressBar: true
        });
     }
})

 
const setAnswerInputvalue = (val) => {
   return  val.replace(/<(.|\n)*?>/g,'').trim();
}
 

const submitQuestion = async () => { 
    setLoaderText("Submitting Answers");
    setLoader(true);
    await postQuestion();
    const response = await fetch(`${Question.url}/students/submitquestion`,{
    method: 'POST',
    body: JSON.stringify(Question.body),
    headers: {
        'Content-Type': 'application/json'
    }
});
const data = await response.json();
if(response.ok){ 
    Question.QuestionMethods.setError(`You are successfully done with ${Question.Question.QuestionName} Test. We will get back to you on ${Question.Student.Email}`);
    localStorage.removeItem("showTest");
    localStorage.removeItem("Testurl"); 
    Question.QuestionMethods.setShowTest(false);
    setLoader(false);
}
 
}


 const fetchQuestion = async () => { 
    setLoaderText("Loading Question");
    setLoader(true);

    const response = await fetch(`${Question.url}/api/question/${path}/name/${name}?index=${Question.serialNumber}`);
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
   Question.QuestionMethods.setQuestionTime(data.Questions[0].QuestionTime)
   Question.QuestionMethods.setSerialNumber(Question.serialNumber++);
   Question.QuestionMethods.setQuestionPath(path); 
   setLoader(false);
   }
    }
 

 const fetchAnswerQuestion = async () => { 
    setLoaderText("Loading Question");
    setLoader(true);
    const paths = Question.Student.Email;
    const response = await fetch(`${Question.url}/students/${path}/name/${name}/${paths}?index=${Question.serialNumber}`);
   const data = await response.json();
    if(!response.ok){
       if((data.error === "You no longer have access to this Test")){
        Question.QuestionMethods.setError("You no longer have access to this Test");
        console.log("you no longer have access to this test");
        setLoader(false);
       } 
       else{
        fetchQuestion(); 
        Question.QuestionMethods.setError(undefined)
       }
   }
   else{
    Question.QuestionMethods.setQuestionLength(data.Questions[0].Student.questionLength);
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
   Question.QuestionMethods.setQuestionTime(data.Questions[0].QuestionTime);
   setLoader(false);
   if(data.Questions[0].QuestionSelectedAnswer.length > 0){
    setSelectedValue(setAnswerInputvalue(data.Questions[0].QuestionSelectedAnswer[0]));
   }
   }

    }



const postQuestion = async () => { 
const response = await fetch(`${Question.url}/students/addstudentquestion`,{
    method: 'POST',
    body: JSON.stringify(Question.body),
    headers: {
        'Content-Type': 'application/json'
    }
});
const data = await response.json(); 
}

 
const time = new Date();  


useEffect( () => {
    setLoader(true);
    setLoaderText("Loading Question");
    const paths = Question.Student.Email;
    const fetchLastAnswerQuestion = async () => { 
        const response = await fetch(`${Question.url}/students/last/${paths}/name/${name}/${path}`);
       const data = await response.json();
        if(!response.ok){
           if((data.error === "You no longer have access to this Test")){
            Question.QuestionMethods.setError("You no longer have access to this Test");
            setLoader(false);
           } 
           else{
            Question.QuestionMethods.setError(undefined)
            console.log("back to index 1");
            console.log("error" + data.error);
            fetchAnswerQuestion();
           }
       }
       else{
        Question.QuestionMethods.setQuestionLength(data.Questions[0].Student.questionLength);
        Question.QuestionMethods.setTotalPoint(data.Questions[0].Student.TotalPoint);
       Question.QuestionMethods.setQuestionName(data.Questions[0].Question.QuestionName);
       Question.QuestionMethods.setQuestionType(data.Questions[0].Question.QuestionType);
       Question.QuestionMethods.setQuestionBody(data.Questions[0].Question.QuestionBody);
       Question.QuestionMethods.setAnswerOptions(data.Questions[0].Question.QuestionAnswerOptions);
       Question.QuestionMethods.setAnswers(data.Questions[0].Question.QuestionAnswers);
       Question.QuestionMethods.setQuestionPoint(data.Questions[0].Question.QuestionPoint)
       Question.QuestionMethods.setSerialNumber(data.QuestionLength - 1);
       Question.QuestionMethods.setQuestionPath(path);
       Question.QuestionMethods.setQuestionNumber(data.QuestionLength)
       Question.QuestionMethods.setSelectedAnswer(data.Questions[0].QuestionSelectedAnswer); 
       Question.QuestionMethods.setQuestionTime(data.Questions[0].QuestionTime);
       setLoader(true);
       if(data.Questions[0].QuestionSelectedAnswer.length > 0){
        setSelectedValue(setAnswerInputvalue(data.Questions[0].QuestionSelectedAnswer[0]));
       }
       }
        }
        fetchLastAnswerQuestion(); 
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
   }
},[selectedvalue]);

const HandleInputSelectAnswer = (e) => {
    setSelectedValue(e.target.value)
}
 
    return <> 
    

    <div style={{display: "none"}}>
    {  time.setSeconds(  time.getSeconds() + Question.body.QuestionTime) }
    </div>

    { !(Question.error) ? 
    <div  id="QuestionPage" className='p-2'>
    <div  className="border border-5 p-3" id="offcanvas-header">
<img src={AutoProctorlogo} alt="Logo"  width="25%" height="auto" className="d-inline-block"/>
 </div> 

 <div>
    {
           loader ? 
           <div className="d-flex align-items-center align-self-center m-5 display-1">
           <strong>{loaderText}...</strong>
           <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
         </div> : <div>
 <div className="row border border-5  bg-light p-3 mx-3 my-2 ps-5">
 <div className='col-12 col-md-6'>
    <h5>Question Name: {Question.Question.QuestionName}</h5>
    <h5>Serial Number: {Question.questionNumber} of {Question.questionLength}</h5>
    </div>
    <div className="col-12 col-md-6 text-center text-lg-start">
        {
            (Question.body.QuestionTime > 0) ?
    <MyTimer expiryTimestamp={time} />  : null
}
     </div>
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
                </div>
}
                </div>

    </div> :
    <div  id="QuestionPage" className='p-2'>
    <div  className="border border-5 p-3" id="offcanvas-header">
<img src={AutoProctorlogo} alt="Logo"  width="25%" height="auto" className="d-inline-block"/>
 </div>
  <p className='text-center fw-bolder fs-3 mt-5'>{Question.error}</p> 
  <Link className='btn btn-dark' id="BacktoHome" to='/' >Back to HomePage</Link>
 </div> 

}
    </>

}
export default QuestionPage