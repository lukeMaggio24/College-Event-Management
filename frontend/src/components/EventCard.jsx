import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import MapsComponent from "./MapsComponent";
import Accordion from "react-bootstrap/Accordion";

function EventCard({
  id,
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
  const [open, setOpen] = useState(false); // Local state for each card

  return (
    <Card style={{ width: "30rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>
          {visibility}, {category}
        </Card.Subtitle>
        <Card.Text style={{ marginTop: "0.4rem" }}>{description}</Card.Text>
        <Card.Text>
          Date: {date} @ {starttime} UTC
        </Card.Text>
        <Card.Text>Contact Phone: {contactphone}</Card.Text>
        <Card.Text>Contact Email: {contactemail}</Card.Text>
        <Card.Text>
          Location: {locationName} , {locationLongitude}, {locationLatitude}
        </Card.Text>
        <Button
          variant="secondary"
          onClick={() => setOpen(!open)}
          aria-controls={id}
          aria-expanded={open}
        >
          Show/Hide Map
        </Button>
        <Collapse in={open}>
          <div id={id}>
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
