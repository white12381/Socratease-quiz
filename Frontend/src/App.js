import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AppAdmin from './Admin/App'
import AppStudent from './Student/App';
import HomePage from './pages/homePage';

const App = () => {
    return <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/Admin/*' element={<AppAdmin/>} />
    <Route path='/student/*' element={<AppStudent/>} />
    </Routes>
    </BrowserRouter>
    </>
}

export default App;