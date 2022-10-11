import { useContext, useEffect } from 'react';
import { useTimer, useTime } from 'react-timer-hook';
import Question from '../../Admin/Hooks/QuestionHooks';
import QuestionContext from '../Context/QuestionContext';
import { useNavigate } from 'react-router';

function MyTimer({expiryTimestamp}){
  const Question = useContext(QuestionContext);
  const navigate = useNavigate()
  
const submitQuestion = async () => { 
  const response = await fetch(`http://127.0.0.1:4000/students/submitquestion`,{
  method: 'POST',
  body: JSON.stringify(Question.body),
  headers: {
      'Content-Type': 'application/json'
  }
})
const data = await response.json();
if(response.ok){ 
    navigate("/");
}
}

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () => submitQuestion() })
 
           
      const UpdateTime = async () => {
        const response = await fetch(`http://127.0.0.1:4000/students/time`,{
            method: 'PATCH',
            body: JSON.stringify(Question.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        }
       

 
      useEffect( () => {
        if((isRunning)){
          const s = seconds;
          const m = minutes * 60;
          const h = hours * (60 * 60);
          const t = s + m + h;
          Question.QuestionMethods.setQuestionTime(t);  
          UpdateTime()
       }
      })


    return <div style={{fontSize: '30px'}}>
       
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
} 
export default MyTimer;