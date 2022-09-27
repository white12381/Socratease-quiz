import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faBook,faNoteSticky, faCircleArrowDown, faBagShopping, faBell,faUser, faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SlideBar = () => {
    return <>

<div className="col-12 row" >
   <div className="col-6  text-end" id="sliderLinks"> <FontAwesomeIcon icon={faHome} className="me-3" />  </div>
    <div className="col-6 text-start pe-5"> Home</div> 
</div>
<div className="col-12 row" id="NavRow1"> 
    <div className="col-6  text-end" id="sliderLinks"><FontAwesomeIcon icon={faBook} className="me-3" /> </div> 
    <div className="col-6 text-start pe-4"> Recent tests</div> 
</div>
<div className="col-12 row" id="NavRow2"> 
    <div className="col-3 text-end" id="sliderLinks">    <FontAwesomeIcon icon={faCircleArrowDown} className="me-3" /> </div>
    <div className="col-6 text-start pe-3">Archived Tests</div>
</div>
<div className="col-12 row" id="NavRow3">
    <div className="col-6  text-end" id="sliderLinks"> <FontAwesomeIcon icon={faBookBookmark} className="me-3" />  </div>
   <div className="col-6 text-start pe-3"> More Features</div>
</div>
<div className="col-12 row" id="NavRow4"> 
    <div className="col-6  text-end" id="sliderLinks"><FontAwesomeIcon icon={faNoteSticky} className="me-4" /> </div>
    <div className="col-6 text-start pe-5"> Usage</div>
</div>
<div className="col-12 row" id="NavRow5">
    <div className="col-6  text-end" id="sliderLinks"> <FontAwesomeIcon icon={faBagShopping} className="me-3" /> </div>
    <div className="col-6 text-start pe-2"> Purchase History</div>
</div>
<div className="col-12 row" id="NavRow6">
    <div className="col-6  text-end" id="sliderLinks"><FontAwesomeIcon icon={faUser} className="me-3" /> </div>
    <div className="col-6 text-start pe-5"> Account</div>
</div>
<div className="col-12 row" id="NavRow7">
    <div className="col-6  text-end" id="sliderLinks"><FontAwesomeIcon icon={faBell} className="me-3" /> </div>
   <div className="col-6 text-start pe-3"> What is New</div>
</div>

    </>
}

export default SlideBar;