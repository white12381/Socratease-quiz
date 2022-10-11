import {  Routes, Route } from "react-router-dom";
import QuestionPage from "./Pages/QuestionPages";
import {QuestionProvider} from "./Context/QuestionContext";
import { Navigate } from "react-router-dom"; 

const AppStudent = () => {
    const authorized = ((localStorage.getItem("name") && localStorage.getItem("email")) != null);
    return         <QuestionProvider>
    <Routes>
        <Route path="/question/:path/:name" element={authorized ? <QuestionPage/> :<Navigate to="/" />} />
    </Routes> 
    </QuestionProvider>
}

export default AppStudent;