 import NavBar from "../Components/Navbar"; 
 import students1 from  "../Images/students1.svg"
 import students2 from  "../Images/students2.svg"
 import AutoProctorlogo from  "../Images/AutoProctorlogo.png"
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
function HomePage() {
  return (<div>
  <NavBar/>
  <div className="text-center" id="homePage" style={{minHeight: '100vh'}}>
  <h1 className="fw-bolder text-center fs-1">
    Fully Automated Exam Proctoring
  </h1>
  <h5 className="fw-light text-center mt-5"> No more Cheating on Online Tests</h5>
<button id="taketest" className="btn btn-light me-5 rounded-pill btn-outline-success fw-bolder btn-lg">Take Demo Test > </button>
<button id="taketest" className="btn btn-light me-5 rounded-pill btn-outline-success fw-bolder  btn-lg"> Create Test > </button>
<div className="row justify-content-evenly mt-5">
  <div className="col-12 col-md-4 text-md-start">
<img src={students2}/>
</div>
<div className="col-12 col-md-4 text-md-start me-5 mt-5 border border-light border-5" style={{ backgroundColor: "#04243c"}}>
<div id="innerHeading"  className="text-light fw-bolder fs-3 text-center ps-5">
  Create A proctored Test within Minutes
</div>
<img src={AutoProctorlogo} width="50%" height="auto" className="mt-3" id="innerLogo"/>
<ul className="text-light text-start  mt-3">
  <ol> <FontAwesomeIcon icon={faCircleCheck} style={{ color : "#5dbd84"}} className="me-2" /> Login in with your Email</ol>
  <ol> <FontAwesomeIcon icon={faCircleCheck} style={{ color : "#5dbd84"}} className="me-2" /> Click on Create Test</ol>
  <ol> <FontAwesomeIcon icon={faCircleCheck} style={{ color : "#5dbd84"}} className="me-2" /> Click on Save Test to Submit </ol>
  <ol> <FontAwesomeIcon icon={faCircleCheck} style={{ color : "#5dbd84"}} className="me-2" /> Enter Test Name</ol>
  <ol> <FontAwesomeIcon icon={faCircleCheck} style={{ color : "#5dbd84"}} className="me-2" /> Share Link Test to Student to take the Test</ol>
</ul>
  </div>
<div className="col-12 col-md-3  mt-5">
<img src={students1} className="col-12 col-md-4" style={{width: '50%', height: 'auto'}} />
</div>
</div>
  </div>
  </div>
 
  )
}

export default HomePage;