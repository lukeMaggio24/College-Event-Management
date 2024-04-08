import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RequestJoinRsoModal({ show, onHide }) {


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("JOE MAMA");
  };
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Request to join an RSO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>RSO Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name of RSO" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="my-form">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestJoinRsoModal;
