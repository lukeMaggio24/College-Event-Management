import React, { useState, useEffect } from "react";
import "../App.css";
import HomeNavbar from "../components/HomeNavbar";
import EventCard from "../components/EventCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

// todo
// write functions for form submission
// fix collapse sharing state between EventCards

function Home() {
  // on page load, fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/fetchevents");
      const data = await response.json();
      setEvents(data);
      console.log(data);
    };

    fetchEvents();
  }, []);

  // filter events based on search term
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedUniversity, setSelectedUniversity] = useState(
    "Choose a University"
  );

  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          event.university_name === selectedUniversity
      )
    );
  }, [searchTerm, events, selectedUniversity]);

  // on page load, fetch unis from dropdown
  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    const fetchUniversities = async () => {
      const response = await fetch("http://localhost:3000/fetchunis");
      const data = await response.json();
      setUniversities(data);
    };

    fetchUniversities();
  }, []);

  return (
    <div>
      <HomeNavbar />
      <div className="center-horizontally mt-2">
        <h4>Select a university to start searching for events.</h4>
      </div>
      <div className="parent-div">
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <Form className="d-flex">
            <Form.Control
              id="searchBar"
              type="search"
              placeholder="Search Events"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
      </div>

      <div className="event-card-container">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            university={event.university}
            name={event.name}
            visibility={event.visibility}
            category={event.category}
            description={event.description}
            date={event.date}
            starttime={event.starttime}
            contactphone={event.contactphone}
            contactemail={event.contactemail}
            locationName={event.locationName}
            locationLongitude={event.locationLongitude}
            locationLatitude={event.locationLatitude}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
