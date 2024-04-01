import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MapsComponent from "./MapsComponent";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect } from "react";

function CreateEventModal({ show, onHide }) {
  const [startDate, setStartDate] = useState(new Date());

  // on page load, fetch unis from dropdown
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(
    "Choose a University"
  );
  useEffect(() => {
    const fetchUniversities = async () => {
      const response = await fetch("http://localhost:3000/fetchunis");
      const data = await response.json();
      setUniversities(data);
    };

    fetchUniversities();
  }, []);

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create an event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedUniversity}
              className="mr-2"
            >
              {universities.map((university) => (
                <Dropdown.Item
                  key={university.id}
                  onClick={() => setSelectedUniversity(university.name)}
                >
                  {university.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name of RSO" />
            </Form.Group>
            <Form.Select>
              <option>Event Category</option>
              <option>Social</option>
              <option>Fundraising</option>
              <option>Tech Talk</option>
            </Form.Select>
            <Form.Select>
              <option>Event Visibility</option>
              <option>Public</option>
              <option>Private</option>
              <option>RSO Event</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="text" placeholder="Enter a time UTC" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone xxx-xxx-xxxx"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
          </Form>
          <Form.Label>Click to choose an event location</Form.Label>
          <MapsComponent locationPickBool={true} />
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

export default CreateEventModal;
