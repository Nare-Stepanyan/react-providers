import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ConfirmProviderModal from "./ConfirmProviderModal";
import EditProviderModal from "./EditProviderModal";

class SingleProvider extends PureComponent {
  state = {
    showConfirm: false,
    showEdit: false,
    checked: false,
  };
  openConfirmModal = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };
  openEditModal = () => {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  };
  handleCheck = () => {
    const { onCheck, provider } = this.props;
    this.setState({
      checked: !this.state.checked,
    });
    onCheck(provider._id);
  };

  render() {
    const {
      provider,
      deleteProvider,
      saveEditedProvider,
      singleClientProviders,
    } = this.props;

    const { showConfirm, showEdit } = this.state;
    let selectedProviders = [];
    if (singleClientProviders && singleClientProviders.length > 0) {
      selectedProviders = singleClientProviders.map((el) => el._id);
    }
    return (
      <div className="providerList">
        <Col sm={6}>
          <Form.Check
            type="checkbox"
            label={provider.name}
            defaultChecked={
              selectedProviders && selectedProviders.includes(provider._id)
            }
            onClick={this.handleCheck}
          />
        </Col>
        <Col sm={2}>
          <Button variant="custom" onClick={this.openEditModal}>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#17a2b8" }} />
          </Button>
        </Col>
        <Col sm={1}>
          <Button variant="custom" onClick={this.openConfirmModal}>
            <FontAwesomeIcon icon={faTrash} style={{ color: "#d11a2a" }} />
          </Button>
        </Col>
        {showEdit && (
          <EditProviderModal
            handleClose={this.openEditModal}
            provider={provider}
            saveEditedProvider={saveEditedProvider}
          />
        )}
        {showConfirm && (
          <ConfirmProviderModal
            handleClose={this.openConfirmModal}
            deleteProvider={deleteProvider}
            id={provider._id}
          />
        )}
      </div>
    );
  }
}

SingleProvider.propTypes = {
  provider: PropTypes.object.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
  onCheck: PropTypes.func,
  singleClientProviders: PropTypes.array,
};

export default SingleProvider;
