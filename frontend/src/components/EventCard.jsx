import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import MapsComponent from "./MapsComponent";

function EventCard({
  name,
  visibility,
  category,
  description,
  date,
  starttime,
  contactphone,
  contactemail,
  locationName,
  locationLongitude,
  locationLatitude,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card style={{ width: "100%", marginBottom: "2rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Start Time: {starttime}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Visibility: {visibility}</ListGroup.Item>
        <ListGroup.Item>Category: {category}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Text>Contact Phone: {contactphone}</Card.Text>
        <Card.Text>Contact Email: {contactemail}</Card.Text>
        <Card.Text>Contact Email: {contactemail}</Card.Text>
        <Card.Text>
          Location: {locationName} , {locationLongitude}, {locationLatitude}
        </Card.Text>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Show/Hide Map
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <MapsComponent
              locationPickBool={false}
              longitude={locationLongitude}
              latitude={locationLatitude}
            />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
