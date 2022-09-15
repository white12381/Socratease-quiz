import { useState } from "react";
import { faGripHorizontal,faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionBody from "./QuestionBody";
import QuestionOption from "./Questionoptions";
const QuestionForm = () => {
const [point,setPoint] = useState(0); 
    return<div id="QuestionForm" className="border border-2">
   <form>
<div className="row">
<div className="col-lg-2 col-5 ">
<FontAwesomeIcon icon={faGripHorizontal} className="me-1"/>
 Question1
</div>
<div className="col-lg-3  col-7 row">
<div className="col-lg-10 col-10 ps-4 ps-lg-5">
<select>
    <option>MCA</option>
    <option>Short Test</option>
</select>
</div>
<div className="col-lg-1 col-2">
<FontAwesomeIcon icon={faQuestionCircle}/>
</div>
</div>
<div className="col-lg-7 col-9 text-start my-2 text-lg-end">
<label htmlFor="points" className="me-1">Points</label>
<input type="number"  value={point} min={1} id="points" onChange={(e) => setPoint(e.target.value)}  className="border"/>
</div>
</div>
    </form>
    <div className="mt-3"> 
    <QuestionBody  placeinside= {"Question Text"} />
    </div>
    <QuestionOption/>
        </div>
}

export default QuestionForm;