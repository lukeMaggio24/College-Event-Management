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
    };

    fetchEvents();
  }, []);

  // filter events based on search term
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedUniversity, setSelectedUniversity] =
    useState("Show All Public");

  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedUniversity === "Show All Public"
            ? event.event_visibility === "Public"
            : event.university_name === selectedUniversity &&
              (event.event_visibility === "Public" ||
                localStorage.getItem("university") === selectedUniversity))
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
        <br />
      </div>
      <div className="center-horizontally">
        <h6>
          If no search criteria or university filter is selected, it will show
          all public events.
        </h6>
      </div>
      <div className="center-horizontally">
        <h6>
          To see private events for a specific university, you must be a student
          of that university.
        </h6>
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
            <Dropdown.Item
              onClick={() => setSelectedUniversity("Show All Public")}
            >
              Show All Public
            </Dropdown.Item>
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
            university={event.university_name}
            name={event.event_name}
            visibility={event.event_visibility}
            category={event.event_category}
            description={event.description}
            date={event.date}
            starttime={event.time}
            contactphone={event.contact_phone}
            contactemail={event.contact_email}
            locationName={event.locationName}
            locationLongitude={event.longitude}
            locationLatitude={event.latitude}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
