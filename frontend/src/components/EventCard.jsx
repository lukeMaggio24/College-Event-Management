import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import MapsComponent from "./MapsComponent";

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
        <MapsComponent
          locationPickBool={false}
          longitude={locationLongitude}
          latitude={locationLatitude}
        />
      </Card.Body>
    </Card>
  );
}

export default EventCard;
