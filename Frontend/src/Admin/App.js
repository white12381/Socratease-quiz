import Navbar from "./Components/navbar";
import SlideBar from "./Components/SideBar";
import AdminSocratease from "./Pages/AdminSocrateaseQuiz";
import { QuestionProvider } from "./Context/QuestionContext"; 
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import QuestionPage from "./Pages/QuestionPage";

function AppAdmin() {
  return (
    <QuestionProvider> 
              <Navbar/>
       <div className="container row">
<div className="col-xl-3 text-center row  align-items-center  position-fixed text-light" id="Slider" style={{"minHeight": "100vh"}}>
        <SlideBar/>
        </div>
        <div className="col-xl-9" id="pages">
           
          <Routes>
        <Route path="/addQuestions" element={<AdminSocratease/>} />  
        <Route path="/Question" element={<QuestionPage/>} />        
        </Routes> 
        </div>

       </div>
    </QuestionProvider>
  );
}

export default AppAdmin;
