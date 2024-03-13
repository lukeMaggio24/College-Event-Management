import React, { useState, useEffect } from "react";
import "../App.css";
import HomeNavbar from "../components/HomeNavbar";
import EventCard from "../components/EventCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// todo
// add location to create event modal and event card

// fake list of events
const events = [
  {
    id: 1,
    name: "Knight Hacks",
    visibility: "public",
    category: "tech talk",
    description: "come learn about java and have lazy moon pizza",
    date: "2022-01-01",
    starttime: "12:00",
    contactphone: "123-456-7890",
    contactemail: "coolman@ucf.edu",
  },
  {
    id: 2,
    name: "Hack@UCF",
    visibility: "RSO Event",
    category: "Social",
    description: "come to the bowling alley and bowl",
    date: "2026-01-01",
    starttime: "12:01",
    contactphone: "123-456-7890",
    contactemail: "jeffdude@ucf.edu",
  },
  // Add more events as needed
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  return (
    <div>
      <HomeNavbar />
      <Form className="d-flex" id="searchBar">
        <Form.Control
          type="search"
          placeholder="Search Events"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <div className="event-card-container">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            visibility={event.visibility}
            category={event.category}
            description={event.description}
            date={event.date}
            starttime={event.starttime}
            contactphone={event.contactphone}
            contactemail={event.contactemail}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
