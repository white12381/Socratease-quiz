import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AppAdmin from './Admin/App'
import AppStudent from './Student/App';
import HomePage from './pages/homePage';
import { QuestionProvider } from './Student/Context/QuestionContext';

const App = () => {
       return <> 
    <QuestionProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/Admin/*' element={  <AppAdmin/>} />
    <Route path='/student/*'  element={ <AppStudent/>} />
    </Routes>
    </BrowserRouter>
    </QuestionProvider>
    </>
}

export default App;