import {  Routes, Route } from "react-router-dom";
import QuestionPage from "./Pages/QuestionPages";
import {QuestionProvider} from "./Context/QuestionContext";
import { Navigate } from "react-router-dom"; 

const AppStudent = () => {
    return         <QuestionProvider>
    <Routes>
        <Route path="/question/:path/:name" element={ <QuestionPage/>} />
    </Routes> 
    </QuestionProvider>
}

export default AppStudent;