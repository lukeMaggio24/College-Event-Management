import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MapsComponent from "./MapsComponent";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

function CreateEventModal({ show, onHide }) {
  const [startDate, setStartDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventVisibility, setEventVisibility] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [rsoName, setRsoName] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // implement long and lat here

  // state for error handling
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedUniversity ||
      !eventName ||
      !eventCategory ||
      !eventVisibility ||
      !description ||
      !startTime ||
      !contactPhone ||
      !contactEmail
    ) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const event = {
      university_name: selectedUniversity,
      event_name: eventName,
      event_category: eventCategory,
      event_visibility: eventVisibility,
      description: description,
      date: startDate,
      time: startTime,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      rso_name: rsoName,
      longitude: lng,
      latitude: lat,
    };

    const userEmail = localStorage.getItem("email");
if(eventVisibility === "RSO Event")
{
    const responseRSO = await fetch(
      "http://localhost:3000/fetchrso?rso_name=" +
        encodeURIComponent(rsoName)
    );
    const data2 = await responseRSO.json();

    const adminEmail = data2[0].administrator_email;
    console.log(data2);
    console.log(adminEmail);
    console.log(userEmail);

      if(userEmail !== adminEmail)
      {
        setErrorMessage("You do not own this RSO");
        setShowAlert(true);
        return;
      }
  }


    const responseTime = await fetch(
      "http://localhost:3000/fetch_RSO_time?time=" +
        encodeURIComponent(startTime)
    );

    const timeData = await responseTime.json();
    console.log(timeData);
    const otherEventTime = timeData.time;

    if(otherEventTime === startTime)
    {
      setErrorMessage("Time Slot Already taken");
      setShowAlert(true);
      return;
    }

    const response = await fetch("http://localhost:3000/createevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const data = await response.json();

    if (response.ok) {
      onHide();
      window.location.reload();
    } else {
      setErrorMessage(data.message);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create an event</Modal.Title>
        </Modal.Header>
        {showAlert && <Alert variant="danger">{errorMessage}</Alert>}
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
              <Form.Control
                type="text"
                placeholder="Enter name of Event"
                onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>
            <Form.Select onChange={(e) => setEventCategory(e.target.value)}>
              <option>Event Category</option>
              <option>Social</option>
              <option>Fundraising</option>
              <option>Tech Talk</option>
            </Form.Select>
            <Form.Select onChange={(e) => setEventVisibility(e.target.value)}>
              <option>Event Visibility</option>
              <option>Public</option>
              <option>Private</option>
              <option>RSO Event</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>RSO Name (Required only for RSO events)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter RSO Name"
                onChange={(e) => setRsoName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Date</Form.Label>
              <br></br>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a time UTC"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone xxx-xxx-xxxx"
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form.Label>Click to choose an event location</Form.Label>
          <MapsComponent
            locationPickBool={true}
            setLng={setLng}
            setLat={setLat}
          />
          <p>
            Coordinates: {lat}, {lng}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="my-form"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEventModal;
