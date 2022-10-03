import AutoProctorlogo from '../Images/AutoProctorlogo.png'
import GoogleLoginAuth from '../../Components/GoogleLoginAuth';
const Headers = () => {
  const {signout} = GoogleLoginAuth();

  const HandleSignOut =  async () => {
    await signout(); 
  }
    return <div className='fixed-top'> 
    <nav className="navbar navbar-expand-xl" id="Navbar">
  <div className="ms-2 container-fluid row" id="HeadingNav">
    <div className="col-8">
    <button className="navbar-toggler bg-light text-light ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasscrolling" aria-controls="offcanvasScrolling" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand ms-1" href="#">
      <img src={AutoProctorlogo} alt="Logo" id="logo" width="25%" height="auto" className="d-inline-block align-text-top"/>
    </a>
    </div>
    <div className="collapse navbar-collapse mt-5 col-4" id="navbarTogglerDemo01">
        <ul className="navbar-nav justify-content-evenly  fs-5  mb-5">
        <li className="nav-item">
          <a className="nav-link active text-white" aria-current="page" href="#"> Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="#">FAQs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled text-white">Help</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled text-white">Hi Teacher</a>
        </li>
        <li className="nav-item" onClick={HandleSignOut}>
          <a className="nav-link disabled text-white">Sign Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div className="offcanvas offcanvas-start" data-bs-scroll="true" aria-modal="true" role="dialog" data-bs-backdrop="false" tabIndex="-1" id="offcanvasscrolling" aria-labelledby="offcanvasScrollingLabel">
<div className="offcanvas-header" id="offcanvas-header">
<button type="button" className="btn-close" id="offcanvascancel" data-bs-dismiss="offcanvas" aria-label="Close"></button>
<img src={AutoProctorlogo} alt="Logo" id="offcanvaslogo" width="25%" height="auto" className="d-inline-block align-text-top"/>   
  </div>
   
  <div className="offcanvas-body">

   
          <a className="nav-link disabled text-dark fw-bolder ms-3 mt-4 mb-2 fs-3">Hi Teacher!</a>
         

  <ul className="navbar-nav justify-content-evenly ms-3 mt-3 fs-5  mb-5">
        <li className="nav-item">
          <a className="nav-link active text-secondary fw-bolder ms-3" aria-current="page" href="#"> Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-secondary fw-bolder ms-3" href="#">Archived Tests</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled text-secondary fw-bolder ms-3">More Features</a>
        </li>
        <hr/>
      </ul>

      
  <ul className="navbar-nav justify-content-evenly ms-3 mt-3 fs-5  mb-5">
        <li className="nav-item">
          <a className="nav-link active text-secondary fw-bolder ms-3" aria-current="page" href="#"> Usage</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-secondary fw-bolder ms-3" href="#">Purchased History</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled text-secondary fw-bolder ms-3">Account</a>
        </li>
        <hr/>
      </ul>


      <ul className="navbar-nav justify-content-evenly  ms-3 mt-3 fs-5  mb-5">
        <li className="nav-item">
          <a className="nav-link active text-secondary fw-bolder ms-3" aria-current="page" href="#"> How it Works</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-secondary fw-bolder ms-3" href="#">Purchasing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled text-secondary fw-bolder ms-3">FAQs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled text-secondary fw-bolder ms-3">Help</a>
        </li>
        <hr/>
      </ul>
        <ol onClick={HandleSignOut}>
      <a  className="nav-link disabled text-secondary fw-bolder ms-5 mt-3 fs-5  mb-5"> Logout</a>
    </ol>
    </div>

</div>
    </div>
    
}
export default Headers;