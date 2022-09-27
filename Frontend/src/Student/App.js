import {  Routes, Route } from "react-router-dom";
import QuestionPage from "./Pages/QuestionPages";
import {QuestionProvider} from "./Context/QuestionContext";
const AppStudent = () => {
    return         <QuestionProvider>
    <Routes>
        <Route path="/question" element={<QuestionPage/>} />
    </Routes> 
    </QuestionProvider>
}

export default AppStudent;