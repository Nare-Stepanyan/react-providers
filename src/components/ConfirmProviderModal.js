import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function ConfirmProviderModal({ handleClose, deleteProvider, id }) {
  return (
    <>
      <Modal size="sm" centered show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to remove?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteProvider(id)}>
            Remove
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmProviderModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConfirmProviderModal;
