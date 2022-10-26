import Navbar from "./Components/navbar";
import SlideBar from "./Components/SideBar";
import AdminSocratease from "./Pages/AdminSocrateaseQuiz";
import { QuestionProvider } from "./Context/QuestionContext"; 
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import QuestionPage from "./Pages/QuestionPage";
import { Navigate } from 'react-router-dom'; 
function AppAdmin() {
  const authorized = ((localStorage.getItem("name") && localStorage.getItem("email")) != null);
  return (
    <QuestionProvider> 
              <Navbar/>
       <div className="container row">
<div className="col-xl-3 text-center row  align-items-center  position-fixed text-light" id="Slider" style={{"minHeight": "100vh"}}>
        <SlideBar/>
        </div>
        <div className="col-xl-9" id="pages">
           
          <Routes>
        <Route path="/addQuestions" element={authorized ? <AdminSocratease/> :<Navigate to="/" />} />  
        <Route path="/Report/:path" element={authorized ? <QuestionPage/> :<Navigate to="/" />} />        
        </Routes> 
        </div>

       </div>
    </QuestionProvider>
  );
}

export default AppAdmin;
