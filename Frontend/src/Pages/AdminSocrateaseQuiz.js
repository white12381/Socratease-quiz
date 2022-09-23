import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCloudUpload, faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/css/all.min.css';
 import QuestionForm from "../Components/QuestionForm";
 import InnerNav from "../Components/InnerNav";
import Question from "../Hooks/QuestionHooks";
import QuestionAdd from "../Components/QuestonAdded";
import QuestionContext from "../Context/QuestionContext";
    
 const AdminSocratease = () => {
    const {AddBtn, SaveBtn} = Question();
    const Questions = useContext(QuestionContext);
    
    return<div> 
      <InnerNav/>
      <QuestionAdd   questions={Questions.addQuestion}/>
<QuestionForm />
<div className="row justify-content-center mt-3">
<div className="col-lg-4 col-6  text-end">
<button className="btn text-reset  fs-6" id="AddQuestion" onClick={AddBtn}>
<FontAwesomeIcon icon={faFileCirclePlus} className="me-2" /> Add Question
    </button>
</div>
<div className="col-lg-4 col-6 text-start">
<button className="btn fs-6" id="saveQuestion" onClick={SaveBtn}> 
<FontAwesomeIcon icon={faCloudUpload} className="me-2" />
Save Question</button>
</div>
</div>
    </div>

 }

 export default AdminSocratease;