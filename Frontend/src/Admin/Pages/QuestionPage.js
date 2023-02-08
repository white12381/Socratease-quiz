import { useContext, useEffect, useLayoutEffect, useState } from "react"
import QuestionContext from "../Context/QuestionContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'
const QuestionPage = () => {
  const {path} = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
const [reports, setReports] = useState({});
const Question = useContext(QuestionContext);
const QuestionUrl = Question.url;

useLayoutEffect( () => {
  const paths = localStorage.getItem("email").split("@")[0];
  if(paths !== path){
    navigate('/');
  }
})
  useEffect( () => {
    const fetchReport = async () => {
      setLoader(true);
      const response = await fetch(`${QuestionUrl}/students/report/${path}`);
      const data = await response.json();
      if(!response.ok){
        console.log(data.error);
      }
      else{
          setReports(data); 
          setLoader(false);
      }
      
    }
    fetchReport();
  },[])
    return <> 
    <h1>Student Report</h1>  
    {
   loader ?  <div>
<div className="m-5" Style="width: 80%; height: 20rem;" >
 <div className="spinner-border text-dark my-5" role="status" id="ResultStatus">
  <span className="visually-hidden">Loading...</span>
</div> 
</div>
</div>: <div>
{ reports.QuestionName && reports.QuestionName.map( (questionname,index) => (
    <div key={index}>
        <h3 className="mt-5" >{questionname}</h3>
<div>
<div  className='row'>
{ reports.Questions && reports.Questions.map( (report) => (
    
    (report.Student.QuestionName === questionname) ? (
      
    <div className="col-6 col-md-3 col-lg-3 g-3"> 
    
    <div className="card" id="studentsreport"> 
    <div  id="groupReport">
      <h5 className="mt-5 fw-bolder text-light" id="studentName">{report.Student.FullName}</h5>
      <small id="studentEmail">{report.Student.Email}</small>
    </div>
  <div className="card-body">
    <div className="row">
    <div className="col-6"> 
    <h6 className="card-text fw-bolder">{report.Student.QuestionName}</h6>
    </div>
    <div className="col-6"> 
    <h6 className="card-text fw-bolder">{report.Mark.Percentage}%</h6>
    </div>
    </div>
  </div>
</div> 
</div>
) : null

))}
</div>
</div>
    </div>
  ))
    
}
</div>
}
    </>
}

export default QuestionPage