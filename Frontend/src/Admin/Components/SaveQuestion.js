import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import QuestionContext from '../Context/QuestionContext';
import Question from '../Hooks/QuestionHooks';


function MyVerticallyCenteredModal(props) {
  const setQuestionName = useContext(QuestionContext).QuestionMethods
  const questionName = useContext(QuestionContext).QuestionValues.QuestionName;
  const [value,setValue] = useState('');
  const [checked, setChecked] = useState(false);
  useEffect( () => {
    if((value).trim().length > 0 ){
      setQuestionName.setQuestionName(value); 
    }
  },[value])
     const {SaveBtn} = Question();
    const QuestionName = (e) => {
        setValue(e.target.value);
        setQuestionName.setQuestionName(e.target.value)
    } 

    const setTime = () => {
      const seconds = document.getElementById("seconds").value;
      const minutes = (document.getElementById("minutes").value) * 60;
      const hours = (document.getElementById("hours").value) * (60 * 60);
      localStorage.setItem("timer",  Number((hours + minutes + seconds)));
    }

    const handleTimer = (e) => {
      if(e.target.checked){
         setChecked(true)
      }
      else{
        localStorage.removeItem("timer");
        setChecked(false)
      }
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Question 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Test Name</h4>
        <input type="text" value={value} onChange={QuestionName} className="form-control mt-3"  placeholder="Enter Test Name" />
        <div className="form-check form-switch mt-3">
  <input className="form-check-input" type="checkbox" onChange={handleTimer} role="switch" id="Timer" />
  <label className="form-check-label" htmlFor="Timer">Enable Timer</label>
</div>
{
  checked && (
    <div className="input-group" onChange={setTime}>
<input type="number" aria-label="First name" id="hours" min={0} step={1} placeholder='Enter Hours' className="form-control" />
  <input type="number" aria-label="Last name" id="minutes" min={0} step={1}   placeholder='Enter Minutes' className="form-control" />
  <input type="number" aria-label="Last name" id="seconds" min={0} step={1} placeholder='Enter Seconds' className="form-control" />
      </div>

  )
}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" disabled = {(questionName) ? false : true} onClick={() =>  {SaveBtn(); props.onHide()}}>Save Question</Button>
      </Modal.Footer>
    </Modal>
  );
}

function SaveQuestion() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <> 
      <button  className="btn fs-6" id="saveQuestion" onClick={() => setModalShow(true)}> 
<FontAwesomeIcon icon={faCloudUpload} className="me-2" />
Save Question</button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default SaveQuestion;
 
