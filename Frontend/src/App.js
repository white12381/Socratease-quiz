import Navbar from "./Components/navbar";
import SlideBar from "./Components/SideBar";
import AdminSocratease from "./Pages/AdminSocrateaseQuiz";
function App() {
  return (
    <div>
              <Navbar/>
       <div className="container row">
<div className="col-xl-3 text-center row  align-items-center  position-fixed text-light" id="Slider" style={{"minHeight": "100vh"}}>
        <SlideBar/>
        </div>
        <div className="col-xl-9" id="pages">
        <AdminSocratease/>
        </div>

       </div>
    </div>
  );
}

export default App;
