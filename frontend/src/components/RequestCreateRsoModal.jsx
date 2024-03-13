import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RequestCreateRsoModal({ show, onHide }) {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Request to create an RSO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>RSO Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name of RSO" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Administrator Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email of who will be the admin of this RSO"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter 4 other email addresses</Form.Label>
              <Form.Control as="textarea" rows={4} />
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

export default RequestCreateRsoModal;
