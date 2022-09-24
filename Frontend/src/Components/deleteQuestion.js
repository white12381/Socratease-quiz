import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleStop, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import QuestionContext from '../Context/QuestionContext';

function MyVerticallyCenteredModal(props, {index}) {
  const Questions = useContext(QuestionContext); 
  const removeQuestion = (index) => {
    const temp = [...Questions.addQuestion];
    temp.splice(index,1);
    Questions.setAddQuestion([...temp]); 
 
      
}
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
 
      <Modal.Body className="text-center">
      <FontAwesomeIcon icon={faCircleStop} className="text-danger me-2" />
      Are you sure you want to  permanently delete this Question ?
        <div className="float-end mt-3" >
        <button className="btn btn-light me-2 border text-dark" onClick={props.onHide}>No</button>
        <button className="btn btn-danger text-light" onClick={() => {removeQuestion(index); props.onHide()}} >Yes</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function DeleteQuestion() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="light" onClick={() => setModalShow(true)}>
       <FontAwesomeIcon icon={faTrashCan} />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default DeleteQuestion;
 