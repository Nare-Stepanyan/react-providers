import React, { PureComponent } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import ProviderList from "./ProviderList";
import PropTypes from "prop-types";
import DeleteClientModal from "./DeleteClientModal";
import { isProviderExist, checkData } from "./../helpers/utils";

class EditClient extends PureComponent {
  state = {
    ...this.props.client,
    showDeleteModal: false,
    providerInput: "",
    selectedProviders: new Set(this.props.client.providers.map((el) => el._id)),
    errors: null,
  };

  handleCheck = (id) => {
    const selectedProviders = new Set(this.state.selectedProviders);
    if (selectedProviders.has(id)) {
      selectedProviders.delete(id);
    } else {
      selectedProviders.add(id);
    }
    this.setState({
      selectedProviders: new Set(selectedProviders),
    });
  };

  handleNewProvider = () => {
    const { providerInput } = this.state;
    if (providerInput !== "") {
      if (isProviderExist(providerInput, this.props.providers)) {
        this.setState({
          providerInput: "*provider already exists",
        });
      } else {
        this.props.addNewProvider(providerInput);
        this.setState({
          providerInput: "",
        });
      }
    } else {
      this.setState({
        providerInput: "*name is required",
      });
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  confirmDelete = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
    });
  };
  closeModals = () => {
    this.props.deleteClient(this.state._id);
    this.props.onClose(null);
  };
  saveChanges = () => {
    const { _id, name, email, phone, selectedProviders } = this.state;
    const client = {
      _id,
      name,
      email,
      phone,
      providers: [...selectedProviders],
    };

    let errors = checkData(
      client.name,
      client.email,
      client.phone,
      this.props.clients
    );

    if (Object.values(errors).length > 0) {
      if (this.state.email === this.props.client.email) {
        delete errors.email;
        this.setState({
          errors,
        });
      }
    }
    if (Object.values(errors).length === 0) {
      this.props.saveEditedClient(client);
      this.props.onClose(null);
    }
  };
  render() {
    const { onClose, providers, deleteProvider, saveEditedProvider } =
      this.props;
    const { name, email, phone, providerInput, showDeleteModal, errors } =
      this.state;

    return (
      <>
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title style={{ color: "#17a2b8" }}>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Name:
                  {!!errors && errors.name && (
                    <span className="errors"> {errors.name} </span>
                  )}
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email:
                  {!!errors && errors.email && (
                    <span className="errors"> {errors.email} </span>
                  )}
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPhone">
                <Form.Label column sm={2}>
                  Phone:
                  {!!errors && errors.phone && (
                    <span className="errors"> {errors.phone} </span>
                  )}
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalProviders">
                <Form.Label column sm={2}>
                  Providers:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="providers"
                    name="providerInput"
                    value={providerInput}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <Button variant="light" onClick={this.handleNewProvider}>
                    Add Provider
                  </Button>
                </Col>
              </Form.Group>
              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}></Form.Label>
                  <Col sm={8}>
                    <ProviderList
                      providers={providers}
                      deleteProvider={deleteProvider}
                      saveEditedProvider={saveEditedProvider}
                      onCheck={this.handleCheck}
                      singleClientProviders={this.state.providers}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer className="edit-client-btns">
            <div>
              <Button variant="danger" onClick={this.confirmDelete}>
                Delete Client
              </Button>
            </div>
            <div>
              <Button className="cancel-btn" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="info" onClick={this.saveChanges}>
                Save Changes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        {showDeleteModal && (
          <DeleteClientModal
            confirmDelete={this.confirmDelete}
            closeModals={this.closeModals}
          />
        )}
      </>
    );
  }
}

EditClient.propTypes = {
  client: PropTypes.object.isRequired,
  providers: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  addNewProvider: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
};

export default EditClient;
