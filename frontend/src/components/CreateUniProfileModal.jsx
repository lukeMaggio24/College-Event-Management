import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function CreateUniProfileModal({ show, onHide }) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create a university profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>University Name</Form.Label>
              <Form.Control type="text" placeholder="Enter University Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label># of Students</Form.Label>
              <Form.Control type="text" placeholder="Number of Students" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
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

export default CreateUniProfileModal;
