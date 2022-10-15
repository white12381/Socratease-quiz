import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import AutoProctorlogo from '../Images/AutoProctorlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCreditCard,faSignOut, faQuestionCircle, faSignIn, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import GoogleLoginAuth from './GoogleLoginAuth';
import {useState, useEffect} from 'react'
function NavBar() {
  const {signIn, signout} = GoogleLoginAuth();
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  useEffect( () => {
setName(localStorage.getItem("name"));
setEmail(localStorage.getItem("email"));
if(!localStorage.getItem("name")){
  setName(undefined)
}
if(!localStorage.getItem("email")){
  setEmail(undefined)
} 

if(localStorage.getItem("Testurl") && localStorage.getItem("email") && localStorage.getItem("name")){
  localStorage.setItem("showTest",true);
}  
else{
  localStorage.removeItem("showTest");
}

  })

  const HandleSignIn = async () => {
    await signIn();
  }

  const HandleSignOut = async () => { 
    await signout();
  }

  return (
    <div>
    <Navbar  collapseOnSelect expand="md" className="d-none d-lg-block" id="offcanvas-header" variant="dark">
      <Container className="row">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand  className="col-4" id="homepagelogo">  
         <img src={AutoProctorlogo} alt="Logo" id="logo" width="30%" height="auto" className="d-inline-block align-text-md-bottom align-text-middle"/>
           </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="col-8 me-5 justify-content-center">
            <Nav.Link   className='text-light fs-4 me-4'>Pricing</Nav.Link>
            <Nav.Link   className='text-light me-4 fs-4'>FAQs</Nav.Link>
            <Nav.Link   className='text-light me-4 fs-4'>Help</Nav.Link>
           {(name && email) &&(<Nav.Link  className='text-light me-4 fs-4'> Hi {name.split(" ")[0]}</Nav.Link>) }
           {(name && email) &&(<Nav.Link  className='text-light me-4 fs-4' onClick={HandleSignOut} > Sign Out</Nav.Link>) }
          {!(name && email) && (
             <Nav.Link  onClick={HandleSignIn} className='text-light fs-4 me-4  rounded-pill border border-light border-2 text-outline-danger' id="signIn">SIGN IN ></Nav.Link> )} 
          </Nav> 
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <nav className="navbar navbar-expand-lg navbar-dark d-block d-lg-none" id="offcanvas-header">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#HomeOffcanvas" aria-controls="offcanvasExample"  aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> 
    <img src={AutoProctorlogo} alt="Logo" id="logoHome" width="30%" height="auto" className="pt-5"/>
  </div>
</nav>

<div className="offcanvas offcanvas-start" tabIndex="-1"  id="HomeOffcanvas" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-body" id="HomeOffcanvasBody">
<h1 className='mt-5 ms-3 text-primary  bolder'>
<FontAwesomeIcon icon={faBookOpen} />   How it Works</h1>
<h1 className='mt-5 text-primary  bolder'>
<FontAwesomeIcon icon={faCreditCard} /> Pricing</h1>
<h1 className='mt-5 text-primary  bolder'>
<FontAwesomeIcon icon={faQuestionCircle} />  FAQs</h1>
<h1 className='mt-5 text-primary  bolder'>
<FontAwesomeIcon icon={faHandsHelping}/> Support</h1>
{!(name && email) && (
<a> <h1 className='mt-5 text-primary  bolder' onClick={HandleSignIn}>
<FontAwesomeIcon icon={faSignIn}/> Login </h1></a>
)}
{(name && email) && (
<a> <h1 className='mt-5 text-primary  bolder' onClick={HandleSignOut}>
<FontAwesomeIcon icon={faSignOut}  /> Logout </h1></a>
)}
  </div>
  </div>

</div>
  );
}

export default NavBar;