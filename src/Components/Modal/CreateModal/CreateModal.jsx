import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Validation from "../../Validation/Validation";

const CreateModal = (props) => {
  return (
    <Fragment>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Validation
            onHide={props.onHide}
            createNew={props.createNew}
            selectedProfile={props.selectedProfile}
            toggle={props.toggle}
            setProfiles={props.setAthletes}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CreateModal;
