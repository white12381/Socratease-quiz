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
  useEffect( () => {
    if((value).trim().length > 0 ){
      setQuestionName.setQuestionName(value);
      console.log(questionName)
    }
  },[value])
     const {SaveBtn} = Question();
    const QuestionName = (e) => {
        setValue(e.target.value);
        setQuestionName.setQuestionName(e.target.value)
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
 
