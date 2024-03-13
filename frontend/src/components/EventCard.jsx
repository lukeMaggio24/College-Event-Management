import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function EventCard({
  name,
  visibility,
  category,
  description,
  date,
  starttime,
  contactphone,
  contactemail,
}) {
  return (
    <Card style={{ width: "100rem", marginBottom: "2rem" }}>
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
      </Card.Body>
    </Card>
  );
}

export default EventCard;
