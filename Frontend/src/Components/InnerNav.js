import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCloudUpload, faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/css/all.min.css';

const InnerNav = () => (
    <div>
    <div className="d-none d-xl-block">     
<div id="InnerNav" className="container row ">
<div className=" col-6   text-start">
Socratease <div className="d-none d-lg-inline">Q... </div>
</div>
<div className="col-1">
<FontAwesomeIcon icon={faCog} />
</div>
<div className="col-2">
<FontAwesomeIcon icon={faCloudUpload} className="me-2 d-none d-xl-inline" />
<FontAwesomeIcon icon={faCloudUpload} className="d-inline d-xl-none" />
Save
</div>
<div className="col-3 ">
<a className="btn d-none d-xl-block btn-success">SAVE & PROCEED</a>
</div>
</div>
</div>

<div className="d-block d-xl-none">
<div className="container row">
<div className=" pe-5 col-3  text-start">
Socratease... <div className="d-none d-lg-inline">Q... </div>
</div>

<div className="  text-end ps-3 col-9  text-start"> 
<FontAwesomeIcon icon={faCog} className="me-2" /> 
<FontAwesomeIcon icon={faCloudUpload} className="me-2 d-none d-xl-inline" />
<FontAwesomeIcon icon={faCloudUpload} className="d-inline d-xl-none" />
Save
<a className="btn ms-2 fs-6 d-inline d-xl-none btn-success">PROCEED</a>

<a className="btn d-none d-xl-block btn-success">SAVE & PROCEED</a>
</div>
</div>
</div>

<hr className="bg-light mb-5" id="PageLine"/> 

</div>
)

export default InnerNav